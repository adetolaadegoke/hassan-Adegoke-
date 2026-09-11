const swatches = document.querySelectorAll('.swatch');
const sizes = document.querySelectorAll('.size');
const colorName = document.getElementById('colorName');
const colorLabel = document.getElementById('colorLabel');
const productDescription = document.getElementById('productDescription');
const cartButton = document.getElementById('cartButton');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const scrim = document.getElementById('scrim');
const addButton = document.getElementById('addButton');
const cartCount = document.getElementById('cartCount');
const cartEmpty = document.getElementById('cartEmpty');
const cartItem = document.getElementById('cartItem');
const cartDetail = document.getElementById('cartDetail');
const checkoutButton = document.getElementById('checkoutButton');

let selectedColor = 'Black';
let selectedSize = 'S';

function toggleCart(open) {
  cartDrawer.classList.toggle('open', open);
  scrim.classList.toggle('show', open);
  cartDrawer.setAttribute('aria-hidden', String(!open));
}

swatches.forEach((swatch) => swatch.addEventListener('click', () => {
  swatches.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-checked', 'false'); });
  swatch.classList.add('active');
  swatch.setAttribute('aria-checked', 'true');
  selectedColor = swatch.dataset.color;
  colorName.textContent = selectedColor.toUpperCase();
  colorLabel.textContent = selectedColor.toUpperCase();
  productDescription.textContent = swatch.dataset.desc;
}));

sizes.forEach((size) => size.addEventListener('click', () => {
  sizes.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-checked', 'false'); });
  size.classList.add('active');
  size.setAttribute('aria-checked', 'true');
  selectedSize = size.textContent;
}));

addButton.addEventListener('click', () => {
  cartCount.textContent = '1';
  cartEmpty.hidden = true;
  cartItem.hidden = false;
  cartDetail.textContent = `${selectedColor.toUpperCase()} / ${selectedSize}`;
  checkoutButton.disabled = false;
  toggleCart(true);
});
cartButton.addEventListener('click', () => toggleCart(true));
closeCart.addEventListener('click', () => toggleCart(false));
scrim.addEventListener('click', () => toggleCart(false));
checkoutButton.addEventListener('click', () => { checkoutButton.textContent = 'COMING SOON'; });
