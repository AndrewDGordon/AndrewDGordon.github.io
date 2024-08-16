/* global clearInterval, console, CustomFunctions, setInterval */

import {
  Card,
  ExcelValue,
  ExcelArray,
  ExcelDouble,
  ExcelEntity,
  ExcelError,
  ExcelFormattedNumber,
  ExcelString,
} from "./types";
import { nullErrorValue, mk_ExcelArray, mk_ExcelString, mk_ExcelDouble } from "./types";
import { value_to_excel, number_to_amount, string_to_date } from "./types";

type Grant = {
  grant_id: string;
  data: GrantData;
};
type GrantData = {
  id: string;
  title: string;
  currency: string;
  awardDate: string;
  dataSource: string;
  description: string;
  dateModified: string;
  plannedDates: Array<{
    endDate: string;
    duration: number;
    startDate: string;
  }>;
  amountAwarded: number;
  grantProgramme: Array<{
    title: string;
  }>;
  fundingOrganization: Array<{
    id: string;
    name: string;
  }>;
  recipientOrganization: Array<{
    id: string;
    name: string;
    location: Array<{
      name: string;
      geoCode: string;
      geoCodeType: string;
    }>;
    charityNumber: string;
  }>;
};

interface PageData {
  count: number;
  results: Array<{ [key: string]: any }>;
  next?: string;
}

// Fetches a paginated list of results from a URL.  May throw exception.
type Results = Array<{ [key: string]: any }>;
const cache: { [url: string]: Results } = {};
async function fetchPaginatedList(url: string): Promise<Results | Error> {
  const options = {
    method: "GET",
  };

  if (cache[url]) {
    console.log(`Cache hit for ${url}`);
    return cache[url];
  }

  const results: Results = [];
  let page = 0;
  let cursor: string | null = url;
  while (cursor !== null) {
    const start = Date.now();

    // Wait at least half a second before each request to not go over the usage limit
    await new Promise((resolve) => setTimeout(resolve, 600));

    const response = await fetch(cursor, options);

    if (!response.ok) {
      console.error(`Error! status: ${response.status}`);
      cursor = null;
      continue;
    }

    const data: PageData = await response.json();
    const end = Date.now();

    page += 1;
    console.log(`Fetched page ${page} in ${(end - start) / 1000}s from ${cursor} count ${data.count}`);

    results.push(...data.results);
    cursor = data.next || null;
  }

  cache[url] = results; // Cache the results for the current URL
  return results;
}

let promiseChain: Promise<Results | Error> = Promise.resolve([]);

async function fetchPaginatedListSequentially(url: string | null): Promise<Results | Error> {
  const result = promiseChain.then(() => fetchPaginatedList(url));
  // Ensure the next call waits for the current call to finish
  promiseChain = result.catch(() => new Error("Error: unexpected exception")); // unsure if this needed
  return result;
}

const provider360Giving = {
  description: "360Giving", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
  logoSourceAddress:
    "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
  logoTargetAddress: "https://360Giving.org", // Destination URL that the logo navigates to when selected.
};

/**
 * Grants received
 * @customfunction
 * @param {string} org_id
 * @returns {any} Results of the query.
 */
async function grants_received(org_id: string) {
  const API_URL = "https://api.threesixtygiving.org/api/v1/";
  const url = API_URL + "org/" + org_id + "/grants_received/?limit=100";
  const value = await fetchPaginatedListSequentially(url);
  if (value instanceof Error) {
    return {
      type: "Entity",
      text: `${org_id} not known to have received grants`,
      properties: { error: value.message },
      provider: provider360Giving,
    };
  }
  const grants: Grant[] = value as Grant[];
  return {
    type: "Entity",
    text: `${org_id} received ${value.length} grants`,
    properties: {
      grants: mk_ExcelArray(grants.map((grant) => [grant_to_excel(grant)])),
    },
    provider: {
      description: `${org_id} on 360Giving`, // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress:
        "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: "https://grantnav.threesixtygiving.org/org/" + org_id, // Destination URL that the logo navigates to when selected.
    },
  };
}

/**
 * Grants made
 * @customfunction
 * @param {string} org_id
 * @returns {any} Results of the query.
 */
