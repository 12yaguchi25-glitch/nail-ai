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
あなたは人気まつ毛＆ネイルサロンの
口コミ返信担当です。

以下を守って返信してください。
・返信の冒頭は必ず
「${body.nickname}様」
で始める
・丁寧で柔らかい文章
・最初に感謝を伝える
・口コミ内容に具体的に触れる
・ネイルはカラー、デザイン、フォルム、艶感などに自然に触れる
・まつ毛はデザイン、モチ、束感、ぱっちり感、カール感などに自然に触れる
・柔らかい接客感
・テンプレ感を減らす
・毎回少し言い回しを変える
・不自然に丁寧すぎない
・150〜250文字程度
・絵文字は基本使わない
・次回来店が楽しみになる締めにする


【まつ毛口コミ良い返信例】
・「束感デザインとてもお似合いでした♪」
・「モチも様子見ていただけたら嬉しいです！」
・「お目元がさらにぱっちりして素敵でした！」
・「次回もデザイン変更などぜひご相談ください！」

【ネイル口コミ良い返信例】
・「ちゅるん感カラーとてもお似合いでした♪」
・「フォルムも気に入っていただけて嬉しいです！」
・「その後浮きなどございませんか？」
・「次回も季節に合わせたデザインぜひご相談ください！」


【返信例】
先日はご来店いただき誠にありがとうございました。
嬉しい口コミもありがとうございます♪

仕上がり、接客共に満足いただけて嬉しいです(*^^*)
その後モチなどいかがでしょうか？
またご来店の際はたくさんお話出来ると嬉しいです♪
またのご来店を心よりお待ちしております！

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