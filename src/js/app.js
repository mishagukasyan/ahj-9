import { createNotification, addCoords, addBtnHendler } from "./DOM.js";

import { removeMessage, loadMessages } from "./local_storage.js";

document.addEventListener("DOMContentLoaded", () => {
  loadMessages();
  addBtnHendler();
});

export function btnHandle(e) {
  e.preventDefault();
  const removeBtn = e.target;
  const parent = removeBtn.closest(".message");
  const textMessage = parent.querySelector(".textMesage");
  console.log(textMessage);
  if (textMessage) {
    removeMessage(textMessage.textContent);
  }
  if (parent) {
    parent.remove();
  }
}

export function closeNotification() {
  const notification = document.querySelector(".notification");
  notification.remove();
}

export function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (data) {
          const { latitude, longitude } = data.coords;
          resolve(`${latitude}, ${longitude}`);
        },
        function (err) {
          console.log(err);
          createNotification();
          reject(err);
        },
      );
    } else {
      reject(new Error("Геолокация не поддерживается браузером"));
    }
  });
}

export function parseCoordinates(input) {
  input = input.replace(/[[]/g, "").trim();

  const [latStr, lonStr] = input.split(",").map((str) => str.trim());

  const latitude = parseFloat(latStr);
  const longitude = parseFloat(lonStr);

  if (
    isNaN(latitude) ||
    isNaN(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    alert("Невалидный формат");
    return;
  }

  return `${latitude}, ${longitude}`;
}

export function addCoordsHandler(e) {
  e.preventDefault();

  const field = document.querySelector(".textCoord");
  const value = field.value;
  if (value.trim() === "") {
    return;
  }
  const coords = parseCoordinates(value);
  addCoords(coords);
  field.value = "";
  closeNotification();
}
