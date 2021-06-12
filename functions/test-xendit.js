const https = require("https")
exports.handler = async ({ body, headers }) => {
  try {
    console.log(body)
    // Respond to acknowledge receipt of event to Stripe
    return {
      statusCode: 200,
      body: JSON.stringify({
        received: true,
      }),
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: err.message,
      }),
    }
  }
}
