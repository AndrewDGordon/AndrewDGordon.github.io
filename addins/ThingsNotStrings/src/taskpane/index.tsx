/* global document, Office, module, require, HTMLElement */

const title = "Things Not Strings";

const versionInfoElement: HTMLElement | null = document.getElementById("version-info");

/* Render application after Office initializes */
Office.onReady(() => {
  console.log("index.tsx: Version Timestamp: " + VERSION_TIMESTAMP);
  if (versionInfoElement) {
    versionInfoElement.innerHTML = `<div>${title} ${VERSION_TIMESTAMP}</div>`;
  }
  else {
    console.error("version-info element not found");
  }
});