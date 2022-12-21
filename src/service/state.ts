import { Range, IFilter } from '../types/index';

export const state = {
  bin: new Set(),
  filters: {
    brands: [],
    destinations: [],
    sexs: [],
    populars: [],
    year: { from: null, to: null },
    count: { from: null, to: null },
  } as IFilter,
  sort: 'sort-low',

  //bin
  addToBin(cardId: number) {
    if (state.getBin().length >= 10) {
      alert('Too much goods at shop card!');
    } else {
      this.bin.add(cardId);
    }
  },

  hasInBin(cardId: number) {
    return +this.bin.has(cardId);
  },

  getBin() {
    return [...this.bin];
  },

  deleteFromBin(card: number) {
    this.bin.delete(card);
  },

  emptyBin() {
    this.bin = new Set();
  },

  //filter
  addFilter(filterType: string, filter: string[] | Range) {
    switch (filterType) {
      case 'brands':
      case 'destinations':
      case 'sexs':
      case 'populars':
        this.filters[filterType] = filter as string[];
        break;
      case 'year':
      case 'count':
        this.filters[filterType] = filter as Range;
        break;
    }
  },

  getFilters() {
    return this.filters;
  },

  deleteFilter(filterType: string) {
    switch (filterType) {
      case 'brands':
      case 'destinations':
      case 'sexs':
      case 'populars':
        this.filters[filterType] = [];
        break;
      case 'year':
      case 'count':
        this.filters[filterType] = { from: null, to: null };
    }

    this.filters[filterType as keyof IFilter] = null;
  },

  setSort(item: string) {
    this.sort = item;
  },

  //sort
  getSort() {
    return this.sort;
  },

  deleteSort() {
    return this.sort;
  },

  reset() {
    (this.filters.brands = []),
      (this.filters.destinations = []),
      (this.filters.sexs = []),
      (this.filters.populars = []),
      (this.filters.year = { from: null, to: null }),
      (this.filters.count = { from: null, to: null });
  },

  toJson() {
    return JSON.stringify({
      bin: this.getBin(),
      filters: this.getFilters(),
      sort: this.getSort(),
    });
  },

  fromJson(json: string) {
    const state = JSON.parse(json);
    this.bin = new Set(state.bin);
    this.filters = state.filters;
    this.sort = state.sort;
  },
};
