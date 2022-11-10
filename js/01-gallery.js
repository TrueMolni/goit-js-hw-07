import { galleryItems } from "./gallery-items.js";
// Change code below this line

// посилання на елементи галереї і модалки
const refs = {
  galleryDivRef: document.querySelector(".gallery"),
  modalRef: document.querySelector(".modal"),
};

//функція для створення галереї
function createGallery() {
  //одним рядком створюємо розмітку галереї
  return refs.galleryDivRef.insertAdjacentHTML(
    "beforeend",
    galleryItems
      .map(({ preview, original, description }) => {
        return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
      })
      .join("")
  );
}
// викликаємо ф-ію і створюємо нашу галерею
createGallery();

// вішаємо слухача події на <div> галереї для делегування
refs.galleryDivRef.addEventListener("click", onGalleryHandle);

// сallback для обробки події в galleryDivRef
function onGalleryHandle(event) {
  // забороняємо дії за замовчуванням
  event.preventDefault();

  // створюємо розмітку модалки
  const instance = basicLightbox.create(
    `
    <div class="modal">
        <img  class="modal__img" src="${event.target.dataset.source}"/>
    </div>`
  );

  // перевіряємо ціль події, щоб не відкривало картинку, окрім
  // як по картці
  if (event.target.nodeName !== "IMG") {
    return;
  }

  instance.show();

  // вішаємо слухача події для закриття модалки
  document.addEventListener(
    "keydown",
    //   функція для закриття модалки через клавішу Escape
    // передаю всі умови в самому колбеці
    (onEscapePress = (event) => {
      if (event.code === "Escape") {
        instance.close();
        document.removeEventListener("keydown", onEscapePress);
      }
    })
  );
}

// оголошую саму функцію, щоб все працювало
function onEscapePress() {}
