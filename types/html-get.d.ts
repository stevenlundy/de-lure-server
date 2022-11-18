declare module 'html-get' {
    type getHTMLOptions = {
        getBrowserless: () => Promise<BrowserlessContext>;
    };

    export default function getHTML(url: string, options?: getHTMLOptions): Promise<{ html: string, url: string }>;
}