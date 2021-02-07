const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    // Get currency from client, can either be pln or eur
    const { blik_code, payment_intent } = JSON.parse(event.body);
    console.log(`Confirming payment_intent ${payment_intent} with code ${blik_code}`);

    const paymentIntent = await stripe.paymentIntents.confirm(
        payment_intent,
        {
            payment_method_data:{
                type:'blik'
            },
            payment_method_options:{
                blik:{
                    code:blik_code
                }
            }
        });
    
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(
            {
                client_secret:paymentIntent.client_secret,
                payment_intent:paymentIntent.id,
                return_url:`${process.env.URL}/complete`
            }
            )
    };
}