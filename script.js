const swatches = document.querySelectorAll('.swatch');
const sizes = document.querySelectorAll('.size:not(.cap-design)');
const capColors = document.querySelectorAll('.cap-color');
const capDesigns = document.querySelectorAll('.cap-design');

const colorName = document.getElementById('colorName');
const productDescription = document.getElementById('productDescription');
const productImage = document.getElementById('productImage');
const productPrice = document.getElementById('productPrice');

const capColorName = document.getElementById('capColorName');
const capImage = document.getElementById('capImage');
const capPrice = document.getElementById('capPrice');

const cartButton = document.getElementById('cartButton');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const scrim = document.getElementById('scrim');

const addButton = document.getElementById('addButton');
const addCapButton = document.getElementById('addCapButton');

const cartCount = document.getElementById('cartCount');
const cartEmpty = document.getElementById('cartEmpty');
const cartTitle = document.getElementById('cartTitle');
const cartDetail = document.getElementById('cartDetail');
const checkoutButton = document.getElementById('checkoutButton');

let selectedColor = 'Black';
let selectedSize = 'S';
let selectedPrice = 20000;
let selectedProductImage = 'tolv small.png';

let selectedCapColor = 'Black';
let selectedCapDesign = 'Printed';
let selectedCapPrice = 10000;

let cartItems = [];

function formatNaira(amount) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

function toggleCart(open) {
  if (!cartDrawer) return;

  cartDrawer.classList.toggle('open', open);

  if (scrim) {
    scrim.classList.toggle('show', open);
  }

  cartDrawer.setAttribute('aria-hidden', String(!open));
}

function updateCart() {
  if (!cartCount || !cartTitle || !cartDetail) return;

  cartCount.textContent = cartItems.length;

  if (cartItems.length === 0) {
    if (cartEmpty) cartEmpty.hidden = false;
    cartTitle.textContent = '';
    cartDetail.textContent = '';

    if (checkoutButton) {
      checkoutButton.disabled = true;
    }

    return;
  }

  if (cartEmpty) cartEmpty.hidden = true;

  const item = cartItems[cartItems.length - 1];

  cartTitle.textContent = item.name;
  cartDetail.textContent =
    `${item.color} / ${item.option} · ${formatNaira(item.price)}`;

  if (checkoutButton) {
    checkoutButton.disabled = false;
  }
}


/* =========================
   CLOTHING COLORS
========================= */

swatches.forEach((swatch) => {
  if (swatch.classList.contains('cap-color')) return;

  swatch.addEventListener('click', () => {
    swatches.forEach((item) => {
      if (!item.classList.contains('cap-color')) {
        item.classList.remove('active');
        item.setAttribute('aria-checked', 'false');
      }
    });

    swatch.classList.add('active');
    swatch.setAttribute('aria-checked', 'true');

    selectedColor = swatch.dataset.color || 'Black';

    colorName.textContent = selectedColor.toUpperCase();

    productDescription.textContent =
      `The original TOLV graphic tee in ${selectedColor}. Choose your size.`;
  });
});


/* =========================
   CLOTHING SIZES
========================= */

sizes.forEach((size) => {
  size.addEventListener('click', () => {
    sizes.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-checked', 'false');
    });

    size.classList.add('active');
    size.setAttribute('aria-checked', 'true');

    selectedSize = size.dataset.size;
    selectedPrice = Number(size.dataset.price);
    selectedProductImage = size.dataset.image;

    productPrice.textContent = formatNaira(selectedPrice);
    productImage.src = selectedProductImage;
  });
});


/* =========================
   ADD CLOTHING TO BAG
========================= */

if (addButton) {
  addButton.addEventListener('click', () => {
    cartItems.push({
      name: 'TOLV ESSENTIAL GRAPHIC TEE',
      color: selectedColor.toUpperCase(),
      option: selectedSize,
      price: selectedPrice,
      image: selectedProductImage
    });

    updateCart();
    toggleCart(true);
  });
}


/* =========================
   CAP COLORS
========================= */

capColors.forEach((swatch) => {
  swatch.addEventListener('click', () => {
    capColors.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-checked', 'false');
    });

    swatch.classList.add('active');
    swatch.setAttribute('aria-checked', 'true');

    selectedCapColor = swatch.dataset.color || 'Black';

    if (capColorName) {
      capColorName.textContent = selectedCapColor.toUpperCase();
    }
  });
});


/* =========================
   CAP DESIGN
========================= */

capDesigns.forEach((design) => {
  design.addEventListener('click', () => {
    capDesigns.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-checked', 'false');
    });

    design.classList.add('active');
    design.setAttribute('aria-checked', 'true');

    selectedCapDesign = design.dataset.design;
    selectedCapPrice = Number(design.dataset.price);

    if (capPrice) {
      capPrice.textContent = formatNaira(selectedCapPrice);
    }
  });
});


/* =========================
   ADD CAP TO BAG
========================= */

if (addCapButton) {
  addCapButton.addEventListener('click', () => {
    cartItems.push({
      name: 'TOLV CAP',
      color: selectedCapColor.toUpperCase(),
      option: selectedCapDesign.toUpperCase(),
      price: selectedCapPrice,
      image: 'tolv cap.png'
    });

    updateCart();
    toggleCart(true);
  });
}


/* =========================
   CART BUTTONS
========================= */

if (cartButton) {
  cartButton.addEventListener('click', () => {
    toggleCart(true);
  });
}

if (closeCart) {
  closeCart.addEventListener('click', () => {
    toggleCart(false);
  });
}

if (scrim) {
  scrim.addEventListener('click', () => {
    toggleCart(false);
  });
}


/* =========================
   CHECKOUT
========================= */

if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    if (cartItems.length === 0) return;
    window.location.href = 'https://paystack.shop/pay/4xhfnd2266';
  });
}


/* =========================
   INITIAL STATE
========================= */

if (productPrice) {
  productPrice.textContent = formatNaira(selectedPrice);
}

if (capPrice) {
  capPrice.textContent = formatNaira(selectedCapPrice);
}

if (productImage) {
  productImage.src = selectedProductImage;
}

updateCart();
