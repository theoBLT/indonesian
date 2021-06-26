const https = require("https")
// Hack to avoid issues with Stripe's node library conflicting with AWS lambda https://github.com/stripe/stripe-node/issues/1040
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({ keepAlive: false }),
})

exports.handler = async event => {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Content-Type": "application/json",
    }
    const productList = ["prod_IwcDVX0cs9XF4T", "prod_Iwc7h1aDK1p9yA"]

    // Get types of products from event body
    // const { blik_code, payment_intent, shipping } = JSON.parse(event.body)

    const products = await stripe.products.list({
      ids: productList,
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: {
          code: err.code,
          message: err.message,
        },
      }),
    }
  }
}
