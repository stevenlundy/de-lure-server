import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export default function getPlainText(dom: JSDOM) {
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  return article?.textContent;
}
