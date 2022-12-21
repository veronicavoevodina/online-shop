class BinView {
  renderBin(products) {
    let count = document.querySelector('.basket__count');
    count.innerHTML = products.length;
  }
}

export default BinView;