import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  galleryUlRef: document.querySelector(".gallery"),
  modalRef: document.querySelector(".modal"),
};

//функція для створення галереї
function createGallery() {
  //одним рядком створюємо розмітку галереї
  return refs.galleryUlRef.insertAdjacentHTML(
    "beforeend",
    galleryItems
      .map(({ preview, original, description }) => {
        return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
      })
      .join("")
  );
}
// викликаємо ф-ію і створюємо нашу галерею
createGallery();

// вішаємо слухача події на <div> галереї для делегування
const onGalleryHandle = (event) => {
  event.preventDefault();
};

refs.galleryUlRef.addEventListener("click", onGalleryHandle);

//lightbox

const instance = new SimpleLightbox(".gallery a");
instance.on("error.simplelightbox", function (e) {
  console.log(e); // some usefull information
});

// const lightbox = new SimpleLightbox(".gallery a", {
//   captionsData: "alt",
//   captionDelay: 250,
//   scrollZoom: false,
// });

// lightbox.on("shown.simplelightbox", function () {
//   refs.body.classList.add("disable-scroll");
// });
// lightbox.on("closed.simplelightbox", function () {
//   refs.body.classList.remove("disable-scroll");
// });
