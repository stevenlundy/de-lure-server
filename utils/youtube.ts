// import { youtube } from "./google";
import { getSubtitles } from "youtube-captions-scraper";

const re = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;

export const isYouTubeUrl = (url: string) => {
  return re.test(url);
};

export const getYouTubeId = (url: string) => {
  const match = url.match(re);
  if (match) {
    return match[1];
  }
  return null;
};

export const getYouTubeSubtitles = async (videoID: string) => {
  const subtitles = await getSubtitles({ videoID });
  return subtitles.map((subtitle) => subtitle.text).join(" ");
};

// export const getYouTubeTranscript = async (videoId: string) => {
//   try {
//     const response = await youtube.captions.list({
//       part: ["snippet"],
//       videoId,
//     });

//     const captions = (response.data.items || []).filter(
//       (caption) => caption.snippet?.language === "en" && caption.id
//       // && caption.snippet?.name === "Default"
//     );
//     console.log(captions);
//     const captionIds = captions.map((caption) => caption.id) as string[];
//     if (captionIds.length > 0) {
//       const id = captionIds[0];
//       const { data } = await youtube.captions.download({ id });
//       return data as string;
//     }
//     return null;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };
