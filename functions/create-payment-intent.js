const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };

    const paymentIntent = await stripe.paymentIntents.create(
        {
          amount: 2000,
          currency: 'eur',
          payment_method_types: ['paypal','card'],
          description: '1x Official CelotehBahasa Enamel Campfire Mug'
        });
    
    console.log(paymentIntent.id)

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(paymentIntent.id)
    };
}