declare module 'youtube-captions-scraper' {
    type getSubtitlesOptions = {
        videoID: string;
        lang?: string;
    };

    type Subtitle = {
        text: string;
        start: number;
        dur: number;
    };

    export function getSubtitles(options: getSubtitlesOptions): Promise<Subtitle[]>;
}