async function grants_made(org_id: string) {
  const API_URL = "https://api.threesixtygiving.org/api/v1/";
  const url = API_URL + "org/" + org_id + "/grants_made/?limit=100";
  const value = await fetchPaginatedListSequentially(url);
  if (value instanceof Error) {
    return {
      type: "Entity",
      text: `${org_id} not known to have made grants`,
      properties: { error: value.message },
      provider: provider360Giving,
    };
  }
  const grants: Grant[] = value as Grant[];
  return {
    type: "Entity",
    text: `${org_id} made ${value.length} grants`,
    properties: {
      grants: mk_ExcelArray(grants.map((grant) => [grant_to_excel(grant)])),
    },
    provider: {
      description: `${org_id} on 360Giving`, // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress:
        "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: "https://grantnav.threesixtygiving.org/org/" + org_id, // Destination URL that the logo navigates to when selected.
    },
  };
}

/**
 * Who funds with who
 * @customfunction
 * @param {string[][]} grants_column - 1D array of grant entities
 * @returns {any[][]} Results of the query.
 */
async function who_funds_with_who(grants_column: string[][]) {
  const result: [ExcelString, ExcelString][] = [];
  const N = grants_column.length;
  for (let r = 0; r < N; r++) {
    const csv = grants_column[r][0];
    const arr: string[] = csv.split(";");
    // calculate all permutations in funder pairs
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          result.push([mk_ExcelString(arr[i]), mk_ExcelString(arr[j])]);
        }
      }
    }
  }
  // declare empty dictionary that maps two strings to a count
  var dict: { [key: string]: number } = {};
  for (let i = 0; i < result.length; i++) {
    const [a, b] = result[i];
    const key = a.basicValue + ";" + b.basicValue;
    dict[key] = (dict[key] || 0) + 1;
  }

  // enumerate the dictionary
  const outcome: [ExcelString, ExcelString, ExcelDouble][] = [];
  for (const [key, value] of Object.entries(dict)) {
    const arr: string[] = key.split(";");
    outcome.push([mk_ExcelString(arr[0]), mk_ExcelString(arr[1]), mk_ExcelDouble(value)]);
  }

  const entity = {
    type: "Entity",
    text: `Who funds with who`,
    properties: {
      who_funds_with_who: mk_ExcelArray(outcome),
    },
  };
  return entity;
}

function grant_to_excel(grant: Grant): ExcelValue {
  const data = grant.data;
  const amountAwarded: ExcelValue = number_to_amount(data.amountAwarded, data.currency);
  const funder = data.fundingOrganization.map((org) => org.name).join(",");
  const recipient = data.recipientOrganization.map((org) => org.name).join(",");
  const funder_id = data.fundingOrganization.map((org) => org.id).join(",");
  const recipient_id = data.recipientOrganization.map((org) => org.id).join(",");
  const entity: ExcelEntity = {
    type: "Entity",
    text: data.title,
    properties: {
      title: mk_ExcelString(data.title),
      awardDate: string_to_date(data.awardDate) as ExcelValue,
      funder: mk_ExcelString(funder),
      recipient: mk_ExcelString(recipient),
      amountAwarded: amountAwarded,
      description: mk_ExcelString(data.description),
      grant_id: mk_ExcelString(grant.grant_id),
      funder_id: mk_ExcelString(funder_id),
      recipient_id: mk_ExcelString(recipient_id),
      grant_nav: mk_ExcelString("https://grantnav.threesixtygiving.org/grant/" + grant.grant_id),
      raw_grant_data: value_to_excel(grant),
    },
    layouts: {
      compact: { icon: "Gift" },
      card: {
        title: { property: "title" },
        sections: [
          {
            layout: "List",
            properties: ["awardDate", "funder", "recipient", "amountAwarded", "description"],
          },
          {
            layout: "List",
            title: "More",
            properties: ["grant_id", "funder_id", "recipient_id", "grant_nav", "raw_grant_data"],
            collapsible: true,
            collapsed: true,
          },
        ],
      },
    },
    provider: {
      description: data.title + " on 360Giving GrantNav", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress:
        "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: "https://grantnav.threesixtygiving.org/grant/" + grant.grant_id, // Destination URL that the logo navigates to when selected.
    },
  };
  return entity;
}

