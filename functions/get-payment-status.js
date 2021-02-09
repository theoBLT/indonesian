const https = require('https');
// Hack to avoid issues with Stripe's node library conflicting with AWS lambda https://github.com/stripe/stripe-node/issues/1040
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({keepAlive: false})
});


exports.handler = async (event) => {
    const { id } = JSON.parse(event.body);
    
    // Retrieve payment intent from the token passed
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    
    console.log(`Called Stripe to get status of ${paymentIntent}`)

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                status:paymentIntent.status,
                id:paymentIntent.id
            }
            )
    };
}