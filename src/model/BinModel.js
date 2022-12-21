class BinModel {
  constructor() {
    this.binStorage = []
  }

  all() {
    return this.binStorage;
  }

  add(productId) {
    this.binStorage.push(productId);
    return this.binStorage;
  }


  remove(productId) {
    this.binStorage = this.binStorage.filter(item => +productId !== +item) || new Error('Not found');
    return this.binStorage;
  }

}

export default BinModel;