/* global document, Office, module, require, HTMLElement */

const title = "Things Not Strings";

const rootElement: HTMLElement | null = document.getElementById("container");

/* Render application after Office initializes */
Office.onReady(() => {
  console.log("Version Timestamp: " + VERSION_TIMESTAMP);
  if (rootElement) {
    rootElement.innerHTML = `<div>${title} ${VERSION_TIMESTAMP}</div>`;
  }
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    if (rootElement) {
      rootElement.innerHTML = `<div>${title}</div>`;
    }
  });
}