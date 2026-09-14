export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const {
      customerName,
      email,
      phone,
      deliveryAddress,
      items
    } = req.body || {};

    if (
      !customerName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !deliveryAddress?.trim() ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        error: "Please provide your name, email, phone, address, and cart items."
      });
    }

    const sheetUrl = process.env.GOOGLE_SHEETS_URL;
    const orderSecret = process.env.TOLV_ORDER_SECRET;
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    if (!sheetUrl || !orderSecret || !paystackSecret) {
      return res.status(500).json({
        error: "Server configuration is incomplete."
      });
    }

    let total = 0;

    const verifiedItems = items.map((item) => {
      const quantity = Number(item.quantity ?? 1);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        throw new Error("Invalid item quantity.");
      }

      let price;
      let size = "";
      let design = "";

      if (item.name === "TOLV GRAPHIC TEE") {
        if (item.size === "S") price = 20000;
        else if (item.size === "M") price = 22000;
        else if (item.size === "L") price = 23000;
        else throw new Error("Invalid shirt size.");

        size = item.size;
      } else if (item.name === "TOLV CAP") {
        if (item.design === "Printed") price = 10000;
        else if (item.design === "Monogrammed") price = 11000;
        else throw new Error("Invalid cap design.");

        design = item.design;
      } else {
        throw new Error("Invalid product.");
      }

      total += price * quantity;

      return {
        name: item.name,
        color: String(item.color || "").slice(0, 40),
        size,
        design,
        quantity,
        price
      };
    });

    const orderId = "TOLV-" + Date.now();

    // Record the order as Pending before sending the customer to Paystack.
    const sheetResponse = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: orderSecret,
        orderId,
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        items: verifiedItems
      })
    });

    const sheetResult = await sheetResponse.json();

    if (!sheetResponse.ok || !sheetResult.success) {
      console.error("Google Sheets order save failed:", sheetResult);
      return res.status(502).json({
        error: "We couldn't save your order. Please try again."
      });
    }

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          amount: String(total * 100),
          currency: "NGN",
          reference: orderId,
          metadata: {
            store: "TOLV WEAR",
            orderId,
            items: verifiedItems
          }
        })
      }
    );

    const paystackResult = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackResult.status) {
      console.error("Paystack initialization failed:", paystackResult);
      return res.status(502).json({
        error: "Your order was recorded, but payment could not be started. Please contact TOLV before trying again."
      });
    }

    return res.status(200).json({
      authorization_url: paystackResult.data.authorization_url,
      orderId
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error.message || "Unable to process checkout."
    });
  }
}
