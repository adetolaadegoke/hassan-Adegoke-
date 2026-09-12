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


/* =========================
   PAYSTACK
========================= */

const PAYSTACK_PUBLIC_KEY =
  'pk_live_853f5b1a53a2f7c704cdc89cdf7c572079a48014';

let paystackLoaded = false;
let paystackLoading = false;


/* Load Paystack automatically */

function loadPaystack() {
  return new Promise((resolve, reject) => {

    if (typeof Paystack !== 'undefined') {
      paystackLoaded = true;
      resolve();
      return;
    }

    if (paystackLoading) {
      const waitForPaystack = setInterval(() => {

        if (typeof Paystack !== 'undefined') {
          clearInterval(waitForPaystack);
          paystackLoaded = true;
          resolve();
        }

      }, 100);

      setTimeout(() => {
        clearInterval(waitForPaystack);

        if (typeof Paystack === 'undefined') {
          reject(new Error('Paystack failed to load.'));
        }
      }, 15000);

      return;
    }

    paystackLoading = true;

    const script = document.createElement('script');

    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;

    script.onload = () => {

      paystackLoaded = true;
      paystackLoading = false;

      resolve();
    };

    script.onerror = () => {

      paystackLoading = false;

      reject(new Error('Could not load Paystack.'));
    };

    document.head.appendChild(script);
  });
}


/* =========================
   PRODUCT VARIABLES
========================= */

let selectedColor = 'Black';
let selectedSize = 'S';
let selectedPrice = 20000;
let selectedProductImage = 'tolv small.png';

let selectedCapColor = 'Black';
let selectedCapDesign = 'Printed';
let selectedCapPrice = 10000;

let cartItems = [];


/* =========================
   FORMAT NAIRA
========================= */

function formatNaira(amount) {
  return `₦${amount.toLocaleString('en-NG')}`;
}


/* =========================
   CALCULATE CART TOTAL
========================= */

function getCartTotal() {

  return cartItems.reduce((total, item) => {

    return total + Number(item.price);

  }, 0);
}


/* =========================
   TOGGLE CART
========================= */

function toggleCart(open) {

  if (!cartDrawer) return;

  cartDrawer.classList.toggle('open', open);

  if (scrim) {
    scrim.classList.toggle('show', open);
  }

  cartDrawer.setAttribute('aria-hidden', String(!open));
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

  if (!cartCount || !cartTitle || !cartDetail) return;

  cartCount.textContent = cartItems.length;


  if (cartItems.length === 0) {

    if (cartEmpty) {
      cartEmpty.hidden = false;
    }

    cartTitle.textContent = '';
    cartDetail.textContent = '';

    if (checkoutButton) {
      checkoutButton.disabled = true;
    }

    return;
  }


  if (cartEmpty) {
    cartEmpty.hidden = true;
  }


  const item = cartItems[cartItems.length - 1];

  const total = getCartTotal();


  cartTitle.textContent = item.name;

  cartDetail.textContent =
    `${item.color} / ${item.option} · Total: ${formatNaira(total)}`;


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


    selectedColor =
      swatch.dataset.color || 'Black';


    if (colorName) {

      colorName.textContent =
        selectedColor.toUpperCase();
    }


    if (productDescription) {

      productDescription.textContent =
        `The original TOLV graphic tee in ${selectedColor}. Choose your size.`;
    }
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


    selectedSize =
      size.dataset.size;


    selectedPrice =
      Number(size.dataset.price);


    selectedProductImage =
      size.dataset.image;


    if (productPrice) {

      productPrice.textContent =
        formatNaira(selectedPrice);
    }


    if (productImage) {

      productImage.src =
        selectedProductImage;
    }
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


    selectedCapColor =
      swatch.dataset.color || 'Black';


    if (capColorName) {

      capColorName.textContent =
        selectedCapColor.toUpperCase();
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


    selectedCapDesign =
      design.dataset.design;


    selectedCapPrice =
      Number(design.dataset.price);


    if (capPrice) {

      capPrice.textContent =
        formatNaira(selectedCapPrice);
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
   CHECKOUT WITH PAYSTACK
========================= */

if (checkoutButton) {

  checkoutButton.addEventListener('click', async (event) => {

    event.preventDefault();


    /* Make sure cart isn't empty */

    if (cartItems.length === 0) {

      alert(
        'Your bag is empty. Please add an item first.'
      );

      return;
    }


    /* Calculate exact cart total */

    const totalAmount =
      getCartTotal();


    if (totalAmount <= 0) {

      alert(
        'Invalid cart amount.'
      );

      return;
    }


    /* Ask customer for email */

    const customerEmail =
      prompt(
        'Enter your email address for your payment receipt:'
      );


    if (!customerEmail) {

      alert(
        'Email is required to continue with payment.'
      );

      return;
    }


    /* Basic email check */

    if (
      !customerEmail.includes('@') ||
      !customerEmail.includes('.')
    ) {

      alert(
        'Please enter a valid email address.'
      );

      return;
    }


    try {

      /* Load Paystack */

      await loadPaystack();


      /* Convert Naira to kobo */

      const amountInKobo =
        Math.round(totalAmount * 100);


      /* Create Paystack checkout */

      const paystack =
        new Paystack();


      paystack.newTransaction({

        key: PAYSTACK_PUBLIC_KEY,

        email: customerEmail,

        amount: amountInKobo,

        currency: 'NGN',


        metadata: {

          custom_fields: [

            {
              display_name: 'Store',
              variable_name: 'store',
              value: 'TOLV WEAR'
            },

            {
              display_name: 'Cart Items',
              variable_name: 'cart_items',
              value: cartItems
                .map((item) =>
                  `${item.name} - ${item.color} - ${item.option} - ${formatNaira(item.price)}`
                )
                .join(' | ')
            }

          ]
        },


        onSuccess: (transaction) => {

          alert(
            `Payment successful!\n\nAmount: ${formatNaira(totalAmount)}\nReference: ${transaction.reference}`
          );

          console.log(
            'TOLV PAYMENT SUCCESS:',
            transaction
          );

          cartItems = [];

          updateCart();

          toggleCart(false);
        },


        onCancel: () => {

          alert(
            'Payment was cancelled.'
          );

          console.log(
            'TOLV PAYMENT CANCELLED'
          );
        },


        onError: (error) => {

          console.error(
            'Paystack error:',
            error
          );

          alert(
            'Payment could not be started. Please try again.'
          );
        }

      });

    } catch (error) {

      console.error(
        'Paystack loading error:',
        error
      );

      alert(
        'Unable to load Paystack. Please check your internet connection and try again.'
      );
    }

  });
}


/* =========================
   INITIAL STATE
========================= */

if (productPrice) {

  productPrice.textContent =
    formatNaira(selectedPrice);
}


if (capPrice) {

  capPrice.textContent =
    formatNaira(selectedCapPrice);
}


if (productImage) {

  productImage.src =
    selectedProductImage;
}


updateCart();
