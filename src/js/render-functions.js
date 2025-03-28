import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightboxInstance = null;

export function initLightbox() {
  if (!lightboxInstance) {
    lightboxInstance = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
  }
  return lightboxInstance;
}

export async function renderSearchCard(images, lightbox) {
  if (!images.length) return;

  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="galleryCard">
          <a href="${largeImageURL}">
            <img class="img" src="${webformatURL}" alt="${tags}">
          </a>
          <ul class="attributesList">
            <li class="attributesItem"><span class="attributesLabel">Likes</span><br>${likes}</li>
            <li class="attributesItem"><span class="attributesLabel">Views</span><br>${views}</li>
            <li class="attributesItem"><span class="attributesLabel">Comments</span><br>${comments}</li>
            <li class="attributesItem"><span class="attributesLabel">Downloads</span><br>${downloads}</li>
          </ul>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
