const https = require("https")
// Hack to avoid issues with Stripe's node library conflicting with AWS lambda https://github.com/stripe/stripe-node/issues/1040
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({ keepAlive: false }),
})
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async ({ body, headers }) => {
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    switch (stripeEvent.type) {
      case "payment_intent.succeeded":
        const paymentIntent = stripeEvent.data.object
        console.log("💥 PaymentIntent was successful!")

        // Preparing useful data to send out
        const shippingDetails = paymentIntent.shipping
        const description = paymentIntent.description

        // Sending a test email with that stuff in
        const msg = {
          to: process.env.BUYER_EMAIL,
          from: process.env.SELLER_EMAIL,
          subject: `New purchase from ${shippingDetails.name}`,
          html: `<h4>New purchase</h4>
            <br/>
            We just received a new purchase for <strong>${description}</strong> <br/>
            Please proceed to fullfilment to: <br/>
            <ul>
            <li> <strong>Name</strong>: ${shippingDetails.name}</li>
            <li> <strong>Line 1</strong>: ${shippingDetails.address.line1}</li>
            <li> <strong>Line 2</strong>: ${shippingDetails.address.line2}</li>
            <li> <strong>City</strong>: ${shippingDetails.address.city}</li>
            <li> <strong>Postal code</strong>: ${shippingDetails.address.postal_code}</li>
            <li> <strong>Country</strong>: ${shippingDetails.address.country}</li>
            </ul><br/>
            Thank you,<br/>
            The CelotehBahasa team`,
        }
        await sgMail
          .send(msg)
          .then(() => {
            console.log("📧 Email sent")
          })
          .catch(error => {
            console.error(error)
          })
        break
      default:
        console.log(`Unhandled event type ${stripeEvent.type}`)
    }

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
