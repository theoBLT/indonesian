const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    // Get currency from client, can either be pln or eur
    const { currency } = JSON.parse(event.body);
    console.log(`The currency passed was ${currency}`);
    var payment_methods = [];
    var amount;

    // defining the set of payment methods and prices based on currency. To replace with 'prices' when in the Beta
    if(currency ==='pln'){
      payment_methods = ['blik','card'];
      amount = 800;
      console.log(`Behavior: Polish detected`);

    } else if (currency === 'eur'){
      payment_methods = ['paypal','card']
      amount = 200;
      console.log(`Behavior: European detected`);

    } else {
      payment_methods = ['paypal','card'];
      price = 'price_1IIFXEKMFPueLM0KBdPYm8wz';
    }

    const paymentIntent = await stripe.paymentIntents.create(
        {
          currency:currency,
          amount:amount,
          payment_method_types: payment_methods,
          description: '1x Official CelotehBahasa Enamel Campfire Mug',
          shipping: {
            name: 'Theo Blochet',
            address: {
              line1: '2 rue de malte',
              line2: 'appt. 202',
              city: 'Paris',
              state: 'ile de France',
              country:'FR',
              postal_code:'75011'
            }
          }
        });
    
    console.log(paymentIntent.id)

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