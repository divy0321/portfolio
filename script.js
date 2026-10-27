/*
  DIVYA BUSARIA PORTFOLIO — CONFIGURATION
  1) Replace the placeholder profile links and email below.
  2) Replace each project URL with the matching GitHub repository.
  3) For a real AI chatbot, use a backend/serverless function to call your AI provider.
     Never place a private API key in browser JavaScript or publish it to GitHub.
*/
const PORTFOLIO_CONFIG = {
  name: "Divya Busaria",
  email: "your.email@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  repositories: {
    "Reading List": "https://github.com/",
    "Quiz": "https://github.com/",
    "Python Basic Programs": "https://github.com/",
    "Messy Python Code": "https://github.com/",
    "Buggy Python Code": "https://github.com/"
  },
  // Optional: set this to your own backend endpoint after creating one.
  // Example: "/api/chat" — the endpoint should accept POST { message } and return { reply }.
  chatApiEndpoint: ""
};

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("emailLink").textContent = PORTFOLIO_CONFIG.email + " ↗";
document.getElementById("emailLink").href = "mailto:" + PORTFOLIO_CONFIG.email;
document.getElementById("githubProfile").href = PORTFOLIO_CONFIG.github;
document.getElementById("linkedinProfile").href = PORTFOLIO_CONFIG.linkedin;

const projectCards = [...document.querySelectorAll(".project-card:not(.project-card-cta)")];
projectCards.forEach((card) => {
  const title = card.querySelector("h3")?.textContent.trim();
  const link = card.querySelector(".project-link");
  if (title && link && PORTFOLIO_CONFIG.repositories[title]) {
    link.href = PORTFOLIO_CONFIG.repositories[title];
    link.target = "_blank";
    link.rel = "noreferrer";
  }
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Contact form: prepares a message in the visitor's email app, without storing data.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent("Hi Divya,\n\n" + message + "\n\nFrom: " + name + "\nEmail: " + email);
  window.location.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${subject}&body=${body}`;
});

// Chatbot: works in demo mode immediately; optional backend API can be configured above.
const chatPanel = document.getElementById("chatPanel");
const chatLauncher = document.getElementById("chatLauncher");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function toggleChat(forceOpen) {
  const open = typeof forceOpen === "boolean" ? forceOpen : !chatPanel.classList.contains("open");
  chatPanel.classList.toggle("open", open);
  chatPanel.setAttribute("aria-hidden", String(!open));
  if (open) setTimeout(() => chatInput.focus(), 80);
}
chatLauncher.addEventListener("click", () => toggleChat());
chatClose.addEventListener("click", () => toggleChat(false));

function addBubble(text, who = "bot") {
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble " + (who === "user" ? "user-bubble" : "bot-bubble");
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}
function localReply(message) {
  const q = message.toLowerCase();
  if (/(skill|technology|tech stack|tools)/.test(q)) {
    return "Divya is a B.Tech CSE student at JECRC University. This portfolio highlights Python fundamentals, HTML, CSS, JavaScript, Git/GitHub, and problem-solving as learning areas. The skills section can be updated as experience grows.";
  }
  if (/(project|repository|repo|github|reading list|quiz|buggy|messy|basic program)/.test(q)) {
    return "The portfolio lists five practice repositories: Reading List, Quiz, Python Basic Programs, Messy Python Code, and Buggy Python Code. Their links are placeholders right now—add the real repository URLs in script.js before publishing.";
  }
  if (/(contact|email|reach|linkedin|hire|collaborat)/.test(q)) {
    return "You can reach Divya through the contact section. Update the placeholder email and social links near the top of script.js to make those links point to the right profiles.";
  }
  if (/(about|who are you|background|education|university|college|study)/.test(q)) {
    return "Divya Busaria is pursuing B.Tech in Computer Science & Engineering at JECRC University. This portfolio presents a student developer focused on learning through Python exercises, web development, and small practical projects.";
  }
  if (/(api|key|connect|integrat|openai|ai chatbot)/.test(q)) {
    return "The chatbot runs in demo mode now. To connect an AI model, create a small backend/serverless endpoint, save your API key as a server-side environment variable, then set chatApiEndpoint in script.js to your endpoint. Never publish a secret API key in frontend code.";
  }
  return "Thanks for your question! I'm currently in demo mode and can answer basic questions about Divya's portfolio. Ask about skills, projects, education, contact details, or connecting the AI API.";
}
async function getReply(message) {
  if (!PORTFOLIO_CONFIG.chatApiEndpoint) return localReply(message);
  const response = await fetch(PORTFOLIO_CONFIG.chatApiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  if (!response.ok) throw new Error("Chat endpoint returned an error.");
  const data = await response.json();
  if (!data.reply || typeof data.reply !== "string") throw new Error("Expected { reply: string } from the chat endpoint.");
  return data.reply;
}
async function sendMessage(message) {
  const clean = message.trim();
  if (!clean) return;
  addBubble(clean, "user");
  chatInput.value = "";
  const loading = addBubble("Thinking…");
  chatInput.disabled = true;
  try {
    loading.textContent = await getReply(clean);
  } catch (error) {
    loading.textContent = "I couldn't reach the AI service. Check your backend endpoint and try again.";
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(chatInput.value);
});
document.querySelectorAll(".quick-prompts button").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.textContent));
});
