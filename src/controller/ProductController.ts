import ProductView from '../view/ProductView';
import { Product, ProductModel } from '../model/ProductModel';
import { IFilter } from '../types';

class ProductController {
  model;
  view;
  constructor(model: ProductModel, view: ProductView) {
    this.model = model;
    this.view = view;
  }

  all() {
    const products = this.model.all();
    this.view.renderAll(products);
  }

  show(productId: string) {
    const product = this.model.find(productId);
    this.view.renderProduct(product);
  }

  findAll(filters: IFilter, sortType: string) {
    const filtered = this.model.filter(filters).sort(sortType).get();
    this.view.renderAll(filtered as Product[]);
  }

  search(searchType: string, filters: IFilter, sortType: string) {
    const searched = this.model.filter(filters).sort(sortType).search(searchType);
    this.view.renderAll(searched);
  }

  rangeYear(rangeType: string) {
    const ranged = this.model.rangeYear(rangeType);
    this.view.renderAll(ranged);
  }

  rangeCount(rangeType: number) {
    const ranged = this.model.rangeCount(rangeType);
    this.view.renderAll(ranged);
  }
}

export default ProductController;
