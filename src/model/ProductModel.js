class Product {
  constructor(name,count, year, price, brand, distination, sex, popular, picture, id) {
      this.name = name,
      this.count = count,
      this.price = price,
      this.year = year,
      this.brand = brand,
      this.distination = distination,
      this.sex = sex,
      this.popular = popular,
      this.picture = picture
      this.id = id
  }
}
class ProductModel {
  constructor() {
    this.productStorage = [
      new Product('Face mask', 120, 2020, 50, 'L`ador', 'Face', 'Female', false, require('../assets/images/lador-mask-face.jpg'), 1),
      new Product('Hair mask', 155, 2019, 45, 'L`ador', 'Heir', 'Female', false, require('../assets/images/lador-mask-heir.jpg'), 2),
      new Product('Shampoo', 30, 2020, 50, 'L`ador', 'Heir', 'Female', false, require('../assets/images/lador-shampoo.jpg'), 3),
      new Product('Body milk', 90, 2018, 12, 'Neutrogena', 'Body', 'Unisex', true, require('../assets/images/neutrogena-body.jpg'), 4),
      new Product('Face cream',80, 2017, 50,  'Neutrogena', 'Face', 'Female', true, require('../assets/images/neutrogena-face.jpg'), 5),
      new Product('Hand cream', 140, 2018, 65, 'Neutrogena', 'Hand', 'Unisex', false, require('../assets/images/neutrogena-hand.jpg'), 6),
      new Product('After shave balm', 98, 2020, 50, 'Nivea', 'Face', 'Male', false, require('../assets/images/nivea-balm.jpg'), 7),
      new Product('Kids lotion', 65, 2021, 28, 'Nivea', 'Body', 'Kids', true, require('../assets/images/nivea-kids-lotion.jpg'), 8),
      new Product('Kids lotion', 45, 2020, 50, 'Nivea', 'Body', 'Kids', true, require('../assets/images/nivea-kids-spray.jpg'), 9),
      new Product('Shampoo', 54, 2022, 65, 'Nivea', 'Heir', 'Male', false, require('../assets/images/nivea-shampoo-man.jpg'), 10),
      new Product('Hand cream', 145, 2019, 78, 'Neutrogena', 'Hand', 'Unisex', false, require('../assets/images/neutrogena-hand2.jpg'), 11),
      new Product('Body cream', 120, 2018, 50, 'Nivea', 'Body', 'Unisex', false, require('../assets/images/nivea-spray.jpg'), 12)
    ];
  }
  all() {
    return this.productStorage || []
  }

  find(userId) {
    return this.productStorage.find((user) => +userId === user.id) || new Error('Not found')
  }

  create(user) {
    user.id = Math.max(...this.productStorage.map(item => item.id)) + 1;
    this.productStorage.push(user)
  }

  delete(userId) {
    this.productStorage = this.productStorage.filter(item => +userId !== item.id) || new Error('Not found')
  }

  sort(sortType) {
    return this.productStorage.sort((a, b) => {  
      let compare;   
      switch (sortType) {            
          case 'sort-low':
              compare = a.year - b.year;
              break;
          case 'sort-high':
              compare = b.year - a.year;
              break;
          case 'sort-name':
              compare = a.name.toLowerCase() > b.name.toLowerCase()? 1 : -1;  
              break;  
          case 'sort-name-back':
              compare = b.name.toLowerCase() > a.name.toLowerCase()? 1 : -1;  
              break; 
      };
      return compare;
  })
  
  }
}

export default ProductModel;