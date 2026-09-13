/* =========================================
   TOLV STORE
   PRODUCT + BAG + PAYSTACK CHECKOUT
========================================= */


/* =========================================
   PAYSTACK PAYMENT LINK
========================================= */

const PAYSTACK_PAYMENT_LINK =
  "https://paystack.shop/pay/4xhfnd2266";


/* =========================================
   ELEMENTS
========================================= */

const productImage =
  document.getElementById("productImage");

const productPrice =
  document.getElementById("productPrice");

const productDescription =
  document.getElementById("productDescription");

const colorName =
  document.getElementById("colorName");

const capImage =
  document.getElementById("capImage");

const capPrice =
  document.getElementById("capPrice");

const capColorName =
  document.getElementById("capColorName");

const swatches =
  document.querySelectorAll(
    ".swatch:not(.cap-color)"
  );

const capColors =
  document.querySelectorAll(".cap-color");

const sizes =
  document.querySelectorAll(
    ".size:not(.cap-design)"
  );

const capDesigns =
  document.querySelectorAll(".cap-design");

const addButton =
  document.getElementById("addButton");

const addCapButton =
  document.getElementById("addCapButton");

const cartButton =
  document.getElementById("cartButton");

const closeCart =
  document.getElementById("closeCart");

const cartDrawer =
  document.getElementById("cartDrawer");

const scrim =
  document.getElementById("scrim");

const cartCount =
  document.getElementById("cartCount");

const cartEmpty =
  document.getElementById("cartEmpty");

const cartTitle =
  document.getElementById("cartTitle");

const cartDetail =
  document.getElementById("cartDetail");

const checkoutButton =
  document.getElementById("checkoutButton");


/* =========================================
   PRODUCT STATE
========================================= */

let selectedColor = "black";

let selectedSize = "S";

let selectedPrice = 20000;

let selectedProductImage =
  "tolv small.png";


/* =========================================
   CAP STATE
========================================= */

let selectedCapColor = "black";

let selectedCapDesign = "Printed";

let selectedCapPrice = 10000;


/* =========================================
   BAG
========================================= */

let cartItems = [];


/* =========================================
   FORMAT NAIRA
========================================= */

function formatNaira(amount) {

  return `₦${Number(amount).toLocaleString("en-NG")}`;

}


/* =========================================
   CALCULATE TOTAL
========================================= */

function getCartTotal() {

  return cartItems.reduce(
    (total, item) =>
      total + Number(item.price),
    0
  );

}


/* =========================================
   OPEN / CLOSE BAG
========================================= */

function toggleCart(open) {

  if (!cartDrawer) return;

  cartDrawer.classList.toggle(
    "open",
    open
  );

  if (scrim) {

    scrim.classList.toggle(
      "show",
      open
    );

  }

  cartDrawer.setAttribute(
    "aria-hidden",
    String(!open)
  );

}


/* =========================================
   UPDATE BAG
========================================= */

function updateCart() {

  const total =
    getCartTotal();

  if (cartCount) {

    cartCount.textContent =
      cartItems.length;

  }


  if (!cartTitle || !cartDetail) {
    return;
  }


  if (cartItems.length === 0) {

    cartTitle.textContent = "";

    cartDetail.textContent = "";

    if (cartEmpty) {

      cartEmpty.hidden = false;

    }

    if (checkoutButton) {

      checkoutButton.disabled = true;

      checkoutButton.textContent =
        "CHECKOUT ↗";

    }

    return;
  }


  if (cartEmpty) {

    cartEmpty.hidden = true;

  }


  const lastItem =
    cartItems[cartItems.length - 1];


  cartTitle.textContent =
    lastItem.name;


  cartDetail.textContent =
    `${lastItem.color} / ${lastItem.option} · ${formatNaira(lastItem.price)}`;


  if (checkoutButton) {

    checkoutButton.disabled = false;

    checkoutButton.textContent =
      `CHECKOUT · ${formatNaira(total)} ↗`;

  }

}


/* =========================================
   SHIRT COLOR
========================================= */

swatches.forEach((swatch) => {

  swatch.addEventListener(
    "click",
    () => {

      swatches.forEach((item) => {

        item.classList.remove(
          "active"
        );

        item.setAttribute(
          "aria-checked",
          "false"
        );

      });


      swatch.classList.add(
        "active"
      );

      swatch.setAttribute(
        "aria-checked",
        "true"
      );


      selectedColor =
        swatch.dataset.color ||
        "black";


      if (colorName) {

        colorName.textContent =
          selectedColor.toUpperCase();

      }


      if (productDescription) {

        productDescription.textContent =
          `The original TOLV graphic tee in ${selectedColor}. Choose your size.`;

      }

    }
  );

});


