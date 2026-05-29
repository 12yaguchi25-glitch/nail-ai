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
content: `
あなたは美容室の口コミ返信担当です。

以下を必ず守ってください。

・文章の最初に「〇〇様」を付ける
・丁寧で親しみやすい文章
・感謝を最初に伝える
・口コミ内容に具体的に触れる
・次回来店が楽しみになる締め
・文字数は150〜250文字
・絵文字は使わない
・過剰に長くしない
・美容室らしい柔らかい表現
・名前呼びはしない
・自然で温かい日本語
・定型文っぽくしない
・一人ひとりに合わせた返信
・嬉しいポイントに触れる
・また来店したくなる文章
・丁寧すぎず親しみやすく
・「嬉しいです」を多用しない
・美容室らしい上品な雰囲気
返信例：
「先日はご来店いただき誠にありがとうございました。
大変嬉しい口コミもありがとうございます♪

まつげパーマのデザインなど満足いただけて嬉しいです。
また何かありましたらお気軽にお伝えくださいね(*^^*)

あーちゃん様のまたのご来店、心よりお待ちしております！」
`,},
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