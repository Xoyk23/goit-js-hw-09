import gallery from './js/utils/app';

const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  closeBtnRef: document.querySelector('.lightbox__button'),
  modalRef: document.querySelector('.js-lightbox'),
  bigImageRef: document.querySelector('.lightbox__image'),
  overlayRef: document.querySelector('.lightbox__overlay'),
};

//1 Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

const makeGalleryMarkup = arr => {
  const item = arr
    .map(
      ({ preview, original, description }, index) =>
        `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${preview}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      data-index=${index}
      alt=${description}
    />
  </a>
</li>
`
    )
    .join('');

  return item;
};

refs.galleryRef.insertAdjacentHTML('beforeend', makeGalleryMarkup(gallery));
// =============================================================================
// Реализация делегирования на галерее ul.js-gallery
// и получение url большого изображения.
refs.galleryRef.addEventListener('click', galleryClickHeandler);

refs.closeBtnRef.addEventListener('click', modalCloseHeandler);

function galleryClickHeandler(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = event.target;

  setBigImage(imageRef);

  modalOpenHeandler();
  console.log('Click on gallery');
}

function setBigImage(imageRef) {
  refs.bigImageRef.src = imageRef.dataset.source;
  refs.bigImageRef.alt = imageRef.alt;
  refs.bigImageRef.index = imageRef.dataset.index;
}

function modalOpenHeandler() {
  refs.modalRef.classList.add('is-open');
  refs.overlayRef.addEventListener('click', overlayClickHeandler);

  window.addEventListener('keydown', closeModalByEsc);
}

function modalCloseHeandler() {
  refs.modalRef.classList.remove('is-open');
  refs.bigImageRef.src = '#';
  refs.bigImageRef.alt = '';

  window.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(e) {
  if (e.code === 'Escape') {
    modalCloseHeandler();
  }
}

function overlayClickHeandler(event) {
  if (event.target === event.currentTarget) {
    modalCloseHeandler();
  }
}

window.addEventListener('keydown', scrollByKeys);

// console.log(refs.bigImageRef.index);

function scrollByKeys(event) {
  console.log(event.code);
  let currentIndex = Number(refs.bigImageRef.index);

  console.log(refs.bigImageRef.index);

  if (event.code === 'ArrowRight' && currentIndex !== gallery.length - 1) {
    const nextImage = document.querySelector(
      `img[data-index="${currentIndex + 1}"]`
    );

    refs.bigImageRef.src = nextImage.dataset.source;
    refs.bigImageRef.alt = nextImage.alt;
    refs.bigImageRef.index = currentIndex + 1;
  } else if (event.code === 'ArrowLeft' && currentIndex !== 0) {
    const previosImage = document.querySelector(
      `img[data-index="${currentIndex - 1}"]`
    );

    refs.bigImageRef.src = previosImage.dataset.source;
    refs.bigImageRef.alt = previosImage.alt;
    refs.bigImageRef.index = currentIndex - 1;
  }
}
