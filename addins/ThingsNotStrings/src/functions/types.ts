/* global clearInterval, console, CustomFunctions, setInterval */

// Documentation: https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-data-types-overview
// Types of custom functions: https://learn.microsoft.com/en-us/office/dev/add-ins/excel/custom-functions-json-autogeneration
// Data type explorer: https://github.com/OfficeDev/Office-Add-in-samples/blob/main/Samples/excel-data-types-explorer/src/taskpane/taskpane.ts
// Excel PIVOTBY: https://support.microsoft.com/en-us/office/pivotby-function-de86516a-90ad-4ced-8522-3a25fac389cf

// How different types of Excel values to be returned to Excel
export type ExcelValue =
  | number
  | string
  | ExcelEntity
  | ExcelArray
  | ExcelString
  | ExcelDouble
  | ExcelBoolean
  | ExcelError
  | ExcelFormattedNumber;

export type ExcelEntity = {
  type: "Entity";
  text: string;
  basicType: "Error"; // probably should be optional, as the value is forced to this anyway
  basicValue: "#VALUE!"; // ditto.
  properties: { [key: string]: ExcelValue };
  provider?: { description: string; logoSourceAddress: string; logoTargetAddress: string };
  layouts?: {
    compact?: {
      icon: string; // eg "Gift" see icon list here: https://learn.microsoft.com/en-us/javascript/api/excel/excel.entitycompactlayouticons
    };
    card?: Card;
  };
};

export type ExcelArray = { type: "Array"; elements: Array<Array<ExcelValue>> }; // elements cannot be the empty array
export type ExcelString = { type: "String"; basicValue: string };
export type ExcelDouble = { type: "Double"; basicValue: number };
export type ExcelBoolean = { type: "Boolean"; basicValue: boolean };
export type ExcelError = { type: "Error"; basicType: "Error"; basicValue: string };
export type ExcelFormattedNumber = {
  type: "FormattedNumber";
  basicValue: number;
  numberFormat: string;
  propertyMetadata?: { sublabel: string };
};

export const nullErrorValue: ExcelError = {
  type: "Error",
  basicType: "Error",
  basicValue: "#NULL!",
};

export function mk_ExcelString(value: string): ExcelString {
  return { type: "String", basicValue: value };
}
export function mk_ExcelDouble(value: number): ExcelDouble {
  return { type: "Double", basicValue: value };
}

export function mk_ExcelArray(elements: Array<Array<ExcelValue>>): ExcelValue {
  if (elements.length == 0) {
    return nullErrorValue;
  }
  return { type: "Array", elements: elements };
}

// example of a layout card
const card: Card = {
  title: {
    property: "Product Name",
  },
  mainImage: {
    property: "Image",
  },
  sections: [
    {
      layout: "List",
      properties: ["Product ID"],
    },
    {
      layout: "List",
      title: "Quantity and price",
      collapsible: true,
      collapsed: false, // This section will not be collapsed when the card is opened.
      properties: ["Quantity Per Unit", "Unit Price"],
    },
    {
      layout: "List",
      title: "Additional information",
      collapsible: true,
      collapsed: true, // This section will be collapsed when the card is opened.
      properties: ["Discontinued"],
    },
  ],
};

export type Card = {
  title: { property: string };
  mainImage?: { property: string };
  sections: Array<{
    layout: "List";
    title?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    properties: Array<string>;
  }>;
};

export function value_to_excel(value: any): ExcelValue {
  // recall that typeof null == "object"
  if (value == null) return nullErrorValue;
  switch (typeof value) {
    case "boolean":
      return {
        type: "Boolean",
        basicValue: value,
      };

    case "string":
      return {
        type: "String",
        basicValue: value,
      };

    case "number":
      return {
        type: "Double",
        basicValue: value,
      };

    case "object":
      if (value.constructor === Array) {
        const length = value.length;
        if (length == 0) return nullErrorValue; // Excel has no empty arrays

        var rows = new Array(length);
        for (var i = 0; i < length; i++) rows[i] = [value_to_non_array_excel(value[i])];
        return mk_ExcelArray(rows);
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
        basicType: "Error",
        basicValue: "#VALUE!",
        text: keys,
        properties: outcome,
      };

    default:
      return {
        type: "String",
        basicValue: "DEFAULT - unexpected",
      };
  }
}

// Excel does not support an array nested inside another, so wrap in an entity
function value_to_non_array_excel(value: any): ExcelValue {
  if (value == null) return nullErrorValue;
  const excel = value_to_excel(value);
  switch (typeof value) {
    case "object":
      if (value.constructor === Array) {
        return {
          type: "Entity",
          basicType: "Error",
          basicValue: "#VALUE!",
          text: "Nested array",
          properties: { array: excel },
        };
      }
      return excel;

    default:
      return excel;
  }
}

/**
 * GET JSON from URL.
 * @customfunction
 * @param {string} url
 * @returns {any} Results of the query.
 */
async function get_json(url) {
  const options = {
    method: "GET",
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
    method: "GET",
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
      "Content-Type": "application/json",
    },
    body: json_data,
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

// 2021-03-08
// 2021-01-19T00:00:00+00:00

/**
 * Interpret string as Excel date
 * @customfunction
 * @param {string} date
 * @returns {any} Results of the query.
 */
export function string_to_date(date_as_string: string) {
  // Excel date is number of days since 1900-01-01
  // https://stackoverflow.com/questions/70804856/convert-javascript-date-object-to-excel-serial-date-number
  const date = new Date(date_as_string);
  let days = 25569.0 + (date.getTime() - date.getTimezoneOffset() * 60 * 1000) / (1000 * 60 * 60 * 24);
  return {
    type: "FormattedNumber",
    basicValue: days,
    numberFormat: "yyyy-mm-dd",
  };
}

export function number_to_amount(number: number, currency: string): ExcelFormattedNumber {
  return {
    type: "FormattedNumber",
    basicValue: number,
    numberFormat: currency == "GBP" ? "£* #,##0.00" : "* #,##0.00",
    propertyMetadata: {
      sublabel: currency,
    },
  };
}
