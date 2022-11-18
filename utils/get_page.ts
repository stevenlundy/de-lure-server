import createBrowserless from "browserless";
import getHTML from "html-get";
import { JSDOM } from "jsdom";

// Spawn Chromium process once
const browserlessFactory = createBrowserless();

// Kill the process when Node.js exit
process.on("exit", () => {
  browserlessFactory.close();
});

export default async function getPage(url: string) {
  const browserContext = browserlessFactory.createContext();
  const getBrowserless = () => browserContext;
  const { html } = await getHTML(url, { getBrowserless });
  // close the browser context after it's used
  browserContext.then((browser) => browser.destroyContext());
  const dom = new JSDOM(html, { url });
  return { html, dom };
}
