// ===============================
// TOLV STORE - PRODUCT + BAG SCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------
  // PRODUCT ELEMENTS
  // -------------------------------

  const productImage = document.getElementById("productImage");
  const productPrice = document.getElementById("productPrice");
  const productDescription = document.getElementById("productDescription");
  const colorName = document.getElementById("colorName");

  const capImage = document.getElementById("capImage");
  const capPrice = document.getElementById("capPrice");
  const capColorName = document.getElementById("capColorName");

  const addButton = document.getElementById("addButton");
  const addCapButton = document.getElementById("addCapButton");

  // -------------------------------
  // BAG ELEMENTS
  // -------------------------------

  const bagCount = document.querySelector(".bag-count");
  const bagItems = document.querySelector(".bag-items");
  const bagTotal = document.querySelector(".bag-total");
  const checkoutButton = document.querySelector(".checkout-button");

  // -------------------------------
  // PAYSTACK PAYMENT LINK
  // -------------------------------

  const PAYSTACK_PAYMENT_LINK =
    "https://paystack.shop/pay/4xhfrd2266";

  // -------------------------------
  // PRODUCT DATA
  // -------------------------------

  const shirtPrices = {
    S: 20000,
    M: 22000,
    L: 23000
  };

  const shirtImages = {
    S: "tolv small.png",
    M: "tolv medium.png",
    L: "tolv big.png"
  };

  const shirtDescriptions = {
    S: "The original TOLV graphic tee in Small.",
    M: "The original TOLV graphic tee in Medium.",
    L: "The original TOLV graphic tee in Large."
  };

  const capPrices = {
    Printed: 10000,
    Monogrammed: 11000
  };

  // -------------------------------
  // CURRENT SELECTIONS
  // -------------------------------

  let selectedSize = "S";
  let selectedColor = "BLACK";

  let selectedCapDesign = "Printed";
  let selectedCapColor = "BLACK";

  // -------------------------------
  // BAG
  // -------------------------------

  let cartItems = [];

  // -------------------------------
  // FORMAT MONEY
  // -------------------------------

  function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }

  // -------------------------------
  // UPDATE SHIRT
  // -------------------------------

  function updateShirt() {

    if (productImage) {
      productImage.src = shirtImages[selectedSize];

      productImage.onerror = function () {
        console.log("Could not load:", shirtImages[selectedSize]);
      };
    }

    if (productPrice) {
      productPrice.textContent = formatNaira(
        shirtPrices[selectedSize]
      );
    }

    if (productDescription) {
      productDescription.textContent =
        shirtDescriptions[selectedSize];
    }

    if (colorName) {
      colorName.textContent = selectedColor;
    }
  }

  // -------------------------------
  // SIZE BUTTONS
  // -------------------------------

  const sizeButtons = document.querySelectorAll(
    ".sizes .size:not(.cap-design)"
  );

  sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      sizeButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedSize = button.dataset.size;

      updateShirt();
    });

  });

  // -------------------------------
  // SHIRT COLOR BUTTONS
  // -------------------------------

  const colorButtons = document.querySelectorAll(
    ".swatch:not(.cap-color)"
  );

  colorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      colorButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedColor =
        button.dataset.color.toUpperCase();

      updateShirt();
    });

  });

  // -------------------------------
  // CAP DESIGN
  // -------------------------------

  const capDesignButtons =
    document.querySelectorAll(".cap-design");

  capDesignButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      capDesignButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedCapDesign =
        button.dataset.design;

      if (capPrice) {
        capPrice.textContent = formatNaira(
          capPrices[selectedCapDesign]
        );
      }

    });

  });

  // -------------------------------
  // CAP COLORS
  // -------------------------------

  const capColorButtons =
    document.querySelectorAll(".cap-color");

  capColorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      capColorButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedCapColor =
        button.dataset.color.toUpperCase();

      if (capColorName) {
        capColorName.textContent =
          selectedCapColor;
      }

    });

  });

  // -------------------------------
  // ADD SHIRT TO BAG
  // -------------------------------

  if (addButton) {

    addButton.addEventListener("click", function () {

      cartItems.push({
        name: "TOLV GRAPHIC TEE",
        size: selectedSize,
        color: selectedColor,
        price: shirtPrices[selectedSize]
      });

      updateBag();

      addButton.textContent = "ADDED ✓";

      setTimeout(function () {
        addButton.innerHTML = 'ADD TO BAG <span>+</span>';
      }, 1200);

    });

  }

  // -------------------------------
  // ADD CAP TO BAG
  // -------------------------------

  if (addCapButton) {

    addCapButton.addEventListener("click", function () {

      cartItems.push({
        name: "TOLV CAP",
        design: selectedCapDesign,
        color: selectedCapColor,
        price: capPrices[selectedCapDesign]
      });

      updateBag();

      addCapButton.textContent = "ADDED ✓";

      setTimeout(function () {
        addCapButton.innerHTML =
          'ADD CAP TO BAG <span>+</span>';
      }, 1200);

    });

  }

  // -------------------------------
  // CART TOTAL
  // -------------------------------

  function getCartTotal() {

    return cartItems.reduce(function (total, item) {
      return total + item.price;
    }, 0);

  }

  // -------------------------------
  // UPDATE BAG
  // -------------------------------

  function updateBag() {

    if (bagCount) {
      bagCount.textContent = cartItems.length;
    }

    if (!bagItems) {
      return;
    }

    bagItems.innerHTML = "";

    if (cartItems.length === 0) {

      bagItems.innerHTML =
        "<p>YOUR BAG IS WAITING.</p>";

      if (bagTotal) {
        bagTotal.textContent = "₦0";
      }

      return;
    }

    cartItems.forEach(function (item, index) {

      const itemElement =
        document.createElement("div");

      itemElement.className = "bag-item";

      let details = "";

      if (item.size) {
        details =
          item.color + " / " + item.size;
      } else {
        details =
          item.color + " / " + item.design;
      }

      itemElement.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <p>${details}</p>
        </div>

        <div>
          <strong>${formatNaira(item.price)}</strong>
          <button type="button"
            class="remove-item"
            data-index="${index}">
            ×
          </button>
        </div>
      `;

      bagItems.appendChild(itemElement);

    });

    if (bagTotal) {
      bagTotal.textContent =
        formatNaira(getCartTotal());
    }

    // REMOVE ITEMS

    const removeButtons =
      document.querySelectorAll(".remove-item");

    removeButtons.forEach(function (button) {

      button.addEventListener("click", function () {

        const index =
          Number(button.dataset.index);

        cartItems.splice(index, 1);

        updateBag();

      });

    });

  }

  // -------------------------------
  // CHECKOUT
  // -------------------------------

  if (checkoutButton) {

    checkoutButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        if (cartItems.length === 0) {
          alert("Your bag is empty.");
          return;
        }

        const total = getCartTotal();

        checkoutButton.textContent =
          "CHECKOUT · " +
          formatNaira(total) +
          " ↗";

        // Open the working Paystack payment page
        window.location.href =
          PAYSTACK_PAYMENT_LINK;

      }
    );

  }

  // -------------------------------
  // INITIAL STATE
  // -------------------------------

  updateShirt();
  updateBag();

});
