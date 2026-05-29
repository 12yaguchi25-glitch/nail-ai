import OpenAI from "openai";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

export async function OPTIONS() {
return new Response(null, {
status: 200,
headers: {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods":
"POST, OPTIONS",
"Access-Control-Allow-Headers":
"Content-Type",
},
});
}

export async function POST(req) {

const body = await req.json();

const completion =
await openai.chat.completions.create({
model: "gpt-4.1-mini",
messages: [
{
role: "system",
content:
"あなたは美容室の丁寧な口コミ返信担当です。",
},
{
role: "user",
content: body.review,
},
],
});

return new Response(
JSON.stringify({
reply:
completion.choices[0].message.content,
}),
{
headers: {
"Content-Type": "application/json",
"Access-Control-Allow-Origin": "*",
},
}
);
}