import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchSearchResult } from './js/pixabay-api.js';
import { renderSearchCard } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = event.target.elements.search.value.trim();
  if (!searchQuery) {
    iziToast.show({
      message: 'Введіть слово для пошуку!',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';

  loader.style.display = 'block';

  fetchSearchResult(searchQuery)
    .then(images => {
      if (!images || images.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#EF4040',
          messageColor: '#FAFAFB',
          iconColor: '#FAFAFB',
        });
      } else {
        renderSearchCard(images);
      }
    })
    .catch(error => {
      console.error('Error while retrieving images:', error);
      iziToast.show({
        message: 'An error occurred while searching. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FAFAFB',
        iconColor: '#FAFAFB',
      });
    })
    .finally(() => {
      loader.style.display = 'none';
    });

  form.reset();
});
