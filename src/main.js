import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchSearchResult } from './js/pixabay-api.js';
import { renderSearchCard } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');

let currentPage = 1;
let totalPages = 0;
let searchQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = event.target.elements.search.value.trim();
  if (!searchQuery) {
    iziToast.show({
      message: 'Enter a search term!',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  currentPage = 1;
  loadMore.classList.add('visually-hidden');
  loader.style.display = 'block';

  try {
    const { images, totalResults } = await fetchSearchResult(
      searchQuery,
      currentPage
    );

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
      totalPages = Math.ceil(totalResults / 15);

      if (currentPage < totalPages) {
        loadMore.classList.remove('visually-hidden');
      }
    }
  } catch (error) {
    console.error('Error while retrieving images:', error);
    iziToast.show({
      message: 'An error occurred while searching. Please try again!',
      position: 'topRight',
      maxWidth: '400px',
      backgroundColor: '#EF4040',
      messageColor: '#FAFAFB',
      iconColor: '#FAFAFB',
    });
  } finally {
    loader.style.display = 'none';
  }

  form.reset();
});

loadMore.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const { images } = await fetchSearchResult(searchQuery, currentPage);

    renderSearchCard(images);

    const firstCard = document.querySelector('.galleryCard');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (currentPage >= totalPages) {
      loadMore.classList.add('visually-hidden');
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        maxWidth: '400px',
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Error while retrieving more images:', error);
    iziToast.show({
      message: 'An error occurred while loading more images. Please try again!',
      position: 'topRight',
      width: 400,
      backgroundColor: '#EF4040',
      messageColor: '#FAFAFB',
      iconColor: '#FAFAFB',
    });
  } finally {
    loader.style.display = 'none';
  }
});
