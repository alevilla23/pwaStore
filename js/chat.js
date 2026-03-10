const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");

chatToggle.onclick = () => {

 chatBox.style.display =
 chatBox.style.display === "flex" ? "none" : "flex";

};

function addMessage(text, from){

 const msg = document.createElement("div");

 msg.innerHTML =
 from === "user"
 ? `<b>Tú:</b> ${text}`
 : `<b>Bot:</b> ${text}`;

 chatMessages.appendChild(msg);

 chatMessages.scrollTop = chatMessages.scrollHeight;

}

async function sendMessage(){

 const input = document.getElementById("chatInput");

 const userText = input.value.trim();

 if(!userText) return;

 addMessage(userText,"user");

 input.value="";

 addMessage("Pensando...","bot");

 const response = await fetch("/chat",{

 method:"POST",

 headers:{
 "Content-Type":"application/json"
 },

 body:JSON.stringify({
 message:userText
 })

 });

 const data = await response.json();

 chatMessages.lastChild.remove();

 const botReply =
 data.choices?.[0]?.message?.content || "No pude responder";

 addMessage(botReply,"bot");

}