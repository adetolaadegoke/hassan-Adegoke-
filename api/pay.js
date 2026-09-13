export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { email, items } = req.body;

    if (!email || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Email and cart items are required."
      });
    }

    let total = 0;

    for (const item of items) {
      if (item.name === "TOLV GRAPHIC TEE") {
        if (item.size === "S") total += 20000;
        else if (item.size === "M") total += 22000;
        else if (item.size === "L") total += 23000;
        else {
          return res.status(400).json({
            error: "Invalid shirt size."
          });
        }
      }

      else if (item.name === "TOLV CAP") {
        if (item.design === "Printed") total += 10000;
        else if (item.design === "Monogrammed") total += 11000;
        else {
          return res.status(400).json({
            error: "Invalid cap design."
          });
        }
      }

      else {
        return res.status(400).json({
          error: "Invalid product."
        });
      }
    }

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          amount: String(total * 100),
          currency: "NGN",
          metadata: {
            store: "TOLV WEAR",
            items: items
          }
        })
      }
    );

    const result = await paystackResponse.json();

    if (!paystackResponse.ok || !result.status) {
      return res.status(400).json({
        error: result.message || "Paystack payment initialization failed."
      });
    }

    return res.status(200).json({
      authorization_url: result.data.authorization_url
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Payment server error."
    });
  }
}
