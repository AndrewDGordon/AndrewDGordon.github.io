/* global clearInterval, console, CustomFunctions, setInterval */

/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
export function add(first: number, second: number): number {
  return first + second;
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
export function logMessage(message: string): string {
  console.log(message);

  return message;
}


// json-excel.ts
// Load this code file using ScriptLab to make JSON functionality available as custom functions in Excel
// Documentation: https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-data-types-overview
// Types of custom functions: https://learn.microsoft.com/en-us/office/dev/add-ins/excel/custom-functions-json-autogeneration
// Data type explorer: https://github.com/OfficeDev/Office-Add-in-samples/blob/main/Samples/excel-data-types-explorer/src/taskpane/taskpane.ts
// Excel PIVOTBY: https://support.microsoft.com/en-us/office/pivotby-function-de86516a-90ad-4ced-8522-3a25fac389cf

// example of a layout card
const card: Card = {
  title: { 
      property: "Product Name" 
  },
  mainImage: { 
      property: "Image" 
  },
  sections: [
      {
          layout: "List",
          properties: ["Product ID"]
      },
      {
          layout: "List",
          title: "Quantity and price",
          collapsible: true,
          collapsed: false, // This section will not be collapsed when the card is opened.
          properties: ["Quantity Per Unit", "Unit Price"]
      },
      {
          layout: "List",
          title: "Additional information",
          collapsible: true,
          collapsed: true, // This section will be collapsed when the card is opened.
          properties: ["Discontinued"]
      }
  ]
};

type Card =
 { title: { property: string },
    mainImage?: { property: string },
    sections: Array<{
      layout: "List",
      title?: string,
      collapsible?: boolean,
      collapsed?: boolean,
      properties: Array<string>
    }>
  };

type ExcelEntity =
  {
    type: "Entity",
    text: string,
    properties: { [key: string]: ExcelValue },
    provider?: { description: string, logoSourceAddress: string, logoTargetAddress: string }
    layouts?: {
      compact?: {
          icon: string // eg "Gift" see icon list here: https://learn.microsoft.com/en-us/javascript/api/excel/excel.entitycompactlayouticons
      },
      card? : Card
    }
  };

type ExcelArray = { type: "Array", elements: Array<Array<ExcelValue>> };  // elements cannot be the empty array
type ExcelString = { type: "String", basicValue: string };
type ExcelDouble = { type: "Double", basicValue: number };
type ExcelBoolean = { type: "Boolean", basicValue: boolean };
type ExcelError = { type: "Error", basicType: "Error", basicValue: string };
type ExcelFormattedNumber = { type: "FormattedNumber", basicValue: number, numberFormat: string, propertyMetadata?: { sublabel: string } };

// How different types of Excel values to be returned to Excel
type ExcelValue = number | string | ExcelEntity | ExcelArray | ExcelString | ExcelDouble | ExcelBoolean | ExcelError | ExcelFormattedNumber

const nullErrorValue: ExcelError = {
  type: "Error",
  basicType: "Error",
  basicValue: "#NULL!"
};

function mk_ExcelString(value: string): ExcelString {
  return { type: "String", basicValue: value };
}

function mk_ExcelDouble(value: number): ExcelDouble {
  return { type: "Double", basicValue: value };
}

function mk_ExcelArray(elements: Array<Array<ExcelValue>>): ExcelValue {
  if (elements.length == 0) {
    return nullErrorValue;
  }
  return { type: "Array", elements: elements };
}

const romsey = {
  "id": "GB-CHC-1069905",
  "name": "ROMSEY MILL TRUST",
  "charityNumber": "1069905",
  "companyNumber": "03556721",
  "description": "Romsey Mill's activities, enabling vulnerable and disadvantaged young people children and families to thrive, include intensive 1-to-1 support, early-years care & education, Children's Centre services, parenting courses, work in schools, detached youth work, interest-based group work (e.g. sport,arts,music), training and alternative education, IAG sessions, trips & outdoor residential experiences.",
  "url": "http://www.romseymill.org",
  "latestFinancialYearEnd": "2023-03-31",
  "latestIncome": 1544824,
  "latestSpending": 1485573,
  "latestEmployees": 37,
  "latestVolunteers": 164,
  "trusteeCount": 8,
  "dateRegistered": "1998-06-04",
  "dateRemoved": null,
  "active": true,
  "parent": null,
  "organisationType": [
      "Registered Company",
      "Registered Charity",
      "Incorporated Charity",
      "Registered Charity (England and Wales)"
  ],
  "organisationTypePrimary": "Registered Charity",
  "alternateName": [
      "THE MILL",
      "TRANSITIONS PROGRAMME",
      "YOUNG PARENT PROGRAMME",
      "SOCIAL INCLUSION PROGRAMME",
      "UNDER FIVES PROGRAMME",
      "ROMSEY MILL",
      "ASPIRE"
  ],
  "telephone": "01223213162",
  "email": "admin@romseymill.org",
  "location": [
      {
          "id": "CB1 3BZ",
          "name": "CB1 3BZ",
          "geoCode": "E07000008",
          "type": "HQ"
      },
      {
          "id": "E10000003",
          "name": "Cambridgeshire",
          "geoCode": "E10000003",
          "type": "AOO"
      }
  ],
  "address": {
      "streetAddress": "ROMSEY MILL, HEMINGFORD ROAD",
      "addressLocality": "CAMBRIDGE",
      "postalCode": "CB1 3BZ"
  },
  "sources": [
      "ccew"
  ],
  "links": [
      {
          "site": "Find that Charity",
          "url": "https://findthatcharity.uk/orgid/GB-CHC-1069905.json",
          "orgid": "GB-CHC-1069905"
      },
      {
          "site": "romseymill.org",
          "url": "http://www.romseymill.org",
          "orgid": "GB-CHC-1069905"
      },
      {
          "site": "Charity Commission England and Wales",
          "url": "https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1069905&subId=0",
          "orgid": "GB-CHC-1069905"
      },
      {
          "site": "CharityBase",
          "url": "https://search.charitybase.uk/chc/1069905",
          "orgid": "GB-CHC-1069905"
      },
      {
          "site": "Giving is Great",
          "url": "https://givingisgreat.org/charitydetail/?regNo=1069905",
          "orgid": "GB-CHC-1069905"
      },
      {
          "site": "Companies House",
          "url": "https://find-and-update.company-information.service.gov.uk/company/03556721",
          "orgid": "GB-COH-03556721"
      },
      {
          "site": "Opencorporates",
          "url": "https://opencorporates.com/companies/gb/03556721",
          "orgid": "GB-COH-03556721"
      }
  ],
  "orgIDs": [
      "GB-COH-03556721",
      "GB-CHC-1069905"
  ],
  "linked_records": [
      {
          "orgid": "GB-CHC-1069905",
          "url": "https://findthatcharity.uk/orgid/GB-CHC-1069905.json"
      },
      {
          "orgid": "GB-COH-03556721",
          "url": "https://findthatcharity.uk/orgid/GB-COH-03556721.json"
      }
  ],
  "dateModified": "2024-07-27T01:08:56.178Z"
}

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

type Grant = {
  grant_id: string;
  data: GrantData
}
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

const grant: Grant =
{
  "grant_id": "360G-CiN-2016-6291",
  "data": {
      "id": "360G-CiN-2016-6291",
      "title": "Grant to Mencap Cymru",
      "currency": "GBP",
      "awardDate": "2017-02-09T00:00:00+00:00",
      "dataSource": "https://www.bbcchildreninneed.co.uk/grants/bbc-children-in-need-360-giving/",
      "description": "This project will provide disabled young people with opportunities to sustain friendships independently of their parents.  They will have increased confidence, be more independent, and have better friendships.",
      "dateModified": "2021-05-25T00:00:00+00:00",
      "plannedDates": [
          {
              "endDate": "2020-09-01T00:00:00+00:00",
              "duration": 36,
              "startDate": "2017-09-01T00:00:00+00:00"
          }
      ],
      "amountAwarded": 75406,
      "grantProgramme": [
          {
              "title": "Main Grants"
          }
      ],
      "fundingOrganization": [
          {
              "id": "GB-CHC-802052",
              "name": "BBC Children in Need"
          }
      ],
      "recipientOrganization": [
          {
              "id": "GB-CHC-222377",
              "name": "Mencap Cymru",
              "location": [
                  {
                      "name": "Llanishen",
                      "geoCode": "W05001012",
                      "geoCodeType": "Ward"
                  }
              ],
              "charityNumber": "222377"
          }
      ]
  }};

interface PageData {
  count: number;
  results: Array<{ [key: string]: any }>;
  next?: string;
}

// Fetches a paginated list of results from a URL.  May throw exception.
type Results = Array<{ [key: string]: any }>
const cache: { [url: string]: Results } = {};
async function fetchPaginatedList(url: string): Promise<Results | Error> {
  const options = {
    method: "GET"
  };

  if (cache[url]) {
    console.log(`Cache hit for ${url}`);
    return cache[url];
  }

  const results: Results = [];
  let page = 0;
  let cursor: string | null = url
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
  promiseChain = result.catch(() => new Error("Error: unexpected exception"));  // unsure if this needed
  return result;
}

const provider = {
  description: "360Giving", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
  logoSourceAddress: "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
  logoTargetAddress: "https://360Giving.org" // Destination URL that the logo navigates to when selected.
}


// TODO: delete source url below
const provider_findThatCharity = {
  description: "FindThatCharity", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
  logoSourceAddress: "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
  logoTargetAddress: "https://findthatcharity.uk" // Destination URL that the logo navigates to when selected.
}

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
      provider: provider
    };
  }
  const grants: Grant[] = value as Grant[];
  return {
    type: "Entity",
    text: `${org_id} received ${value.length} grants`,
    properties: {
      grants: mk_ExcelArray(grants.map(grant => [grant_to_excel(grant)]))
    },
    provider: {
      description: `${org_id} on 360Giving`, // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress: "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: "https://grantnav.threesixtygiving.org/org/" + org_id // Destination URL that the logo navigates to when selected.
    }
  }
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
      provider: provider
    };
  }
  const grants: Grant[] = value as Grant[];
  return {
    type: "Entity",
    text: `${org_id} made ${value.length} grants`,
    properties: {
      grants: mk_ExcelArray(grants.map(grant => [ grant_to_excel(grant) ]))
    },
    provider: {
      description: `${org_id} on 360Giving`, // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress: "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: "https://grantnav.threesixtygiving.org/org/"+org_id // Destination URL that the logo navigates to when selected.
    }
  }
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
  for(let r=0; r<N; r++) {
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
  for(let i=0; i<result.length; i++) {
    const [a,b] = result[i];
    const key = a.basicValue + ";" + b.basicValue;
    dict[key] = (dict[key] || 0) + 1;
  }

  // enumerate the dictionary
  const outcome: [ExcelString, ExcelString, ExcelDouble][] = [];
  for (const [key, value] of Object.entries(dict)) {
    const arr: string[] = key.split(";");
    outcome.push([mk_ExcelString(arr[0]), mk_ExcelString(arr[1]), mk_ExcelDouble(value)]);
  }

  const entity ={
    type: "Entity",
    text: `Who funds with who`,
    properties: {
      who_funds_with_who: mk_ExcelArray(outcome)
    }
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
  const charity = await response.json() as Charity;
  console.log(charity);
  const result = charity_to_excel(org_url, charity);
  return result
}


// 2021-03-08
// 2021-01-19T00:00:00+00:00

/**
 * Interpret string as Excel date
 * @customfunction
 * @param {string} date
 * @returns {any} Results of the query.
 */
function string_to_date(date_as_string: string) {
  // Excel date is number of days since 1900-01-01
  // https://stackoverflow.com/questions/70804856/convert-javascript-date-object-to-excel-serial-date-number
  const date = new Date(date_as_string);
  let days = 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
  return {
    type: "FormattedNumber",
    basicValue: days,
    numberFormat: "yyyy-mm-dd",
  };
}

function number_to_amount(number: number, currency: string): ExcelFormattedNumber {
  return {
    type: "FormattedNumber",
    basicValue: number,
    numberFormat: currency=="GBP" ? "£* #,##0.00" : "* #,##0.00",
    propertyMetadata: {
      sublabel: currency
    }
  };
}

function grant_to_excel(grant: Grant): ExcelValue {
  const data = grant.data;
  const amountAwarded: ExcelValue = number_to_amount(data.amountAwarded, data.currency);
  const funder = data.fundingOrganization.map(org => org.name).join(",");
  const recipient = data.recipientOrganization.map(org => org.name).join(",");
  const funder_id = data.fundingOrganization.map(org => org.id).join(",");
  const recipient_id = data.recipientOrganization.map(org => org.id).join(",");
  const entity: ExcelEntity = {
    type: "Entity",
    text: data.title,
    properties: {
      title: data.title,
      awardDate: string_to_date(data.awardDate) as ExcelValue,
      funder: funder,
      recipient: recipient,
      amountAwarded: amountAwarded,
      description: data.description,
      grant_id: grant.grant_id,
      funder_id: funder_id,
      recipient_id: recipient_id,
      grant_nav: "https://grantnav.threesixtygiving.org/grant/"+grant.grant_id,
      raw_grant_data: value_to_excel(grant)
    },
    layouts: {
      compact: { icon: "Gift" },
      card: {
        title: { property: "title" },
        sections: [
          {
            layout: "List",
            properties: ["awardDate", "funder", "recipient", "amountAwarded","description" ]
          },
          {
            layout: "List",
            title: "More",
            properties: ["grant_id","funder_id","recipient_id","grant_nav","raw_grant_data"],
            collapsible: true,
            collapsed: true
          }
        ]
      }
    },
    provider: {
      description: data.title + " on 360Giving GrantNav", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress: "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: "https://grantnav.threesixtygiving.org/grant/"+grant.grant_id // Destination URL that the logo navigates to when selected.
    }
  };
  return entity;
}

function charity_to_excel(org_url: string, charity: Charity): ExcelValue {
  const entity: ExcelEntity = {
    type: "Entity",
    text: charity.name,
    properties: {
      name: charity.name,
      organisationTypePrimary: charity.organisationTypePrimary,
      description: value_to_excel(charity.description),
      latestFinancialYearEnd: string_to_date(charity.latestFinancialYearEnd) as ExcelValue,
      latestIncome: (charity.latestIncome==null ? nullErrorValue : number_to_amount(charity.latestIncome, "GBP")),
      latestSpending: (charity.latestSpending==null ? nullErrorValue : number_to_amount(charity.latestSpending, "GBP")),
      latestEmployees: value_to_excel(charity.latestEmployees),
      latestVolunteers: value_to_excel(charity.latestVolunteers),
      trusteeCount: value_to_excel(charity.trusteeCount),

      telephone: value_to_excel(charity.telephone),
      email: value_to_excel(charity.email),
      location: charity.location.map(loc => loc.name).join(","),
      address: charity.address.streetAddress + ", " + charity.address.addressLocality + ", " + charity.address.postalCode,
      url: value_to_excel(charity.url),

      id: charity.id,
      charityNumber: value_to_excel(charity.charityNumber),
      companyNumber: value_to_excel(charity.companyNumber),
      active: { type: "Boolean", basicValue: charity.active },
      dateRegistered: string_to_date(charity.dateRegistered) as ExcelValue,
      dateRemoved: (charity.dateRemoved==null ? "not applicable" : string_to_date(charity.dateRemoved)) as ExcelValue,
      
      parent: value_to_excel(charity.parent),
      organisationType: charity.organisationType.join(","),
      alternateName: charity.alternateName.join(","),
      
      sources: charity.sources.join(","),
      links: charity.links.map(link => link.site + ": " + link.url).join(","),
      orgIDs: charity.orgIDs.join(","),
      linked_records: charity.linked_records.map(rec => rec.orgid + ": " + rec.url).join(","),
      dateModified: string_to_date(charity.dateModified) as ExcelValue,
      raw_charity_data: value_to_excel(charity)
    },
    layouts: {
      compact: { icon: "Organization" },
      card: {
        title: { property: "name" },
        sections: [
          {
            layout: "List",
            properties: ["description"]
          }, {
            layout: "List",
            title: `${charity.active ? "Active" : "Inactive"} ${charity.organisationTypePrimary}, number ${charity.charityNumber} since ${charity.dateRegistered}`,
            properties: ["id", "charityNumber", "companyNumber",
              "organisationTypePrimary", "active", "dateRegistered", "dateRemoved", "parent", "organisationType", "alternateName"],
            collapsible: true,
            collapsed: true
          },
          {
            layout: "List",
            title: "People and Financials",
            properties: ["latestFinancialYearEnd", "latestIncome", "latestSpending", "latestEmployees", "latestVolunteers", "trusteeCount"],
            collapsible: true,
            collapsed: false
          },
          {
            layout: "List",
            title: "Contact",
            properties: ["telephone", "email", "address", "url"],
            collapsible: true,
            collapsed: false
          },
          {
            layout: "List",
            title: "More",
            properties: ["sources", "location", "links", "orgIDs", "linked_records", "dateModified", "raw_charity_data"],
            collapsible: true,
            collapsed: true
          }
        ]
      }
    },
    provider: {
      description: charity.name + " on FindThatCharity", // Name of the data provider. Displays as a tooltip when hovering over the logo. Also displays as a fallback if the source address for the image is broken.
      logoSourceAddress: "https://www.threesixtygiving.org/wp-content/themes/360giving2020/assets/images/360-logos/360giving-main.svg", // Source URL of the logo to display.
      logoTargetAddress: org_url // Destination URL that the logo navigates to when selected.
    }
  };
  return entity;
}

/**
 * GET JSON from URL.
 * @customfunction
 * @param {string} url
 * @returns {any} Results of the query.
 */
async function get_json(url) {
  const options = {
    method: "GET"
  };

  //console.log(url);
  //console.log(options);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return value_to_excel(result);
  } catch (err) {
    console.log(err);
    return value_to_excel("caught: " + err.message);
  }
}

