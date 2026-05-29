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

【返信ルール】
・最初に「〇〇様」を入れる
・必ず最初に感謝を伝える
・口コミ内容に具体的に触れる
・美容室らしい柔らかい接客感
・テンプレ感を減らす
・不自然に丁寧すぎない
・150〜250文字程度
・絵文字は使わない
・過剰に長くしない
・美容室らしい柔らかい表現
・名前呼びはしない
・一人ひとりに合わせた返信
・嬉しいポイントに触れる
・また来店したくなる文章
・丁寧すぎず親しみやすく
・最後は次回来店が楽しみになる締めにする
・薬剤、髪質改善、カラーなど美容用語も自然に使う
・口コミ本文をしっかり読み込んで返信する

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