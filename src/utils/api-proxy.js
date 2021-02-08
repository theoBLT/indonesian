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