/**
 * GET JSON lines from URL.
 * @customfunction
 * @param {string} url
 * @returns {any} Results of the query.
 */
async function get_json_lines(url) {
  const options = {
    method: "GET"
  };

  //console.log(url);
  //console.log(options);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const text = await response.text();
    const jsons = await text.split("\n");
    var N = jsons.length - 1; // last entry will be an empty string following last "\n"
    var array = new Array(N);
    for (var i = 0; i < N; i++) {
      const json = jsons[i];
      try {
        array[i] = JSON.parse(jsons[i]);
      } catch (err) {
        array[i] = "error parsing: " + json + "length " + json.length;
        //console.log(array[i]);
      }
    }
    const excel = value_to_excel({ lines: array });
    //console.log(array);
    return excel;
  } catch (err) {
    console.log(err);
    return value_to_excel("caught: " + err.message);
  }
}

/**
 * POST JSON to URL.
 * @customfunction
 * @param {string} url
 * @param {any} json_data
 * @returns {any} Results of the query.
 */
async function post_json(url, json_data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: json_data
  };

  //console.log(options);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return value_to_excel(result);
  } catch (err) {
    console.log(err);
    return value_to_excel("caught: " + err.message);
  }
}

/**
 * Encode part of URI
 * @customfunction
 * @param {string} text
 * @returns {string} URI encoded text
 */
