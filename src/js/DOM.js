import {
  btnHandle,
  closeNotification,
  getGeolocation,
  addCoordsHandler,
} from "./app.js";

import { saveMessage } from "./local_storage.js";

export function addBtnHendler() {
  const addBtn = document.querySelector(".btn");

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const field = document.querySelector(".text");
    const value = field.value;
    if (value.trim() === "") {
      return;
    }

    createMessage(value);
    field.value = "";
  });
}

export function patternMessage(text) {
  const container = document.querySelector(".messages");

  const message = document.createElement("div");
  message.classList.add("message");

  const textMesage = document.createElement("span");
  textMesage.classList.add("textMesage");
  textMesage.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove");
  removeBtn.textContent = "\u2715";
  removeBtn.addEventListener("click", btnHandle);

  message.appendChild(textMesage);
  message.appendChild(removeBtn);
  container.appendChild(message);

  return message;
}

export async function createMessage(text) {
  const geolocation = document.createElement("span");
  geolocation.classList.add("geo");
  try {
    const location = await getGeolocation();
    geolocation.textContent = location;
  } catch (err) {
    geolocation.textContent = "";
  }

  const message = patternMessage(text);
  message.appendChild(geolocation);
  saveMessage(text, geolocation.textContent);
}

export function createNotification() {
  const body = document.getElementsByTagName("body")[0];
  const container = document.createElement("div");
  container.classList.add("notification");
  container.style.display = "flex";

  const textInformation = document.createElement("span");
  textInformation.classList.add("textMesage");
  textInformation.innerHTML =
    "Что-то пошло не так.<br>К сожалению, нам не удалось определить ваше местоположение. Дайте разрешение на использование геолокации, либо введите координаты вручную.<br> Широта и долгота через запятую.";

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("removeBtn");
  closeBtn.textContent = "\u2715";
  closeBtn.addEventListener("click", closeNotification);

  const form = document.createElement("form");
  form.classList.add("form");

  const field = document.createElement("textarea");
  field.classList.add("textCoord");
  field.placeholder = "51.50851, -0.12572";

  const buttonOk = document.createElement("button");
  buttonOk.classList.add("btnOk");
  buttonOk.textContent = "OK";
  buttonOk.addEventListener("click", addCoordsHandler);

  form.appendChild(field);
  form.appendChild(buttonOk);

  container.appendChild(textInformation);
  container.appendChild(closeBtn);
  container.appendChild(form);

  body.appendChild(container);
}

export function addCoords(value) {
  const message = document.querySelector(".messages");
  const currentMessage = message.lastChild;
  const coords = document.createElement("span");
  coords.textContent = value;
  coords.classList.add("geo");
  currentMessage.appendChild(coords);
}
