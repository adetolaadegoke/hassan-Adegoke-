document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // PRODUCT ELEMENTS
  // ==============================

  const productImage = document.getElementById("productImage");
  const productPrice = document.getElementById("productPrice");
  const productDescription =
    document.getElementById("productDescription");
  const colorName = document.getElementById("colorName");

  const capPrice = document.getElementById("capPrice");
  const capColorName = document.getElementById("capColorName");

  const addButton = document.getElementById("addButton");
  const addCapButton = document.getElementById("addCapButton");

  // ==============================
  // BAG ELEMENTS
  // ==============================

  const bagCount = document.querySelector(".bag-count");
  const bagItems = document.querySelector(".bag-items");
  const bagTotal = document.querySelector(".bag-total");
  const checkoutButton =
    document.querySelector(".checkout-button");

  // ==============================
  // SHIRT DATA
  // ==============================

  const shirtData = {
    S: {
      name: "Small",
      price: 20000,
      image: "tolv small.png",
      description:
        "The original TOLV graphic tee in Small."
    },

    M: {
      name: "Medium",
      price: 22000,
      image: "tolv medium.png",
      description:
        "The original TOLV graphic tee in Medium."
    },

    L: {
      name: "Large",
      price: 23000,
      image: "tolv big.png",
      description:
        "The original TOLV graphic tee in Large."
    }
  };

  // ==============================
  // CAP DATA
  // ==============================

  const capData = {
    Printed: 10000,
    Monogrammed: 11000
  };

  // ==============================
  // CURRENT SELECTION
  // ==============================

  let selectedSize = "S";
  let selectedColor = "BLACK";

  let selectedCapDesign = "Printed";
  let selectedCapColor = "BLACK";

  // ==============================
  // BAG
  // ==============================

  let cartItems = [];

  // ==============================
  // MONEY FORMAT
  // ==============================

  function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }

  // ==============================
  // UPDATE SHIRT
  // ==============================

  function updateShirt() {

    const product = shirtData[selectedSize];

    if (productImage) {
      productImage.src = product.image;
    }

    if (productPrice) {
      productPrice.textContent =
        formatNaira(product.price);
    }

    if (productDescription) {
      productDescription.textContent =
        product.description;
    }

    if (colorName) {
      colorName.textContent = selectedColor;
    }
  }

  // ==============================
  // SIZE BUTTONS
  // ==============================

  const sizeButtons =
    document.querySelectorAll(
      ".sizes .size:not(.cap-design)"
    );

  sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      sizeButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      selectedSize =
        button.getAttribute("data-size");

      updateShirt();
    });

  });

  // ==============================
  // SHIRT COLORS
  // ==============================

  const colorButtons =
    document.querySelectorAll(
      ".swatch:not(.cap-color)"
    );

  colorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      colorButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      selectedColor =
        button.getAttribute("data-color")
          .toUpperCase();

      updateShirt();
    });

  });

  // ==============================
  // CAP DESIGN
  // ==============================

  const capDesignButtons =
    document.querySelectorAll(".cap-design");

  capDesignButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      capDesignButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      selectedCapDesign =
        button.getAttribute("data-design");

      if (capPrice) {
        capPrice.textContent =
          formatNaira(
            capData[selectedCapDesign]
          );
      }
    });

  });

  // ==============================
  // CAP COLORS
  // ==============================

  const capColorButtons =
    document.querySelectorAll(".cap-color");

  capColorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      capColorButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      selectedCapColor =
        button.getAttribute("data-color")
          .toUpperCase();

      if (capColorName) {
        capColorName.textContent =
          selectedCapColor;
      }
    });

  });

  // ==============================
  // ADD SHIRT TO BAG
  // ==============================

  if (addButton) {

    addButton.addEventListener("click", function () {

      const product = shirtData[selectedSize];

      cartItems.push({
        type: "shirt",
        name: "TOLV GRAPHIC TEE",
        size: selectedSize,
        color: selectedColor,
        price: product.price
      });

      updateBag();

      addButton.innerHTML =
        "ADDED ✓";

      setTimeout(function () {
        addButton.innerHTML =
          'ADD TO BAG <span>+</span>';
      }, 1200);

    });

  }

  // ==============================
  // ADD CAP TO BAG
  // ==============================

  if (addCapButton) {

    addCapButton.addEventListener("click", function () {

      cartItems.push({
        type: "cap",
        name: "TOLV CAP",
        design: selectedCapDesign,
        color: selectedCapColor,
        price: capData[selectedCapDesign]
      });

      updateBag();

      addCapButton.innerHTML =
        "ADDED ✓";

      setTimeout(function () {
        addCapButton.innerHTML =
          'ADD CAP TO BAG <span>+</span>';
      }, 1200);

    });

  }

  // ==============================
  // GET TOTAL
  // ==============================

  function getCartTotal() {

    return cartItems.reduce(
      function (total, item) {
        return total + item.price;
      },
      0
    );
  }

  // ==============================
  // UPDATE BAG
  // ==============================

  function updateBag() {

    if (bagCount) {
      bagCount.textContent =
        cartItems.length;
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

      itemElement.className =
        "bag-item";

      let details = "";

      if (item.type === "shirt") {
        details =
          item.color +
          " / " +
          item.size;
      } else {
        details =
          item.color +
          " / " +
          item.design;
      }

      itemElement.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <p>${details}</p>
        </div>

        <div>
          <strong>
            ${formatNaira(item.price)}
          </strong>

          <button
            type="button"
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

    // Remove buttons

    const removeButtons =
      document.querySelectorAll(
        ".remove-item"
      );

    removeButtons.forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const index =
            Number(
              button.getAttribute(
                "data-index"
              )
            );

          cartItems.splice(index, 1);

          updateBag();
        }
      );

    });
  }

  // ==============================
  // CHECKOUT
  // ==============================

  if (checkoutButton) {

    checkoutButton.addEventListener(
      "click",
      async function (event) {

        event.preventDefault();

        if (cartItems.length === 0) {
          alert("Your bag is empty.");
          return;
        }

        const email =
          prompt(
            "Enter your email address for payment:"
          );

        if (!email) {
          return;
        }

        checkoutButton.textContent =
          "PROCESSING...";

        try {

          const response =
            await fetch(
              "/api/pay",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                  email: email,
                  items: cartItems
                })
              }
            );

          const data =
            await response.json();

          if (
            !response.ok ||
            !data.authorization_url
          ) {
            throw new Error(
              data.error ||
              "Payment could not be started."
            );
          }

          window.location.href =
            data.authorization_url;

        } catch (error) {

          console.error(error);

          alert(
            "Payment could not be started. Please try again."
          );

          checkoutButton.textContent =
            "CHECKOUT ↗";
        }

      }
    );

  }

  // ==============================
  // START WEBSITE
  // ==============================

  updateShirt();
  updateBag();

});
