# Things Not Strings

An add-in to represent real-world entities as first-class Excel values, rather than simply as strings.

Motivating examples include:
* Charities from [FindThatCharity](https://findthatcharity.uk)
* Grants from one organization to another from [360Giving](https://360Giving.org)

## How to install me on Windows for use with desktop Excel

You need to follow the steps below. The page [Sideload Office Add-ins for testing from a network share](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins) explains the steps in detail.

* Create a folder called Manifest (eg, directly in your C drive).
* Download the file [manifest-things-not-strings.xml](manifest-things-not-strings.xml) and place it in the Manifest folder.
* Share the folder Manifest using the Sharing tab on its Properties menu.
* Make note of the network path (eg, "C:\\ADG-LAPTOP\Manifest").
* Specify the shared folder as a trusted catalog.
* Sideload the addin into Excel, using the Add-ins item in the ribbon.

## How to build me

Compile this TypeScript project into the dist directory:
* npm run build

Commit the changed files into GitHub
* what's a command to do this?

Wait a little, and dist is available on the web.

To install add-in via a network share:
* [Sideload Office Add-ins for testing from a network share](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins)

To remove previous versions:
* [Clear the Office cache](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/clear-cache)

To remove an add-in sideloaded to Office on the web, [clear the browser's cache](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing#remove-a-sideloaded-add-in). You can [click this link](edge://settings/clearBrowserData) to get to cache in Edge.