/* =========================================
   SHIRT SIZE
========================================= */

sizes.forEach((size) => {

  size.addEventListener(
    "click",
    () => {

      sizes.forEach((item) => {

        item.classList.remove(
          "active"
        );

        item.setAttribute(
          "aria-checked",
          "false"
        );

      });


      size.classList.add(
        "active"
      );

      size.setAttribute(
        "aria-checked",
        "true"
      );


      selectedSize =
        size.dataset.size ||
        "S";


      selectedPrice =
        Number(
          size.dataset.price
        ) || 20000;


      selectedProductImage =
        size.dataset.image ||
        "tolv small.png";


      if (productPrice) {

        productPrice.textContent =
          formatNaira(
            selectedPrice
          );

      }


      if (productImage) {

        productImage.src =
          selectedProductImage;

      }

    }
  );

});


/* =========================================
   ADD SHIRT
========================================= */

if (addButton) {

  addButton.addEventListener(
    "click",
    () => {

      cartItems.push({

        name:
          "TOLV ESSENTIAL GRAPHIC TEE",

        color:
          selectedColor.toUpperCase(),

        option:
          selectedSize,

        price:
          selectedPrice,

        image:
          selectedProductImage

      });


      updateCart();

      toggleCart(true);

    }
  );

}


/* =========================================
   CAP COLOR
========================================= */

capColors.forEach((swatch) => {

  swatch.addEventListener(
    "click",
    () => {

      capColors.forEach((item) => {

        item.classList.remove(
          "active"
        );

        item.setAttribute(
          "aria-checked",
          "false"
        );

      });


      swatch.classList.add(
        "active"
      );

      swatch.setAttribute(
        "aria-checked",
        "true"
      );


      selectedCapColor =
        swatch.dataset.color ||
        "black";


      if (capColorName) {

        capColorName.textContent =
          selectedCapColor.toUpperCase();

      }

    }
  );

});


/* =========================================
   CAP DESIGN
========================================= */

capDesigns.forEach((design) => {

  design.addEventListener(
    "click",
    () => {

      capDesigns.forEach((item) => {

        item.classList.remove(
          "active"
        );

        item.setAttribute(
          "aria-checked",
          "false"
        );

      });


      design.classList.add(
        "active"
      );

      design.setAttribute(
        "aria-checked",
        "true"
      );


      selectedCapDesign =
        design.dataset.design ||
        "Printed";


      selectedCapPrice =
        Number(
          design.dataset.price
        ) || 10000;


      if (capPrice) {

        capPrice.textContent =
          formatNaira(
            selectedCapPrice
          );

      }

    }
  );

});


/* =========================================
   ADD CAP
========================================= */

if (addCapButton) {

  addCapButton.addEventListener(
    "click",
    () => {

      cartItems.push({

        name:
          "TOLV CAP",

        color:
          selectedCapColor.toUpperCase(),

        option:
          selectedCapDesign.toUpperCase(),

        price:
          selectedCapPrice,

        image:
          "tolv cap.png"

      });


      updateCart();

      toggleCart(true);

    }
  );

}


/* =========================================
   CART BUTTON
========================================= */

if (cartButton) {

  cartButton.addEventListener(
    "click",
    () => {

      toggleCart(true);

    }
  );

}


/* =========================================
   CLOSE BAG
========================================= */

if (closeCart) {

  closeCart.addEventListener(
    "click",
    () => {

      toggleCart(false);

    }
  );

}


/* =========================================
   CLOSE WITH SCRIM
========================================= */

if (scrim) {

  scrim.addEventListener(
    "click",
    () => {

      toggleCart(false);

    }
  );

}


/* =========================================
   PAYSTACK CHECKOUT
========================================= */

if (checkoutButton) {

  checkoutButton.addEventListener(
    "click",
    () => {

      if (cartItems.length === 0) {

        return;

      }


      const total =
        getCartTotal();


      /*
        The website calculates
        the customer's order total.
      */

      console.log(
        "TOLV ORDER TOTAL:",
        formatNaira(total)
      );


      /*
        Open your existing
        working Paystack payment link.
      */

      window.location.href =
        PAYSTACK_PAYMENT_LINK;

    }
  );

}


/* =========================================
   INITIAL STATE
========================================= */

if (productPrice) {

  productPrice.textContent =
    formatNaira(
      selectedPrice
    );

}


if (capPrice) {

  capPrice.textContent =
    formatNaira(
      selectedCapPrice
    );

}


if (productImage) {

  productImage.src =
    selectedProductImage;

}


updateCart();
