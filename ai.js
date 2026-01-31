import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    // OpenRouter-д санал болгодог толгойнууд (заавал биш, гэхдээ сайн)
    "HTTP-Referer": process.env.APP_URL || "https://fb-ai-chatbot.onrender.com",
    "X-Title": process.env.APP_NAME || "FB AI Chatbot",
  },
});

export async function askAI(userText) {
  const model = process.env.OPENROUTER_MODEL || "mistralai/mistral-7b-instruct";

  const completion = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "Чи Монгол хэлээр л хариулдаг туслах. Хэрэглэгчийн асуултад товч, ойлгомжтой, эелдэг Монгол хэлээр хариул. Англи үг хэрэглэхгүйгээр тайлбарла.",
      },
      { role: "user", content: userText },
    ],
    temperature: 0.7,
  });

  return completion.choices?.[0]?.message?.content?.trim() || "Уучлаарай, түр асуудал гарлаа.";
}
