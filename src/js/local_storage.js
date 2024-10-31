import { patternMessage } from "./DOM.js";

export function saveMessage(text, location) {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push({ text, location });
  localStorage.setItem("messages", JSON.stringify(messages));
}

export function removeMessage(text) {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages = messages.filter((message) => message.text !== text);
  localStorage.setItem("messages", JSON.stringify(messages));
}

export function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.forEach(({ text, location }) => {
    const message = patternMessage(text);

    const geolocation = document.createElement("span");
    geolocation.classList.add("geo");
    geolocation.textContent = location;

    message.appendChild(geolocation);
  });
}
