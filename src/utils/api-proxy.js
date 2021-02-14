// Calls to Stripe

const getPaymentStatus = async token => {
  return fetch("/.netlify/functions/get-payment-status", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id: token }),
  })
    .then(response => response.json())
    .catch(error => {
      console.error("Error", error)
    })
}

export { getPaymentStatus }

const createPaymentIntent = async buyerCountry => {
  return fetch("/.netlify/functions/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ buyerCountry: buyerCountry }),
  }).then(response => response.json())
}

export { createPaymentIntent }

const confirmBlikPayment = async (blik_code, payment_intent, shipping) => {
  return fetch("/.netlify/functions/confirm-payment-intent", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      payment_intent: payment_intent,
      blik_code: blik_code,
      shipping: shipping,
    }),
  }).then(response => response.json())
}

export { confirmBlikPayment }

const createCustomer = async email => {
  return fetch("/.netlify/functions/create-customer", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(response => response.json())
}

export { createCustomer }

const createSubscription = async data => {
  return fetch("/.netlify/functions/create-subscription", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
}

export { createSubscription }