type Triple = { grant_id: string; funder_id: string; recipient_id: string };
function triples_to_excel(triples: Triple[]): ExcelValue {
  const entity: ExcelEntity = {
    type: "Entity",
    text: "Who funds with who",
    properties: {
      triples: mk_ExcelArray(
        triples.map((triple) => [
          mk_ExcelString(triple.grant_id),
          mk_ExcelString(triple.funder_id),
          mk_ExcelString(triple.recipient_id),
        ])
      ),
    },
  };
  return entity;
}

/**
 * Accept an array of entities
 * @customfunction
 * @param {any[][]} entities
 * @returns {any} The outcome.
 */

function getEntities(entities: any[][]): any {
  // empty array of triples
  const triples: Triple[] = [];
  for (let i = 0; i < entities.length; i++) {
    for (let j = 0; j < entities[i].length; j++) {
      //console.log(`row ${i} column ${j}`);
      const entity = entities[i][j] as ExcelValue;
      if (entity.type == "Entity") {
        const grants = entity.properties.grants;
        if (grants.type == "Array") {
          const rows = grants.elements.length;
          //console.log(`${rows} grants`);
          for (let r = 0; r < rows; r++) {
            const grant = grants.elements[r][0] as ExcelEntity;
            const title = grant.properties.title as ExcelString;
            const funder = grant.properties.funder as ExcelString;
            const funder_id = grant.properties.funder_id as ExcelString;
            const recipient = grant.properties.recipient as ExcelString;
            const recipient_id = grant.properties.recipient_id as ExcelString;
            const grant_id = grant.properties.grant_id as ExcelString;
            //console.log(`grant ${grant_id.basicValue} from ${funder.basicValue} to ${recipient.basicValue}`);
            triples.push({
              grant_id: grant_id.basicValue,
              funder_id: funder_id.basicValue,
              recipient_id: recipient_id.basicValue,
            });
          }
        } else if (grants.type == "Error") {
          //console.log("0 grants");
        }
      }
    }
  }

  // make an array of all the unique funders
  const funder_ids = Array.from(new Set(triples.map((triple) => triple.funder_id)));

  // make an array of all the unique recipients
  const recipient_ids = Array.from(new Set(triples.map((triple) => triple.recipient_id)));

  // for each recipient r, funders_of_recipient[r] is the array of its funders
  const funders_of_recipient: { [key: string]: string[] } = {};
  for (let i = 0; i < recipient_ids.length; i++) funders_of_recipient[recipient_ids[i]] = [];
  // record the funders for each recipient
  for (let i = 0; i < triples.length; i++) {
    const triple = triples[i];
    funders_of_recipient[triple.recipient_id].push(triple.funder_id);
  }

  // dump to the console
  for (const [key, value] of Object.entries(funders_of_recipient)) {
    console.log(`${key} ${value}`);
  }

  const count: { [pair_funders: string]: number } = {};
  // for each recipients, enumerate the pairs of funders, and count them
  for (let i = 0; i < recipient_ids.length; i++) {
    const recipient = recipient_ids[i];
    const funders = funders_of_recipient[recipient];
    for (let i = 0; i < funders.length; i++) {
      for (let j = 0; j < funders.length; j++) {
        if (i !== j) {
          const key = funders[i] + ";" + funders[j];
          count[key] = (count[key] || 0) + 1;
        }
      }
    }
  }

  // sort the count
  Object.entries(count).sort((a, b) => b[1] - a[1]);

  // dump the count to the console
  for (const [key, value] of Object.entries(count)) {
    console.log(`${key} ${value}`);
  }

  // enumerate the dictionary
  const outcome: [ExcelString, ExcelString, ExcelDouble][] = [];
  for (const [key, value] of Object.entries(count)) {
    const arr: string[] = key.split(";");
    outcome.push([mk_ExcelString(arr[0]), mk_ExcelString(arr[1]), mk_ExcelDouble(value)]);
  }
  return outcome;
}
