import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from './js/pixabay-api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  svgLikes,
  svgComments,
  svgViews,
  svgDownloads,
  svgSearch,
} from './js/svg-icons';

const refs = {
  form: document.querySelector('#search-form'),
  submitBtn: document.querySelector('#search-form > button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loader: document.querySelector('.loader'),
};

refs.submitBtn.insertAdjacentHTML('beforeend', svgSearch);
const pixabayApiService = new PixabayApiService();
const simpleLigtboxGallery = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(evt) {
  evt.preventDefault();
  clearGallery();
  hideLoadMoreBtn();
  showLoader();
  pixabayApiService.resetPage();
  pixabayApiService.searchQuery = evt.target.elements.searchQuery.value.trim();

  try {
    const { totalHits, hits } = await pixabayApiService.fetchImages();

    pixabayApiService.amountOfPages = Math.ceil(totalHits / 40);
    if (pixabayApiService.canLoadMoreImages()) {
      showLoadMoreBtn();
    }

    if (totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);
    const markup = createGalleryMarkup(hits);

    renderGallery(markup);
    simpleLigtboxGallery.refresh();
    hideLoader();
    addSmoothScroll();
  } catch (err) {
    console.log(err);
  }
}

async function onLoadMoreBtnClick() {
  hideLoadMoreBtn();
  showSmallLoader();
  pixabayApiService.increasePage();
  
  try {
    const { hits } = await pixabayApiService.fetchImages();
    const markup = createGalleryMarkup(hits);
    
    renderGallery(markup);
    simpleLigtboxGallery.refresh();
    hideSmallLoader();
    showLoadMoreBtn();
    addSmoothScroll();

    if (!pixabayApiService.canLoadMoreImages()) {
      hideLoadMoreBtn();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (err) {
    console.log(err);
  }
}

function createGalleryMarkup(list) {
  return list
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        downloads,
        comments,
      }) =>
        `<div class="photo-card">
    <a class='card-link' href="${webformatURL}">
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
    <p class="info-item">
    ${svgLikes}
    <span> ${likes} </span>  
    </p>
    <p class="info-item">
    ${svgViews}
    <span> ${views} </span>  
    </p>
    <p class="info-item">
    ${svgComments}
    <span> ${comments} </span>  
    </p>
    <p class="info-item">
    ${svgDownloads}
    <span> ${downloads} </span>  
    </p>
    </div>
    </div>`
    )
    .join('');
}

function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

function addSmoothScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
refs.loader.classList.add('hidden');
}

function showSmallLoader() {
  refs.loader.classList.remove('hidden');
  refs.loader.classList.add('loader--small');
}

function hideSmallLoader() {
  refs.loader.classList.add('hidden');
  refs.loader.classList.remove('loader--small')
}

