class ProductController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  all() {
    console.log('controller all')
    let products = this.model.all()
    this.view.renderAll(products)
  }

  show(productId) {
    let product = this.model.find(productId)
    this.view.renderProduct(product)
  }

  create(product) {
    this.model.create(product)
    this.all();
  }

  delete(productId) {
    this.model.delete(productId)
    this.all();
  }

  sort(sortType) {
    let sorted = this.model.sort(sortType);
    this.view.renderAll(sorted);
  }
}

export default ProductController;