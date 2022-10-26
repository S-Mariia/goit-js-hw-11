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
var throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('#search-form'),
  submitBtn: document.querySelector('#search-form > button'),
  gallery: document.querySelector('.gallery'),
  target: document.querySelector('.guard'),
  scrollUpBtn: document.querySelector('.btn-scroll-up'),
  loader: document.querySelector('.loader'),
};

refs.submitBtn.insertAdjacentHTML('beforeend', svgSearch);
const pixabayApiService = new PixabayApiService();
const simpleLigtboxGallery = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onFormSubmit);
refs.scrollUpBtn.addEventListener('click', onScrollUpBtnClick);
window.addEventListener('scroll', throttle(onScroll, 500));

let options = {
  root: null,
  rootMargin: '40px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onIntersectionObserver, options);

function onScrollUpBtnClick() {
  hideScrollUpBtn();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function onScroll() {
  if (window.scrollY > window.innerHeight) {
    showScrollUpBtn();
    return;
  }
  hideScrollUpBtn();
}

async function onFormSubmit(evt) {
  evt.preventDefault();
  showLoader();
  
  const query = evt.target.elements.searchQuery.value.trim();
  try {
  if (query === '') {
    Notify.warning(
      'The input is empty. Please type something.'
      );
      hideLoader();
      throw new Error('empty input');
    }
    pixabayApiService.searchQuery = query;
    
    clearGallery();
    pixabayApiService.resetPage();
    
    const { totalHits, hits } = await pixabayApiService.fetchImages();

    pixabayApiService.amountOfPages = Math.ceil(totalHits / 40);

    if (totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoader();
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);
    const markup = createGalleryMarkup(hits);

    renderGallery(markup);
    simpleLigtboxGallery.refresh();
    hideLoader();
  } catch (err) {
    console.log(err);
  }

  observer.observe(refs.target);
}

async function onIntersectionObserver(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      pixabayApiService.increasePage();
      if (!pixabayApiService.canLoadMoreImages()) {
        observer.unobserve(refs.target);
      }

      try {
        const { hits } = await pixabayApiService.fetchImages();
        const markup = createGalleryMarkup(hits);

        renderGallery(markup);
        simpleLigtboxGallery.refresh();
      } catch (err) {
        console.log(err);
      }
    }
  });
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

function showScrollUpBtn() {
  refs.scrollUpBtn.classList.remove('hidden');
}

function hideScrollUpBtn() {
  refs.scrollUpBtn.classList.add('hidden');
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
refs.loader.classList.add('hidden');
}

