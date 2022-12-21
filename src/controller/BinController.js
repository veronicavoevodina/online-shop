class BinController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
  
  show() {
    let products = this.model.all();
    this.view.renderBin(products);
  }

  add(product) {
    let products = this.model.add(product);
    this.view.renderBin(products);
  }

  remove(productId) {
    let products = this.model.remove(productId);
    this.view.renderBin(products);
  }

}

export default BinController;