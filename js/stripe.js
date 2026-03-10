const API_KEY = "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";
const MODEL = "liquid/lfm-2.5-1.2b-thinking:free";

const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");

chatToggle.onclick = () => {
  chatBox.style.display =
    chatBox.style.display === "flex" ? "none" : "flex";
};

function addMessage(text, from) {
  const msg = document.createElement("div");
  msg.style.margin = "6px 0";
  msg.innerHTML =
    from === "user"
      ? `<b>Tú:</b> ${text}`
      : `<b>Bot:</b> ${text}`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    console.log('ejecutao');
    
  const input = document.getElementById("chatInput");
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  addMessage("Pensando...", "bot");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
        "HTTP-Referer": location.origin,
        "X-Title": "GameStore PWA"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "Eres un asistente de una tienda de videojuegos. Ayudas a encontrar ofertas y juegos."
          },
          {
            role: "user",
            content: userText
          }
        ]
      })
    });

    const data = await response.json();

    chatMessages.lastChild.remove();

    const botReply =
      data.choices?.[0]?.message?.content || "No pude responder 😢";

    addMessage(botReply, "bot");

  } catch (err) {
    chatMessages.lastChild.remove();
    addMessage("Error conectando al servidor", "bot");
  }
}