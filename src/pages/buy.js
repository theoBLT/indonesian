import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import {loadStripe} from '@stripe/stripe-js';

const BuyPage = () => {
  const [currency, setCurrency ] = useState('eur');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [clientSecret,setClientSecret] = useState (null);
  const [returnUrl, setReturnUrl] = useState(null);
  const [blikCode, setBlikCode] = useState('');

  useEffect(() => {
    fetch("/.netlify/functions/create-payment-intent",
    {
      method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({currency:currency})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.client_secret);
      console.log(data.payment_intent);
      console.log(data.return_url);
      setReturnUrl(data.return_url);
      setPaymentIntent(data.payment_intent);
      setClientSecret(data.client_secret);
    })
    .catch((error) => {
      console.error('Error',error);
    })
  }, [currency]);
  
  const confirmPaypalPayment = async () => {
    const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY,
      {betas: ['paypal_pm_beta_1']}
      );
    const {error} = await stripe.confirmPayPalPayment(
    clientSecret,
    {
      return_url: `${returnUrl}`,
    }
    );
    if (error) {
      console.log('There was an error in redirecting to the payment method provider.')
    }
  }
  
  const switchCurrency = () => {
    currency === 'eur'?setCurrency('pln'):setCurrency('eur');
  }

  const confirmBlikPayment = async () => {
    fetch("/.netlify/functions/confirm-payment-intent",
    {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          payment_intent:paymentIntent,
          blik_code:blikCode
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch((error) => {
      console.error('Error',error);
    })
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setBlikCode(event.target.value);
  }


    return (
      <>
      <SEO title="Would you like a mug?"/>
      <Layout>
        <Header/>
        <div>
          <img width ="255" src ="https://images.printify.com/mockup/601ee67435b5ea595a48dd7f/70768/6906/enamel-campfire-mug.jpg?s=2048&t=1612638194000" alt ="The official CelotehBahsa.com mug"/>
        </div>
        <h2>Official CelotehBahasa® Enamel Campfire Mug</h2>
        <p><strong>{currency==='eur'?`€2.00`:`8,00 zł`}</strong>
          </p>
          <button onClick={switchCurrency}>{currency==='eur'?`Buy in Polish zlotis`:`Buy in Euros`}</button>
          <p>
          Get your hands on this durable enamel mug that holds 12 ounces of your favorite beverage. Add a personalized touch to your hipster moment with full-color printing of a photo, logo or design. Great for indoors and outdoors activities as it can keep up with the dirt and grunge of campsites. This sturdy and stylish cup is perfect for coffee, tea or even your morning cereal in the wild.
          .: 12oz (0.35 l)
          .: Lightweight stainless steel
          .: Rounded corners
          .: C-handle
          </p>
          <p className={currency==='pln'?'':'hidden'}>
            <label htmlFor='blik_code'>Please enter your 6-digits BLIK code below<br/>
              <input onChange={handleChange} type='number' max='999999' id='blik_code' name ='blik_code' placeholder='000000' value ={blikCode} ></input>
            </label>
          </p>
          <button onClick={currency==='eur'?confirmPaypalPayment:confirmBlikPayment}>Buy!</button>
          <footer>
            © {new Date().getFullYear()}, CelotehBahasa.com
          </footer>
      </Layout>
      </>
    )
  }

  export default BuyPage
