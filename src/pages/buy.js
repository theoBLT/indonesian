import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Footer from "../components/footer"
import Header from "../components/header"
import SEO from "../components/seo"
import {loadStripe} from '@stripe/stripe-js';
import {createPaymentIntent, confirmBlikPayment, getPaymentStatus} from '../utils/api-proxy.js'
import Paymentmethod from "../components/paymentmethod"

const BuyPage = () => {
  const [currency, setCurrency ] = useState('eur');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [clientSecret,setClientSecret] = useState (null);
  const [returnUrl, setReturnUrl] = useState(null);
  const [blikCode, setBlikCode] = useState('');
  const [buyerCountry, setBuyerCountry] = useState ('DE');
  const [availableMethods, setAvailableMethods] = useState (['paypal'])

  // todo: change to ['paypal','sofort','card']
  const german_methods = ['PayPal']


  // By default, set the active method as the first of the default selected country
  const [paymentMethod, setPaymentMethod] = useState(german_methods[0].toLowerCase())

  useEffect(() => {
    createPaymentIntent(buyerCountry).then(data => {
      setReturnUrl(data.return_url);
      setPaymentIntent(data.payment_intent);
      setClientSecret(data.client_secret);
      setAvailableMethods(data.payment_methods);
    })
    .catch((error) => {
      console.error('Error',error);
    })
  }, [buyerCountry]);
  
  const processPaypalPayment = async () => {
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

  const processSofortPayment = async () => {
    setButtonProcessing();
    const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
    const {error} = await stripe.confirmSofortPayment(
      clientSecret, {
        payment_method: {
          sofort: {
            country: "DE"
          },
          billing_details: {
            name: 'Theo Blochet',
          },
        },
        return_url: `${returnUrl}`,
      });
      if (error) {
        console.error('There was an error in redirecting to the payment method provider.')
      }
  }

  const processGiropayPayment = async () => {
    setButtonProcessing();
    const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
    const {error} = await stripe.confirmGiropayPayment(
      clientSecret, {
        payment_method: {
          billing_details: {
            name: 'Theo Blochet',
          },
        },
        return_url: `${returnUrl}`,
      });
      if (error) {
        console.error('There was an error in redirecting to the payment method provider.')
      }
  }
  
  const switchCountry = () => {
    buyerCountry === 'DE'?setBuyerCountry('PL'):setBuyerCountry('DE');
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

      function poll(paymentIntent, interval, timeout) {
        let start = Date.now();
        function run() {
            return getPaymentStatus(paymentIntent).then(function(data) {
                if (data.status !== "requires_action") {
                    return data;
                } else {
                    if (timeout !== 0 && Date.now() - start > timeout) {
                        throw new Error("Timeout error during polling");
                    } else {
                        return delay(interval).then(run);
                    }
                }
            });
        }
        return run();
      }

      poll(paymentIntent, 1000, 30 * 1000).then(function(result) {
        // Redirect
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

  function selectMethod(method) {

    // Declare all variables
    var i, methods, methodContainers;
    var lowercase_method = method.toLowerCase()

    // Change state
    setPaymentMethod(lowercase_method);
    console.log(`State has been set to method: ${lowercase_method}`)

    // Get all elements with class="methods" and remove the class "active"
    methods = document.querySelectorAll(".payment-method");
    for (i = 0; i < methods.length; i++) {
      methods[i].classList.remove("active")
    }

    // Get all their containers and do the same 
    methodContainers = document.querySelectorAll(".method-container");
    for (i=0; i < methodContainers.length; i++) {
      methodContainers[i].classList.remove("active");
    }

    // Set the current method and its container (both with the ID set as the method's) as active 
    document.querySelectorAll(`#${lowercase_method}`).forEach((item) => item.classList.add("active"));
  }

  const processPayment = () => {
    if (paymentMethod === 'blik') {
      processBlikPayment();
    } else if (paymentMethod === 'paypal') {
      processPaypalPayment();
    } 
    else if (paymentMethod === 'sofort') {
      processSofortPayment();
    } else if (paymentMethod === 'giropay') {
      processGiropayPayment();
    }
    else {
      console.log ('Unknown method, sorry.')
    }
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
        <button onClick={switchCountry} className="inline-button">{buyerCountry==='DE'?`Switch to Poland`:`Switch to Germany`}</button>
          </p>
          
          <p>
          Get your hands on this durable enamel mug that holds 12 ounces of your favorite beverage. Add a personalized touch to your hipster moment with full-color printing of the CelotehBahasa® logo. Great for indoors and outdoors activities as it can keep up with the dirt and grunge of campsites. This sturdy and stylish cup is perfect for coffee, tea or even your morning cereal in the wild.
          • 12oz (0.35 l) • Lightweight stainless steel • Rounded corners • C-handle.
          </p>

          <h4>Payment method</h4>

          <div className="tab">

            {availableMethods.map((method, i) =>
              <Paymentmethod 
                key = {i}
                method = {method}
                onselect = {selectMethod}
              />
            )}

          </div>

          <div id = "paypal" className="method-container">

          </div>

          <div id ="blik" className ="method-container">
            <label htmlFor='blik_code'>Please enter the 6-digits BLIK code from your banking application<br/>
                <input className="blik-token" pattern="[0-9]*" onChange={handleChange} type='number' max='999999' id='blik_code' name ='blik_code' placeholder='000000' value ={blikCode} ></input>
            </label>
          </div>

          <button className="buy-button" onClick={processPayment}>Pay now</button>
          
        <Footer/>

        {/* modal triggered when the BLIK payment is awaiting user confirmation */}
        <div className="modal-overlay closed" id="modal-overlay"></div>
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
