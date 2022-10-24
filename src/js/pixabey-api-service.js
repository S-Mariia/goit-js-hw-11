const BASE_URL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '30801365-9fdc371d6ba359459ec7eb092',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export default class PixabayApiService {
  #searchQuery;
  #amountOfPages;

  constructor() {
    this.#searchQuery = '';
    this.#amountOfPages = null;
    this.page = 1;
  }

  async fetchImages() {
    const response = await fetch(
      `${BASE_URL}?q=${this.searchQuery}&page=${this.page}&${searchParams}`
    );
    return await response.json();
  }

  increasePage() {
    this.page += 1;
  }

  canLoadMoreImages() {
    return this.page < this.amountOfPages ? true : false;
  }

  resetPage() {
    this.page = 1;
  }

  get searchQuery() {
    return this.#searchQuery;
  }

  set searchQuery(newSearchQuery) {
    this.#searchQuery = newSearchQuery;
  }

  get amountOfPages() {
    return this.#amountOfPages;
  }

  set amountOfPages(amount) {
    this.#amountOfPages = amount;
  }
}
