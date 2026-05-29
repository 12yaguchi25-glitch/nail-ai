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
あなたは人気ネイルサロンの
口コミ返信担当です。

以下を守って返信してください。

・丁寧で柔らかい文章
・最初に感謝を伝える
・デザインやカラーに自然に触れる
・フォルム、艶感、持ち込みなど
ネイル用語も自然に使う
・テンプレ感を減らす
・次回来店が楽しみになる締め
・150〜250文字程度
・絵文字は使わない

【NG】
・毎回同じ締め
・抽象的すぎる返信

【返信例】
先日はご来店いただき誠にありがとうございました。
嬉しい口コミもありがとうございます♪

仕上がり、接客共に満足いただけて嬉しいです(*^^*)
その後モチなどいかがでしょうか？
またご来店の際はたくさんお話出来ると嬉しいです♪
さえ様のまたのご来店、心よりお待ちしております！

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