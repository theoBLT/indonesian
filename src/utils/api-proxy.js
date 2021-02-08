// Calls to Stripe

const getPaymentStatus = async (token) => {
    return fetch("/.netlify/functions/get-payment-status",{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({id:token})
      })
      .then(response => response.json())
      .then(data => data.status)
      .catch((error) => {
        console.error('Error',error);
      })
}

export {getPaymentStatus};

const poll = async function (fn, fnCondition, ms) {
    let result = await fn();
    console.log (`First polling to API returns ${result}`)
    while (fnCondition(result)) {
      await wait(ms);
      result = await fn();
    }
    return result;
  };
  
  const wait = function (ms = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

export {poll}

const createPaymentIntent = async (currency) => {
    return fetch("/.netlify/functions/create-payment-intent",
    {
      method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({currency:currency})
    }).then(response => response.json())
}

export {createPaymentIntent}

const confirmBlikPayment = async(blik_code,payment_intent) => {
    return fetch("/.netlify/functions/confirm-payment-intent",
    {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          payment_intent:payment_intent,
          blik_code:blik_code
        })
    })
    .then(response => response.json())
}

export {confirmBlikPayment}
