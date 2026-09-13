/* =========================================
   TOLV STORE
   PRODUCT + BAG + CHECKOUT
========================================= */

const PAYSTACK_PAYMENT_LINK =
  "https://paystack.shop/pay/4xhfrd2266";


/* PRODUCTS */

const productImage =
  document.getElementById("productImage");

const productPrice =
  document.getElementById("productPrice");

const productDescription =
  document.getElementById("productDescription");

const colorName =
  document.getElementById("colorName");


/* CAP */

const capImage =
  document.getElementById("capImage");

const capPrice =
  document.getElementById("capPrice");

const capColorName =
  document.getElementById("capColorName");


/* OPTIONS */

const swatches =
  document.querySelectorAll(".swatch:not(.cap-color)");

const capColors =
  document.querySelectorAll(".cap-color");

const sizes =
  document.querySelectorAll(".size:not(.cap-design)");

const capDesigns =
  document.querySelectorAll(".cap-design");


/* BUTTONS */

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
   SELECTED SHIRT
========================================= */

let selectedColor = "black";

let selectedSize = "S";

let selectedPrice = 20000;

let selectedProductImage =
  "tolv small.png";


/* =========================================
   SELECTED CAP
========================================= */

let selectedCapColor = "black";

let selectedCapDesign = "Printed";

let selectedCapPrice = 10000;


/* =========================================
   BAG
========================================= */

let cartItems = [];


/* =========================================
   FORMAT PRICE
========================================= */

function formatNaira(amount) {

  return "₦" +
    Number(amount).toLocaleString("en-NG");

}


/* =========================================
   TOTAL
========================================= */

function getCartTotal() {

  return cartItems.reduce(
    function(total, item) {
      return total + Number(item.price);
    },
    0
  );

}


/* =========================================
   BAG OPEN / CLOSE
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


  const item =
    cartItems[cartItems.length - 1];


  cartTitle.textContent =
    item.name;


  cartDetail.textContent =
    item.color +
    " / " +
    item.option +
    " · " +
    formatNaira(item.price);


  if (checkoutButton) {

    checkoutButton.disabled = false;

    checkoutButton.textContent =
      "CHECKOUT · " +
      formatNaira(total) +
      " ↗";

  }

}


/* =========================================
   SHIRT COLORS
========================================= */

swatches.forEach(
  function(swatch) {

    swatch.addEventListener(
      "click",
      function() {

        swatches.forEach(
          function(item) {

            item.classList.remove(
              "active"
            );

            item.setAttribute(
              "aria-checked",
              "false"
            );

          }
        );


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
            "The original TOLV graphic tee in " +
            selectedColor +
            ". Choose your size.";

        }

      }
    );

  }
);


/* =========================================
   SHIRT SIZES
========================================= */

sizes.forEach(
  function(size) {

    size.addEventListener(
      "click",
      function() {

        sizes.forEach(
          function(item) {

            item.classList.remove(
              "active"
            );

            item.setAttribute(
              "aria-checked",
              "false"
            );

          }
        );


        size.classList.add(
          "active"
        );

        size.setAttribute(
          "aria-checked",
          "true"
        );


        /*
          S = SMALL
          M = MEDIUM
          L = LARGE
        */

        selectedSize =
          size.dataset.size;


        selectedPrice =
          Number(
            size.dataset.price
          );


        selectedProductImage =
          size.dataset.image;


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

  }
);


/* =========================================
   ADD SHIRT
========================================= */

if (addButton) {

  addButton.addEventListener(
    "click",
    function() {

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
   CAP COLORS
========================================= */

capColors.forEach(
  function(swatch) {

    swatch.addEventListener(
      "click",
      function() {

        capColors.forEach(
          function(item) {

            item.classList.remove(
              "active"
            );

            item.setAttribute(
              "aria-checked",
              "false"
            );

          }
        );


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

  }
);


/* =========================================
   CAP DESIGN
========================================= */

capDesigns.forEach(
  function(design) {

    design.addEventListener(
      "click",
      function() {

        cap
