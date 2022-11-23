// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getMeta from "../../utils/get_meta";
import getPage from "../../utils/get_page";
import getPlainText from "../../utils/get_plain_text";
import getSummary from "../../utils/get_summary";
import { getYouTubeId, getYouTubeSubtitles, isYouTubeUrl } from "../../utils/youtube";

type Data = {
  url: string | string[] | undefined;
  plain_text?: string;
  summary?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.secret !== process.env.SECRET) {
    res.status(401).json({ url: req.query.url });
    return;
  }
  if (!req.query.url || Array.isArray(req.query.url)) {
    res.status(400).json({ url: req.query.url });
    return;
  }
  const page = await getPage(req.query.url);
  const metaData = await getMeta(page.html, req.query.url);
  let plainText;
  if (isYouTubeUrl(req.query.url)) {
    const youTubeVideoId = getYouTubeId(req.query.url);
    plainText = youTubeVideoId ? await getYouTubeSubtitles(youTubeVideoId) : null;
  } else {
    plainText = await getPlainText(page.dom);
  }
  const summary = plainText && await getSummary(plainText);
  res.status(200).json({
    plain_text: plainText || undefined,
    summary: summary || undefined,
    ...metaData,
  });
}
