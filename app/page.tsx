"use client";

import { useState } from "react";

export default function Home() {
const [review, setReview] = useState("");
const [reply, setReply] = useState("");
const [nickname, setNickname] = useState("");

const generateReply = async () => {
const res = await fetch("/api/reply", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
review,
nickname,
}),
});

const data = await res.json();

setReply(data.reply);

};

return (
<main style={{ padding: 40 }}>
口コミAI返信
<input
value={nickname}
onChange={(e) =>
setNickname(e.target.value)
}
placeholder="ニックネーム"
style={{
width: "100%",
height: 40,
marginTop: 20,
}}
/>
  <textarea
    value={review}
    onChange={(e) => setReview(e.target.value)}
    placeholder="口コミを入力"
    style={{
      width: "100%",
      height: 200,
      marginTop: 20,
    }}
  />

  <br />
  <br />

  <button onClick={generateReply}>
    AI返信生成
  </button>

  <br />
  <br />

  <textarea
    value={reply}
    readOnly
    style={{
      width: "100%",
      height: 200,
    }}
  />
</main>

);
}