import './style.css';
import ProductModel from './model/ProductModel';
import ProductController from './controller/ProductController';
import ProductView from './view/ProductView';
import BinModel from './model/BinModel';
import BinController from './controller/BinController';
import BinView from './view/BinView';

function init() {
  let view = new ProductView();
  let model = new ProductModel();
  let controller = new ProductController(model, view);
  let binModel = new BinModel();
  let binView = new BinView();
  let binController = new BinController(binModel, binView);
  controller.all();

  // filter
  let menuSort = document.querySelector('.dropdown-el');

  menuSort.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();

    menuSort.classList.toggle('expanded');
  };

  const dropSownListOption = document.querySelectorAll('.dropdown-list__option');
  dropSownListOption.forEach((el) =>
    el.addEventListener('click', (e) => controller.sort(e.target.getAttribute('for')))
  );

  // bin
  let binButton = document.querySelectorAll('.bin');
  binButton.forEach((el) =>
    el.addEventListener('click', (e) => {
      let card = e.target.closest('.card');
      let productId = card.getAttribute('id');
      let isInBin = +card.getAttribute('in-bin') || 0;
      card.setAttribute('in-bin', isInBin ? 0 : 1);
      isInBin ? binController.remove(productId) : binController.add(productId);
    })
  );
}

init();
