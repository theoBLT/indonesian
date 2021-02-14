const https = require("https")
// Hack to avoid issues with Stripe's node library conflicting with AWS lambda https://github.com/stripe/stripe-node/issues/1040
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({ keepAlive: false }),
})

exports.handler = async event => {
  const { email } = JSON.parse(event.body)

  // Create a Stripe customer
  const customer = await stripe.customers.create({
    email: email,
  })

  console.log(`Created customer, returned ${customer.id}`)

  return {
    statusCode: 200,
    body: JSON.stringify({
      customer: customer.id,
    }),
  }
}
