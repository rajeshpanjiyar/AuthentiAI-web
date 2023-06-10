export const BODY = {
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.1,
  max_tokens: 200,
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
