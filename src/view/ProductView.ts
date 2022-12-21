import { state } from '../service/state';
import { Product } from '../model/ProductModel';

class ProductView {
  renderAll(products: Product[]) {
    const cardContainer = document.querySelector('.container') as HTMLElement;
    cardContainer.innerHTML = '';
    products.forEach((product) => {
      const productCard = this.renderProduct(product);
      cardContainer.appendChild(productCard);
    });
  }

  renderProduct(product: Product) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const year = document.createElement('p');
    const span = document.createElement('span');
    const price = document.createElement('p');
    const button = document.createElement('button');
    button.id = 'bin';
    button.textContent = 'add to bin';
    p.className = 'card__name';
    price.className = 'card__price';
    year.className = 'card__year';
    span.className = 'card__counter';
    p.textContent = product.name + ', ' + product.brand;
    span.textContent = 'Quantity in stock: ' + product.count;
    year.textContent = 'Year of issue: ' + product.year;
    price.textContent = 'Price: ' + product.price + '$';
    div.className = 'card';
    const img = document.createElement('img');
    img.className = 'card__picture';
    img.setAttribute('src', product.picture as string);
    img.setAttribute('alt', '');
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(year);
    div.appendChild(price);
    div.appendChild(button);
    div.setAttribute('id', product.id?.toString() as string);
    const isInBin = state.hasInBin(product.id as number);
    isInBin ? (div.style.background = 'darkseagreen') : (div.style.background = '');
    div.setAttribute('in-bin', isInBin.toString());
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    const filters = state.getFilters();
    checkbox.forEach((el) => {
      const filterType = el.getAttribute('id');
      for (const key in filters) {
        if (Array.isArray(filters[key as keyof typeof filters])) {
          if ((filters[key as keyof typeof filters] as string[]).length) {
            (filters[key as keyof typeof filters] as string[]).forEach((elm: string) => {
              filterType === elm ? ((el as HTMLInputElement).checked = true) : 0;
            });
          }
        }
      }
    });
    return div;
  }
}

export default ProductView;
