document.addEventListener("DOMContentLoaded", function () {
  // Product elements
  const productImage = document.getElementById("productImage");
  const productPrice = document.getElementById("productPrice");
  const productDescription = document.getElementById("productDescription");
  const colorName = document.getElementById("colorName");

  const capImage = document.getElementById("capImage");
  const capPrice = document.getElementById("capPrice");
  const capColorName = document.getElementById("capColorName");

  const addButton = document.getElementById("addButton");
  const addCapButton = document.getElementById("addCapButton");

  // Bag elements — these IDs match your HTML
  const cartButton = document.getElementById("cartButton");
  const cartCount = document.getElementById("cartCount");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCart = document.getElementById("closeCart");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartItem = document.getElementById("cartItem");
  const cartDetail = document.getElementById("cartDetail");
  const checkoutButton = document.getElementById("checkoutButton");
  const scrim = document.getElementById("scrim");

  // Shirt prices and images
  const shirtData = {
    S: { price: 20000, image: "tolv small.png", description: "The original TOLV graphic tee in Small." },
    M: { price: 22000, image: "tolv medium.png", description: "The original TOLV graphic tee in Medium." },
    L: { price: 23000, image: "tolv big.png", description: "The original TOLV graphic tee in Large." }
  };

  const capData = {
    Printed: 10000,
    Monogrammed: 11000
  };

  let selectedSize = "S";
  let selectedColor = "BLACK";
  let selectedCapDesign = "Printed";
  let selectedCapColor = "BLACK";
  let cartItems = [];

  function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }

  function updateShirt() {
    const product = shirtData[selectedSize];

    if (productImage) productImage.src = product.image;
    if (productPrice) productPrice.textContent = formatNaira(product.price);
    if (productDescription) productDescription.textContent = product.description;
    if (colorName) colorName.textContent = selectedColor;
  }

  function updateCap() {
    if (capPrice) capPrice.textContent = formatNaira(capData[selectedCapDesign]);
    if (capColorName) capColorName.textContent = selectedCapColor;

    if (capImage) {
      const capImages = {
        BLACK: "tolv cap.png",
        CREAM: "tolv cap cream.png",
        "NAVY BLUE": "tolv cap blue.png"
      };
      capImage.src = capImages[selectedCapColor] || "tolv cap.png";
    }
  }

  function setActive(buttons, selectedButton) {
    buttons.forEach(function (button) {
      button.classList.toggle("active", button === selectedButton);
    });
  }

  // Shirt sizes
  const sizeButtons = document.querySelectorAll(".sizes .size:not(.cap-design)");
  sizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedSize = button.dataset.size;
      setActive(sizeButtons, button);
      updateShirt();
    });
  });

  // Shirt colors
  const shirtColorButtons = document.querySelectorAll(".swatch:not(.cap-color)");
  shirtColorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedColor = (button.dataset.color || "black").toUpperCase();
      setActive(shirtColorButtons, button);
      updateShirt();
    });
  });

  // Cap designs
  const capDesignButtons = document.querySelectorAll(".cap-design");
  capDesignButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCapDesign = button.dataset.design;
      setActive(capDesignButtons, button);
      updateCap();
    });
  });

  // Cap colors
  const capColorButtons = document.querySelectorAll(".cap-color");
  capColorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCapColor = (button.dataset.color || "black").toUpperCase();
      setActive(capColorButtons, button);
      updateCap();
    });
  });

  function openBag() {
    if (cartDrawer) {
      cartDrawer.classList.add("open");
      cartDrawer.setAttribute("aria-hidden", "false");
    }
    if (scrim) scrim.classList.add("active");
  }

  function closeBag() {
    if (cartDrawer) {
      cartDrawer.classList.remove("open");
      cartDrawer.setAttribute("aria-hidden", "true");
    }
    if (scrim) scrim.classList.remove("active");
  }

  if (cartButton) cartButton.addEventListener("click", openBag);
  if (closeCart) closeCart.addEventListener("click", closeBag);
  if (scrim) scrim.addEventListener("click", closeBag);

  function getCartTotal() {
    return cartItems.reduce(function (total, item) {
      return total + item.price;
    }, 0);
  }

  function updateBag() {
    if (cartCount) cartCount.textContent = cartItems.length;

    // Your current HTML has one placeholder cart row, not a cart list.
    if (cartEmpty) cartEmpty.hidden = cartItems.length > 0;
    if (cartItem) cartItem.hidden = cartItems.length === 0;

    if (cartDetail) {
      cartDetail.textContent = cartItems.map(function (item) {
        return item.name + " — " +
          (item.type === "shirt"
            ? item.color + " / " + item.size
            : item.color + " / " + item.design) +
          " (" + formatNaira(item.price) + ")";
      }).join(" | ");
    }

    if (cartItem) {
      const priceElement = cartItem.querySelector("strong");
      if (priceElement) priceElement.textContent = formatNaira(getCartTotal());
    }

    if (checkoutButton) checkoutButton.disabled = cartItems.length === 0;
  }

  // Add shirt
  if (addButton) {
    addButton.addEventListener("click", function () {
      cartItems.push({
        type: "shirt",
        name: "TOLV GRAPHIC TEE",
        size: selectedSize,
        color: selectedColor,
        price: shirtData[selectedSize].price
      });

      updateBag();
      openBag();

      addButton.textContent = "ADDED ✓";
      setTimeout(function () {
        addButton.innerHTML = 'ADD TO BAG <span>+</span>';
      }, 1200);
    });
  }

  // Add cap
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
      openBag();

      addCapButton.textContent = "ADDED ✓";
      setTimeout(function () {
        addCapButton.innerHTML = 'ADD CAP TO BAG <span>+</span>';
      }, 1200);
    });
  }

  // CHECKOUT — open Paystack directly
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      window.location.href = "https://paystack.shop/pay/4xhfrd2266";
    });
  }
