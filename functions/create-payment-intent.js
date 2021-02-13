const https = require('https');
// Hack to avoid issues with Stripe's node library conflicting with AWS lambda https://github.com/stripe/stripe-node/issues/1040
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({keepAlive: false})
});

exports.handler = async (event) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    // Get currency from client, can either be pln or eur
    const { buyerCountry } = JSON.parse(event.body);
    console.log(`The country passed was ${buyerCountry}`);
    var payment_methods = [];
    var amount, currency;

    // defining the set of payment methods and prices based on currency. To replace with 'prices' when in the Beta
    if(buyerCountry ==='PL'){
      payment_methods = ['blik','p24'];
      amount = 800;
      currency = 'PLN';
      console.log(`Behavior: Polish detected`);
      

    } else if (buyerCountry === 'DE'){
      payment_methods = ['paypal','sofort','giropay']
      amount = 200;
      currency = 'EUR';
      console.log(`Behavior: Germany detected`);

    } else {
      payment_methods = ['paypal','card'];
      amount = 200;
      currency ='EUR';
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

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(
            {
                client_secret:paymentIntent.client_secret,
                payment_intent:paymentIntent.id,
                return_url:`${process.env.URL}/complete`,
                payment_methods:paymentIntent.payment_method_types
            }
            )
    };
}