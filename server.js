import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/chat", async (req, res) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "GameStore PWA",
      },
      body: JSON.stringify({
        model: "liquid/lfm-2.5-1.2b-thinking:free",
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente de una tienda de videojuegos que recomienda juegos.",
          },
          {
            role: "user",
            content: req.body.message,
          },
        ],
      }),
    },
  );

  const data = await response.json();

  console.log(data);
  console.log(process.env.OPENROUTER_API_KEY);
  console.log("STATUS:", response.status);
  console.log("HEADERS:", response.headers);

  res.json(data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo");
});
