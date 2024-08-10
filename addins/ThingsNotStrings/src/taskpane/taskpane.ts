/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */

// The initialize function must be run each time a new page is loaded
Office.onReady(() => {
  const versionInfo = document.getElementById("version-info");
  versionInfo.textContent = `taskpane.ts: Version Timestamp: ${VERSION_TIMESTAMP}`;
  console.log("Version Timestamp: " + VERSION_TIMESTAMP);
});