function encodeURI(text: string) {
  return encodeURIComponent(text);
}

/**
 * Constructs a Yellow entity
 * @customfunction
 * @param {string} json
 * @returns {any} Yellow value
 */
function parse_JSON(json: string) {
  const obj = JSON.parse(json);
  return value_to_excel(obj);
}

function value_to_excel(value:any): ExcelValue {
  // recall that typeof null == "object"
  if (value == null) return nullErrorValue;
  switch (typeof value) {
    case "boolean":
      return {
        type: "Boolean",
        basicValue: value
      };

    case "string":
      return {
        type: "String",
        basicValue: value
      };

    case "number":
      return {
        type: "Double",
        basicValue: value
      };

    case "object":
      if (value.constructor === Array) {
        const length = value.length;
        if (length == 0) return nullErrorValue; // Excel has no empty arrays

        var rows = new Array(length);
        for (var i = 0; i < length; i++) rows[i] = [value_to_non_array_excel(value[i])];
        return mk_ExcelArray(rows)
      }

      const obj = value as Object;
      var keys = "";
      var outcome: { [key: string]: ExcelValue } = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var lowerKey = key.toLowerCase();
          while (
            outcome.hasOwnProperty(lowerKey) // make the lower case key unique, if need be
          )
            lowerKey += "9";
          const value = obj[key];
          outcome[lowerKey] = value_to_excel(value);
          const ty = typeof value;
          const scalar = ty === "boolean" || ty === "number" || ty === "string";
          var keyvalue = lowerKey + (scalar ? "=" + value.toString() : "");
          if (keys == "") keys = keyvalue;
          else keys = keys + "," + keyvalue;
        }
      }

      return {
        type: "Entity",
        text: keys,
        properties: outcome
      };

    default:
      return {
        type: "String",
        basicValue: "DEFAULT - unexpected"
      };
  }
}

// Excel does not support an array nested inside another, so wrap in an entity
function value_to_non_array_excel(value:any): ExcelValue {
  if (value == null) return nullErrorValue;
  const excel = value_to_excel(value);
  switch (typeof value) {
    case "object":
      if (value.constructor === Array) {
        return {
          type: "Entity",
          text: "Nested array",
          properties: { array: excel }
        };
      }
      return excel;

    default:
      return excel;
  }
}
