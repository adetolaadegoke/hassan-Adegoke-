document.addEventListener("DOMContentLoaded", function () {
  const productImage = document.getElementById("productImage");
  const productPrice = document.getElementById("productPrice");
  const productDescription = document.getElementById("productDescription");
  const colorName = document.getElementById("colorName");
  const capPrice = document.getElementById("capPrice");
  const capColorName = document.getElementById("capColorName");

  const addButton = document.getElementById("addButton");
  const addCapButton = document.getElementById("addCapButton");

  const cartButton = document.getElementById("cartButton");
  const cartCount = document.getElementById("cartCount");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCart = document.getElementById("closeCart");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutButton = document.getElementById("checkoutButton");
  const checkoutError = document.getElementById("checkoutError");
  const scrim = document.getElementById("scrim");

  const fulfillmentType = document.getElementById("fulfillmentType");
  const addressGroup = document.getElementById("addressGroup");
  const deliveryAddress = document.getElementById("deliveryAddress");

  const paymentResult = document.getElementById("paymentResult");
  const paymentResultTitle = document.getElementById("paymentResultTitle");
  const paymentResultMessage = document.getElementById("paymentResultMessage");
  const orderQrCode = document.getElementById("orderQrCode");
  const orderQrToken = document.getElementById("orderQrToken");

  const shirtData = {
    S: {
      price: 20000,
      image: "tolv small.png",
      description: "The original TOLV graphic tee in Small."
    },
    M: {
      price: 22000,
      image: "tolv medium.png",
      description: "The original TOLV graphic tee in Medium."
    },
    L: {
      price: 23000,
      image: "tolv big.png",
      description: "The original TOLV graphic tee in Large."
    }
  };

  const capData = {
    Printed: 10000,
    Monogrammed: 11000
  };

  const MAX_QUANTITY = 200;

  let selectedSize = "S";
  let selectedColor = "black";
  let selectedCapDesign = "Printed";
  let selectedCapColor = "black";
  const cartItems = [];

  function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }

  function updateShirt() {
    const product = shirtData[selectedSize];
    productImage.src = product.image;
    productPrice.textContent = formatNaira(product.price);
    productDescription.textContent = product.description;
    colorName.textContent = selectedColor.toUpperCase();
  }

  function updateCap() {
    capPrice.textContent = formatNaira(capData[selectedCapDesign]);
    capColorName.textContent = selectedCapColor.toUpperCase();
  }

  function setActive(buttons, selectedButton) {
    buttons.forEach(function (button) {
      button.classList.toggle("active", button === selectedButton);
    });
  }

  function updateFulfillmentFields() {
    const isDelivery = fulfillmentType.value === "Delivery";

    addressGroup.hidden = !isDelivery;
    deliveryAddress.required = isDelivery;

    if (!isDelivery) {
      deliveryAddress.value = "";
    }
  }

  fulfillmentType.addEventListener("change", updateFulfillmentFields);
  updateFulfillmentFields();

  const sizeButtons = document.querySelectorAll(".sizes .size:not(.cap-design)");

  sizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedSize = button.dataset.size;
      setActive(sizeButtons, button);
      updateShirt();
    });
  });

  const shirtColorButtons = document.querySelectorAll(".swatch:not(.cap-color)");

  shirtColorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedColor = button.dataset.color || "black";
      setActive(shirtColorButtons, button);
      updateShirt();
    });
  });

  const capDesignButtons = document.querySelectorAll(".cap-design");

  capDesignButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCapDesign = button.dataset.design;
      setActive(capDesignButtons, button);
      updateCap();
    });
  });

  const capColorButtons = document.querySelectorAll(".cap-color");

  capColorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCapColor = button.dataset.color || "black";
      setActive(capColorButtons, button);
      updateCap();
    });
  });

  function openBag() {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    scrim.classList.add("show");
  }

  function closeBag() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    scrim.classList.remove("show");
  }

  cartButton.addEventListener("click", openBag);
  closeCart.addEventListener("click", closeBag);
  scrim.addEventListener("click", closeBag);

  function getCartTotal() {
    return cartItems.reduce(function (total, item) {
      return total + item.price * item.quantity;
    }, 0);
  }

  function renderBag() {
    cartCount.textContent = cartItems.reduce(function (count, item) {
      return count + item.quantity;
    }, 0);

    cartEmpty.hidden = cartItems.length > 0;
    cartItemsList.innerHTML = "";

    cartItems.forEach(function (item, index) {
      const row = document.createElement("div");
      row.className = "cart-item";

      const details = document.createElement("div");
      const name = document.createElement("b");
      name.textContent = item.name;

      const option = item.type === "shirt" ? item.size : item.design;

      const description = document.createElement("p");
      description.textContent =
        item.color.toUpperCase() + " / " + option;

      const quantityControls = document.createElement("div");
      quantityControls.className = "quantity-controls";

      const decreaseButton = document.createElement("button");
      decreaseButton.type = "button";
      decreaseButton.textContent = "−";
      decreaseButton.setAttribute("aria-label", "Decrease quantity");
      decreaseButton.disabled = item.quantity <= 1;

      decreaseButton.addEventListener("click", function () {
        if (item.quantity > 1) {
          item.quantity -= 1;
          renderBag();
        }
      });

      const quantityText = document.createElement("span");
      quantityText.textContent = String(item.quantity);

      const increaseButton = document.createElement("button");
      increaseButton.type = "button";
      increaseButton.textContent = "+";
      increaseButton.setAttribute("aria-label", "Increase quantity");
      increaseButton.disabled = item.quantity >= MAX_QUANTITY;

      increaseButton.addEventListener("click", function () {
        if (item.quantity < MAX_QUANTITY) {
          item.quantity += 1;
          renderBag();
        }
      });

      quantityControls.append(
        decreaseButton,
        quantityText,
        increaseButton
      );

      details.append(name, description, quantityControls);

      const price = document.createElement("strong");
      price.textContent = formatNaira(item.price * item.quantity);

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-item";
      removeButton.textContent = "Remove";

      removeButton.addEventListener("click", function () {
        cartItems.splice(index, 1);
        renderBag();
      });

      row.append(details, price, removeButton);
      cartItemsList.appendChild(row);
    });

    cartTotal.textContent = "Total: " + formatNaira(getCartTotal());
    checkoutButton.disabled = cartItems.length === 0;
  }

  function addItemToBag(item, button, originalButtonText) {
    cartItems.push(item);

    renderBag();
    openBag();

    button.textContent = "ADDED ✓";

    window.setTimeout(function () {
      button.innerHTML = originalButtonText;
    }, 1200);
  }

  addButton.addEventListener("click", function () {
    addItemToBag(
      {
        type: "shirt",
        name: "TOLV GRAPHIC TEE",
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        price: shirtData[selectedSize].price
      },
      addButton,
      'ADD TO BAG <span>+</span>'
    );
  });

  addCapButton.addEventListener("click", function () {
    addItemToBag(
      {
        type: "cap",
        name: "TOLV CAP",
        design: selectedCapDesign,
        color: selectedCapColor,
        quantity: 1,
        price: capData[selectedCapDesign]
      },
      addCapButton,
      'ADD CAP TO BAG <span>+</span>'
    );
  });

  checkoutForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    checkoutError.textContent = "";

    if (cartItems.length === 0) {
      checkoutError.textContent = "Your bag is empty.";
      return;
    }

    if (!fulfillmentType.value) {
      checkoutError.textContent = "Please choose Collection or Delivery.";
      fulfillmentType.focus();
      return;
    }

    if (
      fulfillmentType.value === "Delivery" &&
      !deliveryAddress.value.trim()
    ) {
      checkoutError.textContent = "Please enter your delivery address.";
      deliveryAddress.focus();
      return;
    }

    checkoutButton.disabled = true;
    checkoutButton.textContent = "PLEASE WAIT…";

    const order = {
      customerName: document.getElementById("customerName").value.trim(),
      email: document.getElementById("customerEmail").value.trim(),
      phone: document.getElementById("customerPhone").value.trim(),
      fulfillmentType: fulfillmentType.value,
      deliveryAddress:
        fulfillmentType.value === "Delivery"
          ? deliveryAddress.value.trim()
          : "",
      items: cartItems.map(function (item) {
        return { ...item };
      })
    };

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });

      const result = await response.json();

      if (!response.ok || !result.authorization_url) {
        throw new Error(result.error || "Checkout could not be started.");
      }

      window.location.href = result.authorization_url;
    } catch (error) {
      checkoutError.textContent =
        error.message || "Something went wrong. Please try again.";

      checkoutButton.disabled = false;
      checkoutButton.innerHTML = 'CHECKOUT <span>↗</span>';
    }
  });

  // These elements are reserved for the payment-verification step.
  // A QR code must only be shown after the server confirms payment.
  if (paymentResult) paymentResult.hidden = true;
  if (paymentResultTitle) paymentResultTitle.textContent = "";
  if (paymentResultMessage) paymentResultMessage.textContent = "";
  if (orderQrCode) orderQrCode.replaceChildren();
  if (orderQrToken) orderQrToken.textContent = "";

  updateShirt();
  updateCap();
  renderBag();
});
