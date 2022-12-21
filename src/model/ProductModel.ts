import { IFilter, Range } from '../types/index';
export class Product {
  brand?: string;
  name?: string;
  count?: number;
  price?: number;
  year?: string;
  destination?: string;
  sex?: string;
  popular?: string;
  picture?: string;
  id?: number;
  constructor(
    name: string,
    count: number,
    year: string,
    price: number,
    brand: string,
    destination: string,
    sex: string,
    popular: string,
    picture: string,
    id: number
  ) {
    (this.name = name),
      (this.count = count),
      (this.price = price),
      (this.year = year),
      (this.brand = brand),
      (this.destination = destination),
      (this.sex = sex),
      (this.popular = popular),
      (this.picture = picture);
    this.id = id;
  }
}
export class ProductModel {
  productStorage;
  currentQuery: Product[] | null;
  constructor() {
    this.productStorage = [
      new Product(
        'Face mask',
        120,
        '2020',
        50,
        'Lador',
        'Face',
        'Female',
        'false',
        require('../assets/images/lador-mask-face.jpg'),
        1
      ),
      new Product(
        'Hair mask',
        155,
        '2019',
        45,
        'Lador',
        'Hair',
        'Female',
        'false',
        require('../assets/images/lador-mask-heir.jpg'),
        2
      ),
      new Product(
        'Shampoo',
        30,
        '2020',
        50,
        'Lador',
        'Hair',
        'Female',
        'false',
        require('../assets/images/lador-shampoo.jpg'),
        3
      ),
      new Product(
        'Body milk',
        90,
        '2018',
        12,
        'Neutrogena',
        'Body',
        'Female',
        'popular',
        require('../assets/images/neutrogena-body.jpg'),
        4
      ),
      new Product(
        'Face cream',
        80,
        '2017',
        50,
        'Neutrogena',
        'Face',
        'Female',
        'popular',
        require('../assets/images/neutrogena-face.jpg'),
        5
      ),
      new Product(
        'Hand cream',
        140,
        '2018',
        65,
        'Neutrogena',
        'Hand',
        'Female',
        'false',
        require('../assets/images/neutrogena-hand.jpg'),
        6
      ),
      new Product(
        'After shave balm',
        98,
        '2020',
        50,
        'Nivea',
        'Face',
        'Male',
        'false',
        require('../assets/images/nivea-balm.jpg'),
        7
      ),
      new Product(
        'Kids lotion',
        65,
        '2021',
        28,
        'Nivea',
        'Body',
        'Kids',
        'popular',
        require('../assets/images/nivea-kids-lotion.jpg'),
        8
      ),
      new Product(
        'Kids lotion',
        45,
        '2020',
        50,
        'Nivea',
        'Body',
        'Kids',
        'popular',
        require('../assets/images/nivea-kids-spray.jpg'),
        9
      ),
      new Product(
        'Shampoo',
        54,
        '2022',
        65,
        'Nivea',
        'Hair',
        'Male',
        'false',
        require('../assets/images/nivea-shampoo-man.jpg'),
        10
      ),
      new Product(
        'Hand cream',
        145,
        '2019',
        78,
        'Neutrogena',
        'Hand',
        'Female',
        'false',
        require('../assets/images/neutrogena-hand2.jpg'),
        11
      ),
      new Product(
        'Body cream',
        120,
        '2018',
        50,
        'Nivea',
        'Body',
        'Female',
        'false',
        require('../assets/images/nivea-spray.jpg'),
        12
      ),
    ];
    this.currentQuery = null;
  }
  all() {
    return this.productStorage || [];
  }

  find(cardId: string | number) {
    return this.productStorage.find((card) => +cardId === card.id) || new Error('Not found');
  }

  sort(sortType: string) {
    const products = this.currentQuery || [...this.productStorage];
    this.currentQuery = products.sort((a, b) => {
      let compare = 0;
      switch (sortType) {
        case 'sort-low':
          compare = +(a.year as string) - +(b.year as string);
          break;
        case 'sort-high':
          compare = +(b.year as string) - +(a.year as string);
          break;
        case 'sort-name':
          compare = (a.name?.toLowerCase() as string) > (b.name?.toLowerCase() as string) ? 1 : -1;
          break;
        case 'sort-name-back':
          compare = (b.name?.toLowerCase() as string) > (a.name?.toLowerCase() as string) ? 1 : -1;
          break;
      }
      return compare;
    });

    return this;
  }

  filter(filterArr: IFilter) {
    const products = this.currentQuery || [...this.productStorage];
    this.currentQuery = products.filter((card) => {
      return (
        (!(filterArr.brands as string[])?.length ||
          (filterArr.brands as string[]).includes(card.brand?.toLowerCase() as string)) &&
        (!(filterArr.destinations as string[])?.length ||
          (filterArr.destinations as string[]).includes(card.destination?.toLowerCase() as string)) &&
        (!(filterArr.sexs as string[])?.length ||
          (filterArr.sexs as string[]).includes(card.sex?.toLowerCase() as string)) &&
        (!(filterArr.populars as string[])?.length ||
          (filterArr.populars as string[]).includes(card.popular as string)) &&
        (!(filterArr.year as Range)?.from || ((filterArr.year as Range).from as string) <= (card.year as string)) &&
        (!(filterArr.year as Range)?.to || ((filterArr.year as Range).to as string) >= (card.year as string)) &&
        (!(filterArr.count as Range)?.from || ((filterArr.count as Range).from as number) <= (card.count as number)) &&
        (!(filterArr.count as Range)?.to || ((filterArr.count as Range).to as number) >= (card.count as number))
      );
    });

    return this;
  }

  search(value: string) {
    const result: Product[] = [];
    const products = this.currentQuery || [...this.productStorage];
    products.forEach((i) => {
      const name = i.name?.toLowerCase();
      if (name?.indexOf(value.toLowerCase()) != -1) result.push(i);
    });
    return result;
  }

  rangeYear(value: string) {
    return this.productStorage.filter((i) => (i.year as string) <= value);
  }

  rangeCount(value: number) {
    return this.productStorage.filter((i) => (i.count as number) <= value);
  }

  get() {
    const result = [...(this.currentQuery as Product[])];
    this.currentQuery = null;
    return result;
  }
}
