import createMetascraper from "metascraper";
import metascraperAuthor from "metascraper-author";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";

const metascraper = createMetascraper([
  metascraperAuthor(),
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
  metascraperUrl(),
]);

export default function getMeta(html: string, url: string) {
  return metascraper({ html, url });
}
