import { systemMessage } from "./systemMessage";

const mess = { role: "user", content: "" };
export const BODY = {
  model: "gpt-3.5-turbo",
  messages: [systemMessage, mess],
  temperature: 0.1,
  max_tokens: 900,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.5,
  stop: ['"""'],
};

export const REQUEST_BODY = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + String(process.env.REACT_APP_OPENAI_API_KEY),
  },
  body: JSON.stringify(BODY),
};
