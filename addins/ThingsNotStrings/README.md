# Things Not Strings

An add-in to represent real-world entities as first-class Excel values, rather than simply as strings.

Motivating examples include:
* Charities from [FindThatCharity](https://findthatcharity.uk)
* Grants from one organization to another from [360Giving](https://360Giving.org)

This development version is for use with Windows desktop Excel. Not yet tested for Mac Excel or Excel for the web.

There is a test spreadsheet [available here](https://1drv.ms/x/s!AvVrI50BmxTGsIpeixwdG8EhycvQUQ?e=4LdMLF).

## How to install on Windows for use with desktop Excel

You need to follow the steps below. The page [Sideload Office Add-ins for testing from a network share](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins) explains the steps in detail.

1. Create a folder called Manifest (eg, directly in your C drive).
1. Download the XML file [manifest-things-not-strings.xml](manifest-things-not-strings.xml) (click "download raw file") and place it in the Manifest folder.
1. Share the folder Manifest using the Sharing tab on its Properties menu.
1. Make note of the network path (eg, "\\\\ADG-LAPTOP\\Manifest").
1. Specify the network path of the shared folder as a Trusted Catalog using the "Trust Center Settings" in the "Trust Center" in Excel's Options.  Be sure to tick "Show in Menu".
1. Sideload the addin into Excel, using the Add-ins item in the ribbon.

## How to un-install me

1. Delete the Manifest folder.
1. [Clear the Office cache](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/clear-cache)
1. If side-loaded in Excel for the web, [clear the browser's cache](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing#remove-a-sideloaded-add-in). You can use the link edge://settings/clearBrowserData to get to cache in Edge.

## How to build me

Compile this TypeScript project into the dist directory:
* npm run build

Commit the changed files into GitHub
* TODO: what's a command to do this?

Wait a little, and dist is available on the web.

## How to generate the TypeScript interface for the 360Giving Data Standard
* fetch the [schema](https://github.com/ThreeSixtyGiving/standard/tree/main/schema)
* npm install -g json-schema-to-typescript
* hand edit to change line 3 from "360Giving Data Standard Schema" to "The 360Giving Data Standard Schema"
  (because the schema becomes a TypeScript type based on this name, and it has to start with a letter.)
* json2ts 360-giving-schema.json -o 360-giving-schema.ts