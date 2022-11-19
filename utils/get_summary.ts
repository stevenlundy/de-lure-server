import { Configuration, OpenAIApi } from "openai";
import { removeStopwords } from "stopword";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const simplifyText = (text: string) => {
  const paragraphs = text.split("\n");
  const simplifiedParagraphs = paragraphs.map((paragraph) =>
    removeStopwords(paragraph.split(" ")).join(" ")
  );
  return simplifiedParagraphs.join("\n");
};

const getCompletionPrompt = (text: string) =>
  `### ARTICLE:\n\n\n${text}\n\n\n### 3 SENTENCE SUMMARY:`;

export default async function getSummary(text: string) {
  try {
    const response = await openai.createCompletion({
      model: "text-curie-001",
      prompt: getCompletionPrompt(simplifyText(text)),
      temperature: 0.8,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 2,
      stop: ['"""'],
    });
    return response.data.choices[0].text?.trim();
  } catch (error) {
    console.error(error);
  }
}
