import BinController from "../controller/BinController";

class ProductView {
  renderAll(products) {
    const cardContainer = document.querySelector('.container');
    cardContainer.innerHTML = '';
    products.forEach((product) => {
    let productCard = this.renderProduct(product);
    cardContainer.appendChild(productCard);
    })
  }

  renderProduct(product) {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let year = document.createElement('p');
    let span = document.createElement('span');
    let price = document.createElement('p');
    let button = document.createElement('button');
    button.classList = 'bin';
    button.textContent = 'add to bin';
    p.classList = 'card__name';
    price.classList = 'card__price';
    year.classList = 'card__year';
    span.classList = 'card__counter';
    p.textContent = product.name + ", " + product.brand;
    span.textContent = 'Quantity in stock: ' + product.count;
    year.textContent = 'Year of issue: ' + product.year;
    price.textContent = "Price: " + product.price + '$';
    div.classList = "card";
    let img = document.createElement('img');
    img.classList = 'card__picture';
    img.setAttribute('src', product.picture);
    img.setAttribute('alt', '');
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(year);
    div.appendChild(price);
    div.appendChild(button);
    div.setAttribute('id', product.id);
    return div;
  }
}

export default ProductView;