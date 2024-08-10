// for accessing findThatCharity.org
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
import { value_to_excel, string_to_date, number_to_amount } from "./types";

type Charity = {
  id: string;
  name: string;
  charityNumber: string;
  companyNumber: string;
  description: string;
  url: string;
  latestFinancialYearEnd: string;
  latestIncome: number;
  latestSpending: number;
  latestEmployees: number;
  latestVolunteers: number;
  trusteeCount: number;
  dateRegistered: string;
  dateRemoved: string | null;
  active: boolean;
  parent: string | null;
  organisationType: Array<string>;
  organisationTypePrimary: string;
  alternateName: Array<string>;
  telephone: string;
  email: string;
  location: Array<{
    id: string;
    name: string;
    geoCode: string;
    type: string;
  }>;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
  };
  sources: Array<string>;
  links: Array<{
    site: string;
    url: string;
    orgid: string;
  }>;
  orgIDs: Array<string>;
  linked_records: Array<{
    orgid: string;
    url: string;
  }>;
  dateModified: string;
};

let promiseChain: Promise<Charity | Error> = Promise.resolve({} as Charity);

async function directCall(url: string): Promise<Charity | Error> {
  // Wait 200ms before each request to not go over the usage limit
  await new Promise((resolve) => setTimeout(resolve, 200));
  const response = await fetch(url + ".json", { method: "GET" });
  if (!response.ok) {
    console.error(`Error! status: ${response.status}`);
    return new Error(`Error! status: ${response.status}`);
  }
  const charity = (await response.json()) as Charity;
  console.log(charity);
  return charity;
}

async function directCallSequentially(url: string) {
  const result = promiseChain.then(() => directCall(url));
  promiseChain = result.catch(() => new Error("Error: unexpected exception")); // agai n, unsure about this
  return result;
}

// TODO: delete source url below
const provider_findThatCharity = {
  description: "FindThatCharity", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
  logoSourceAddress:
    "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
  logoTargetAddress: "https://findthatcharity.uk", // Destination URL that the logo navigates to when selected.
};

function charity_to_excel(org_url: string, charity: Charity): ExcelValue {
  const entity: ExcelEntity = {
    type: "Entity",
    text: charity.name,
    properties: {
      name: charity.name,
      organisationTypePrimary: charity.organisationTypePrimary,
      description: value_to_excel(charity.description),
      latestFinancialYearEnd: string_to_date(charity.latestFinancialYearEnd) as ExcelValue,
      latestIncome: charity.latestIncome == null ? nullErrorValue : number_to_amount(charity.latestIncome, "GBP"),
      latestSpending: charity.latestSpending == null ? nullErrorValue : number_to_amount(charity.latestSpending, "GBP"),
      latestEmployees: value_to_excel(charity.latestEmployees),
      latestVolunteers: value_to_excel(charity.latestVolunteers),
      trusteeCount: value_to_excel(charity.trusteeCount),

      telephone: value_to_excel(charity.telephone),
      email: value_to_excel(charity.email),
      location: charity.location.map((loc) => loc.name).join(","),
      address:
        charity.address.streetAddress + ", " + charity.address.addressLocality + ", " + charity.address.postalCode,
      url: value_to_excel(charity.url),

      id: charity.id,
      charityNumber: value_to_excel(charity.charityNumber),
      companyNumber: value_to_excel(charity.companyNumber),
      active: { type: "Boolean", basicValue: charity.active },
      dateRegistered: string_to_date(charity.dateRegistered) as ExcelValue,
      dateRemoved: (charity.dateRemoved == null ? "not applicable" : string_to_date(charity.dateRemoved)) as ExcelValue,

      parent: value_to_excel(charity.parent),
      organisationType: charity.organisationType.join(","),
      alternateName: charity.alternateName.join(","),

      sources: charity.sources.join(","),
      links: charity.links.map((link) => link.site + ": " + link.url).join(","),
      orgIDs: charity.orgIDs.join(","),
      linked_records: charity.linked_records.map((rec) => rec.orgid + ": " + rec.url).join(","),
      dateModified: string_to_date(charity.dateModified) as ExcelValue,
      raw_charity_data: value_to_excel(charity),
    },
    layouts: {
      compact: { icon: "Organization" },
      card: {
        title: { property: "name" },
        sections: [
          {
            layout: "List",
            properties: ["description"],
          },
          {
            layout: "List",
            title: `${charity.active ? "Active" : "Inactive"} ${charity.organisationTypePrimary}, number ${charity.charityNumber} since ${charity.dateRegistered}`,
            properties: [
              "id",
              "charityNumber",
              "companyNumber",
              "organisationTypePrimary",
              "active",
              "dateRegistered",
              "dateRemoved",
              "parent",
              "organisationType",
              "alternateName",
            ],
            collapsible: true,
            collapsed: true,
          },
          {
            layout: "List",
            title: "People and Financials",
            properties: [
              "latestFinancialYearEnd",
              "latestIncome",
              "latestSpending",
              "latestEmployees",
              "latestVolunteers",
              "trusteeCount",
            ],
            collapsible: true,
            collapsed: false,
          },
          {
            layout: "List",
            title: "Contact",
            properties: ["telephone", "email", "address", "url"],
            collapsible: true,
            collapsed: false,
          },
          {
            layout: "List",
            title: "More",
            properties: [
              "sources",
              "location",
              "links",
              "orgIDs",
              "linked_records",
              "dateModified",
              "raw_charity_data",
            ],
            collapsible: true,
            collapsed: true,
          },
        ],
      },
    },
    provider: {
      description: charity.name + " on FindThatCharity", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress:
        "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: org_url, // Destination URL that the logo navigates to when selected.
    },
  };
  return entity;
}



/**
 * FindThatCharity
 * @customfunction
 * @param {string} org_id
 * @returns {any} Results of the query.
 */
async function findThatCharity(org_id: string) {
  const API_URL = "https://findthatcharity.uk/orgid/";
  const org_url = API_URL + org_id;

  const response = await fetch(org_url + ".json", { method: "GET" });
  if (!response.ok) {
    return `Error! status: ${response.status}`;
  }
  const charity = (await response.json()) as Charity;
  console.log(charity);
  const result = charity_to_excel(org_url, charity);
  return result;
}
