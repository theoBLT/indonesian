const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const { id } = JSON.parse(event.body);
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };
    
    // Retrieve payment intent from the token passed
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    
    console.log(paymentIntent)

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(
            {
                status:paymentIntent.status
            }
            )
    };
}