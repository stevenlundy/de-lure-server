declare module "browserless" {
  type BrowserlessOptions = {
    /**
     * @default 30000
     */
    timeout?: number;
  };

  type Browserless = {
    createContext: () => Promise<BrowserlessContext>;
    close: () => Promise<void>;
  };

  type BrowserlessContext = {
    createPage: () => Promise<BrowserlessPage>;
    destroyContext: () => Promise<void>;
  };

  type BrowserlessPage = {
    goto: (url: string) => Promise<void>;
    content: () => Promise<string>;
    close: () => Promise<void>;
  };

  export default function createBrowserless(
    options?: BrowserlessOptions
  ): Browserless;
}
