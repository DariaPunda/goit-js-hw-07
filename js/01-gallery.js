import { galleryItems } from './gallery-items.js';


// Выполняй это задание в файлах 01 - gallery.html 
// и 01 - gallery.js.Разбей его на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных galleryItems и 
// предоставленному шаблону элемента галереи.
// 2. Реализация делегирования на div.gallery и получение url большого
// изображения.
// 3.Подключение скрипта и стилей библиотеки модального окна basicLightbox.
// Используй CDN сервис jsdelivr и добавь в проект ссылки на
// минифицированные(.min) файлы библиотеки.
// 4. Открытие модального окна по клику на элементе галереи. 
// Для этого ознакомься с документацией и примерами.
// 5. Замена значения атрибута src элемента < img > в модальном окне 
// перед открытием.Используй готовую разметку модального окна с 
// изображением из примеров библиотеки basicLightbox.
const galleryEl = document.querySelector('.gallery');

const markupString = createGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', markupString);

function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
    }).join('');
   
};

galleryEl.addEventListener('click', openImage);

function openImage(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains('gallery__image')) {
        return; 
    }
    const largeImageForModal = evt.target.dataset.source;
    const altImg = evt.target.alt;

    const instance = basicLightbox.create(`
    <img
      src="${largeImageForModal}",
      alt = "${altImg}"
      width = 100%,
      height = 100%
    />
    `,
        window.addEventListener('keydown', closeOnEsc));

    function closeOnEsc(evt) {
    if (evt.code === 'Escape') {
        instance.close(window.removeEventListener('keydown', closeOnEsc));
        }
    };

    instance.show();
};

