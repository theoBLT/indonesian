const https = require("https")
// Hack to avoid issues with Stripe's node library conflicting with AWS lambda https://github.com/stripe/stripe-node/issues/1040
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({ keepAlive: false }),
})

exports.handler = async event => {
  const { customer, priceId, paymentMethodId } = JSON.parse(event.body)

  try {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer,
    })
  } catch (error) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }

  await stripe.customers.update(customer, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  })

  const subscription = await stripe.subscriptions.create({
    customer: customer,
    items: [{ price: priceId }],
    expand: ["latest_invoice.payment_intent"],
  })

  const session = await stripe.billingPortal.sessions.create({
    customer: customer,
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      paymentMethodId: paymentMethodId,
      priceId: priceId,
      subscription: subscription,
      session: session.url,
    }),
  }
}
