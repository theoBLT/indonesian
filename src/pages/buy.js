import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import {loadStripe} from '@stripe/stripe-js';
import {createPaymentIntent, confirmBlikPayment, getPaymentStatus} from '../utils/api-proxy.js'

const BuyPage = () => {
  const [currency, setCurrency ] = useState('eur');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [clientSecret,setClientSecret] = useState (null);
  const [returnUrl, setReturnUrl] = useState(null);
  const [blikCode, setBlikCode] = useState('');

  useEffect(() => {
    createPaymentIntent(currency).then(data => {
      setReturnUrl(data.return_url);
      setPaymentIntent(data.payment_intent);
      setClientSecret(data.client_secret);
    })
    .catch((error) => {
      console.error('Error',error);
    })
  }, [currency]);
  
  const confirmPaypalPayment = async () => {
    setButtonProcessing();
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
      console.error('There was an error in redirecting to the payment method provider.')
    }
  }
  
  const switchCurrency = () => {
    currency === 'eur'?setCurrency('pln'):setCurrency('eur');
  }

  const toggleModal = () => {
    var modal = document.querySelector("#modal");
    var modalOverlay = document.querySelector("#modal-overlay");

    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed")
  }

  const processBlikPayment = async () => {
    confirmBlikPayment(blikCode, paymentIntent).then(data => {
      // Set loading state, triggerring visibility of modal
      setButtonProcessing();
      toggleModal ();
      // Call polling function, when status stops being "requires_action"
      // Redirect user to complete.js page
      console.log(`BLIK payment intent created. Its token is ${data.payment_intent} and its status is ${data.status}. Next, we'll poll for it!`)

      function delay(t) {
        return new Promise(function(resolve) {
            setTimeout(resolve, t);
        });
      }
      // interval is how often to poll
      // timeout is how long to poll waiting for a result (0 means try forever)
      // url is the URL to request
      function pollUntilDone(paymentIntent, interval, timeout) {
        let start = Date.now();
        function run() {
            return getPaymentStatus(paymentIntent).then(function(data) {
                if (data.status !== "requires_action") {
                    // Here we'll unset the loading state
                    console.log(`Polling done, payment updated. Exiting run`)
                    return data;
                } else {
                    if (timeout !== 0 && Date.now() - start > timeout) {
                        throw new Error("timeout error on pollUntilDone");
                    } else {
                        // run again with a short delay
                        console.log(data);
                        return delay(interval).then(run);
                    }
                }
            });
        }
        return run();
      }

      pollUntilDone(paymentIntent, 1000, 30 * 1000).then(function(result) {
      // have final result here 
      console.log('polling done, entered done state');
      console.log(result);
      window.location.href = `/complete?payment_intent=${result.id}`;
      }).catch(function(err) {
        // handle error here
      });
    })
    .catch((error) => {
      console.error('Error',error);
    })
  }

  const handleChange = (event) => {
    setBlikCode(event.target.value);
  }

  const setButtonProcessing = () => {
    document.querySelector('.buy-button').textContent = 'Processing...';
  }

  

    return (
      <>
      <SEO title="Would you like a mug?"/>
      <Layout>
        <Header short="true"/>
        <div>
          <img width ="255" src ="https://images.printify.com/mockup/601ee67435b5ea595a48dd7f/70768/6906/enamel-campfire-mug.jpg?s=2048&t=1612638194000" alt ="The official CelotehBahsa.com mug"/>
        </div>
        <h2>Official CelotehBahasa® Enamel Campfire Mug</h2>
        <p><strong>{currency==='eur'?`€2.00`:`8,00 zł`}</strong>
        <button onClick={switchCurrency} className="inline-button">{currency==='eur'?`Buy in Polish zlotis instead`:`Buy in Euros`}</button>
          </p>
          
          <p>
          Get your hands on this durable enamel mug that holds 12 ounces of your favorite beverage. Add a personalized touch to your hipster moment with full-color printing of the CelotehBahasa® logo. Great for indoors and outdoors activities as it can keep up with the dirt and grunge of campsites. This sturdy and stylish cup is perfect for coffee, tea or even your morning cereal in the wild.
          • 12oz (0.35 l) • Lightweight stainless steel • Rounded corners • C-handle.
          </p>
          <p className={currency==='pln'?'':'hidden'}>
            <label htmlFor='blik_code'>Please enter the 6-digits BLIK code from your banking application<br/>
              <input className="blik-token" onChange={handleChange} type='number' max='999999' id='blik_code' name ='blik_code' placeholder='000000' value ={blikCode} ></input>
            </label>
          </p>
          <button className="buy-button" onClick={currency==='eur'?confirmPaypalPayment:processBlikPayment}>{currency==='pln'?'Buy with BLIK':'Buy with PayPal'}</button>
          <p className={currency==='pln'?'helptext':'hidden helptext'}>In a moment, we will ask you for a BLIK code. Make sure you've got your phone handy, to confirm the payment in your banking app.</p>
          <footer>
            © {new Date().getFullYear()}, CelotehBahasa.com
          </footer>

        <div className="modal-overlay closed" id="modal-overlay"></div>

        {/* modal triggered when the BLIK payment is awaiting user confirmation */}
        <div className="modal closed" id="modal">
          <div className="modal-guts">
            <h3>Confirm the payment</h3>
            <p>Please open your banking app, and confirm the BLIK payment when prompted. Go on, we'll wait for you here.</p>
          </div>
        </div>
      </Layout>
      </>
    )
  }

  export default BuyPage
