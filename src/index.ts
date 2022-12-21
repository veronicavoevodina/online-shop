import './style.css';
import { ProductModel } from './model/ProductModel';
import ProductController from './controller/ProductController';
import ProductView from './view/ProductView';
import { state } from './service/state';

function init() {
  // state
  const storedState = localStorage.getItem('state');
  !storedState || state.fromJson(storedState);
  window.onbeforeunload = () => {
    localStorage.setItem('state', state.toJson());
  };

  const view = new ProductView();
  const model = new ProductModel();
  const controller = new ProductController(model, view);
  controller.findAll(state.getFilters(), state.getSort());

  // sort
  const menuSort = document.querySelector('.dropdown-el') as HTMLElement;
  const sortType = document.getElementById(state.sort);
  sortType && ((sortType as HTMLInputElement).checked = true);

  menuSort.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();

    menuSort.classList.toggle('expanded');
  };

  const dropSownListOption = document.querySelectorAll('.dropdown-list__option');
  dropSownListOption.forEach((el) =>
    el?.addEventListener('click', (e) => {
      const target = e.target as HTMLInputElement;
      const sort = target.getAttribute('for');
      (target.previousSibling as HTMLInputElement).checked = true;
      state.setSort(sort as string);
      controller.findAll(state.getFilters(), state.getSort());
    })
  );

  // bin
  const container = document.querySelector('.container') as HTMLElement;
  const basketClear = document.querySelector('.basket__clear') as HTMLElement;
  const count = document.querySelector('.basket__count') as HTMLElement;
  count.innerHTML = state.getBin().length.toString();

  container.addEventListener('click', function (e) {
    const target = e.target as HTMLElement;
    if (target.id === 'bin') {
      const card = target.closest('.card') as HTMLElement;
      const productId = +(card.getAttribute('id') as string);
      const isInBin = +(card.getAttribute('in-bin') as string) ? 0 : 1;
      card.setAttribute('in-bin', isInBin.toString());
      if (isInBin) {
        if (state.getBin().length < 10) {
          card.style.background = 'darkseagreen';
        }
      } else {
        card.style.background = '';
      }
      isInBin ? state.addToBin(productId) : state.deleteFromBin(productId);
      count.innerHTML = state.getBin().length.toString();
    }
  });
  basketClear.addEventListener('click', function () {
    state.emptyBin();
    count.innerHTML = '0';
    const cards = document.querySelectorAll('.card');
    cards.forEach((el) => ((el as HTMLElement).style.backgroundColor = ''));
  });

  // filter by meaning
  const checkbox = document.querySelectorAll('input[type="checkbox"]');
  checkbox.forEach((elm) =>
    elm?.addEventListener('change', function () {
      const brandFilter: string[] = [];
      const destinationFilter: string[] = [];
      const sexFilter: string[] = [];
      const popularFilter: string[] = [];
      checkbox.forEach((el) => {
        const filterType = (el as HTMLInputElement).getAttribute('data-filter-type');
        switch (filterType) {
          case 'brand':
            (el as HTMLInputElement).checked &&
              !brandFilter.includes((el as HTMLInputElement).name) &&
              brandFilter.push((el as HTMLInputElement).name);
            break;
          case 'destination':
            (el as HTMLInputElement).checked &&
              !destinationFilter.includes((el as HTMLInputElement).name) &&
              destinationFilter.push((el as HTMLInputElement).name);
            break;
          case 'sex':
            (el as HTMLInputElement).checked &&
              !sexFilter.includes((el as HTMLInputElement).name) &&
              sexFilter.push((el as HTMLInputElement).name);
            break;
          case 'popular':
            (el as HTMLInputElement).checked &&
              !popularFilter.includes((el as HTMLInputElement).name) &&
              popularFilter.push((el as HTMLInputElement).name);
            break;
        }
      });
      state.addFilter('brands', brandFilter);
      state.addFilter('destinations', destinationFilter);
      state.addFilter('sexs', sexFilter);
      state.addFilter('populars', popularFilter);
      controller.findAll(state.getFilters(), state.getSort());
      container.innerHTML === '' ? getMistake() : 0;
    })
  );

  // filter range
  const rangeYear = document.querySelector('input[id="year"]') as HTMLInputElement;
  const rangeCount = document.querySelector('input[id="count"]') as HTMLInputElement;
  const maxCount = document.querySelector('.max-count') as HTMLInputElement;
  const maxYear = document.querySelector('.max-year') as HTMLElement;
  rangeYear.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    const from = target.min || null;
    const to = target.value || null;
    maxYear.innerHTML = rangeYear.value;
    state.addFilter('year', { from, to });
    controller.findAll(state.getFilters(), state.getSort());
    container.innerHTML === '' ? getMistake() : 0;
  });
  rangeCount.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    const from = target.min || null;
    const to = target.value || null;
    maxCount.innerHTML = rangeCount.value;
    state.addFilter('count', { from, to });
    controller.findAll(state.getFilters(), state.getSort());
    container.innerHTML === '' ? getMistake() : 0;
  });

  //searching
  const search = document.getElementById('search') as HTMLInputElement;
  const close = document.querySelector('.close') as HTMLElement;
  search.addEventListener('input', (e) => {
    console.log(e);
    const target = e.target as HTMLInputElement;
    controller.search(target.value, state.getFilters(), state.getSort());
    container.innerHTML === '' ? getMistake() : 0;
    close.onclick = function () {
      search.value = '';
      controller.findAll(state.getFilters(), state.getSort());
    };
  });

  function getMistake() {
    const mistake = document.createElement('div');
    mistake.textContent = 'Not found';
    mistake.className = 'mistake';
    container.appendChild(mistake);
  }

  const reset = document.querySelector('.reset-filters') as HTMLInputElement;
  reset.onclick = function () {
    rangeYear.value = '2022';
    rangeCount.value = '160';
    maxCount.innerHTML = '160';
    maxYear.innerHTML = '2022';
    state.reset();
    controller.findAll(state.getFilters(), state.getSort());
    checkbox.forEach((el) => ((el as HTMLInputElement).checked = false));
  };

  const resetSettings = document.querySelector('.reset-settings') as HTMLInputElement;
  resetSettings.onclick = function () {
    state.emptyBin();
    count.innerHTML = '0';
    state.filters = {
      brands: [],
      destinations: [],
      sexs: [],
      populars: [],
      year: { from: null, to: null },
      count: { from: null, to: null },
    };
    state.sort = 'sort-low';
    rangeYear.value = '2022';
    rangeCount.value = '160';
    maxCount.innerHTML = '160';
    maxYear.innerHTML = '2022';
    state.reset();
    controller.findAll(state.getFilters(), state.getSort());
    checkbox.forEach((el) => ((el as HTMLInputElement).checked = false));
    controller.findAll(state.getFilters(), state.getSort());
  };
}

init();
