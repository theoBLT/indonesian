import React, { useEffect, useState } from "react"
import {
  createPaymentIntent,
  confirmBlikPayment,
  getPaymentStatus,
} from "../utils/api-proxy.js"
import Paymentmethod from "../components/paymentmethod"
import CardSection from "../components/cardsection"
import Address from "../components/adress"
import { loadStripe } from "@stripe/stripe-js"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"

const Checkout = () => {
  // const [currency, setCurrency] = useState("eur")
  const [paymentIntent, setPaymentIntent] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)
  const [returnUrl, setReturnUrl] = useState(null)
  const [blikCode, setBlikCode] = useState("")
  const [buyerCountry, setBuyerCountry] = useState("DE")
  const [availableMethods, setAvailableMethods] = useState(["paypal"])
  const [isProcessing, setIsProcessing] = useState(false)

  // Setting Shipping
  const [shipping, setShipping] = useState({
    name: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      country: "",
      postal_code: "",
    },
  })

  // By default, set the active method as the first of the default selected country
  const [paymentMethod, setPaymentMethod] = useState("paypal")

  // Retrieve Stripe objects from Elements wrapper
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    createPaymentIntent(buyerCountry)
      .then(data => {
        setReturnUrl(data.return_url)
        setPaymentIntent(data.payment_intent)
        setClientSecret(data.client_secret)
        setAvailableMethods(data.payment_methods)
      })
      .catch(error => {
        console.error("Error", error)
      })
  }, [buyerCountry])

  const processCardPayment = async () => {
    setButtonProcessing()
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Théo Blochet",
        },
      },
      shipping: shipping,
    })
    if (result.error) {
      stopButtonProcessing()
      // Show error to your customer (e.g., insufficient funds)
      displayError(result.error.decline_code)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        window.location.href = `/complete?payment_intent=${result.paymentIntent.id}`
      }
    }
  }

  const processPaypalPayment = async () => {
    setButtonProcessing()
    const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY, {
      betas: ["paypal_pm_beta_1"],
    })
    const { error } = await stripe.confirmPayPalPayment(clientSecret, {
      payment_method_options: {
        paypal: {
          preferred_locale: "en_US",
        },
      },
      return_url: `${returnUrl}`,
      shipping: shipping,
    })
    if (error) {
      stopButtonProcessing()
      console.error(
        "There was an error in redirecting to the payment method provider."
      )
    }
  }

  const updateShipping = event => {
    let newval = event.target.value
    switch (event.target.name) {
      case "name":
        setShipping({ ...shipping, name: newval })
        break
      case "address.country":
        setShipping({
          ...shipping,
          address: {
            ...shipping.address,
            country: newval,
          },
        })
        break
      case "address.line1":
        setShipping({
          ...shipping,
          address: {
            ...shipping.address,
            line1: newval,
          },
        })
        break
      case "address.line2":
        setShipping({
          ...shipping,
          address: {
            ...shipping.address,
            line2: newval,
          },
        })
        break
      case "address.city":
        setShipping({
          ...shipping,
          address: {
            ...shipping.address,
            city: newval,
          },
        })
        break
      case "address.postal_code":
        setShipping({
          ...shipping,
          address: {
            ...shipping.address,
            postal_code: newval,
          },
        })
        break
      default:
        throw new Error()
    }
  }

  const processSofortPayment = async () => {
    setButtonProcessing()
    const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
    const { error } = await stripe.confirmSofortPayment(clientSecret, {
      payment_method: {
        sofort: {
          country: "DE",
        },
        billing_details: {
          name: "Theo Blochet",
        },
      },
      return_url: `${returnUrl}`,
      shipping: shipping,
    })
    if (error) {
      stopButtonProcessing()
      console.error(
        "There was an error in redirecting to the payment method provider."
      )
    }
  }

  const processGiropayPayment = async () => {
    setButtonProcessing()
    const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
    const { error } = await stripe.confirmGiropayPayment(clientSecret, {
      payment_method: {
        billing_details: {
          name: "Theo Blochet",
        },
      },
      return_url: `${returnUrl}`,
      shipping: shipping,
    })
    if (error) {
      stopButtonProcessing()
      console.error(
        "There was an error in redirecting to the payment method provider."
      )
    }
  }

  const processP24Payment = async () => {
    setButtonProcessing()
    const stripe = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
    const { error } = await stripe.confirmP24Payment(clientSecret, {
      payment_method: {
        p24: { bank: "inteligo" },
        billing_details: {
          name: "theo blochet",
          email: "theobloc@gmail.com",
        },
      },
      return_url: `${returnUrl}`,
      shipping: shipping,
    })
    if (error) {
      stopButtonProcessing()
      console.error(
        "There was an error in redirecting to the payment method provider."
      )
    }
  }

  const switchCountry = () => {
    buyerCountry === "DE" ? setBuyerCountry("PL") : setBuyerCountry("DE")
  }

  const toggleModal = () => {
    var modal = document.querySelector("#modal")
    var modalOverlay = document.querySelector("#modal-overlay")

    modal.classList.toggle("closed")
    modalOverlay.classList.toggle("closed")
  }

  const processBlikPayment = async () => {
    confirmBlikPayment(blikCode, paymentIntent, shipping)
      .then(data => {
        // Set loading state, triggerring visibility of modal
        setButtonProcessing()

        if (data.error) {
          stopButtonProcessing()
          console.log("There was an error")
          displayError(data.error.code)
          return false
        }

        toggleModal()
        // Call polling function, when status stops being "requires_action"
        // Redirect user to complete.js page

        function delay(t) {
          return new Promise(function(resolve) {
            setTimeout(resolve, t)
          })
        }

        function poll(paymentIntent, interval, timeout) {
          let start = Date.now()
          function run() {
            return getPaymentStatus(paymentIntent).then(function(data) {
              if (data.status !== "requires_action") {
                return data
              } else {
                if (timeout !== 0 && Date.now() - start > timeout) {
                  throw new Error("Timeout error during polling")
                } else {
                  return delay(interval).then(run)
                }
              }
            })
          }
          return run()
        }

        poll(paymentIntent, 1000, 30 * 1000)
          .then(function(result) {
            // Redirect
            window.location.href = `/complete?payment_intent=${result.id}`
          })
          .catch(function(err) {
            // handle error here
          })
      })
      .catch(error => {
        console.error("Error", error)
      })
  }

  const updateBlikState = event => {
    setBlikCode(event.target.value)
  }

  const setButtonProcessing = () => {
    document.querySelector(".buy-button").textContent = "Processing..."
    document.querySelector(".buy-button").classList.add("processing")
  }
  const stopButtonProcessing = () => {
    document.querySelector(".buy-button").textContent = "Pay now"
    document.querySelector(".buy-button").classList.remove("processing")
  }

  function selectMethod(method) {
    // Declare all variables
    var i, methods, methodContainers
    var lowercase_method = method.toLowerCase()

    // Change states - new method, clean error messages
    setPaymentMethod(lowercase_method)
    displayError("none")

    // Get all elements with class="methods" and remove the class "active"
    methods = document.querySelectorAll(".payment-method")
    for (i = 0; i < methods.length; i++) {
      methods[i].classList.remove("active")
    }

    // Get all their containers and do the same
    methodContainers = document.querySelectorAll(".method-container")
    for (i = 0; i < methodContainers.length; i++) {
      methodContainers[i].classList.remove("active")
    }

    // Set the current method and its container (both with the ID set as the method's) as active
    document
      .querySelectorAll(`#${lowercase_method}`)
      .forEach(item => item.classList.add("active"))
  }

  const processPayment = event => {
    event.preventDefault()

    // Clear prior error messages
    displayError("none")

    if (paymentMethod === "blik") {
      processBlikPayment()
    } else if (paymentMethod === "paypal") {
      processPaypalPayment()
    } else if (paymentMethod === "sofort") {
      processSofortPayment()
    } else if (paymentMethod === "giropay") {
      processGiropayPayment()
    } else if (paymentMethod === "p24") {
      processP24Payment()
    } else if (paymentMethod === "card") {
      processCardPayment()
    } else {
      console.log("Unknown method, sorry.")
    }
  }

  const pretendyouareme = () => {
    setShipping({
      name: "Théo Blochet",
      address: {
        line1: "2 rue de malte",
        line2: "",
        city: "Paris",
        country: "FR",
        postal_code: "75011",
      },
    })
  }

  const displayError = code => {
    let message = ""
    //Define which error message to display
    switch (code) {
      case "none":
        message = ""
        break
      case "payment_method_invalid_parameter":
        message =
          "The BLIK code you entered has expired, or wasn't valid. Please enter another BLIK code."
        break
      case "payment_method_provider_decline":
        message =
          "The payment was declined by your bank. Please try another payment method."
        break
      case "insufficient_funds":
        message =
          "The bank refused your payment due to insufficient funds. Please try another payment method."
        break
      default:
        message =
          "Your payment couldn't be processed. Please try again or try another payment method."
    }

    // Inject error message
    let error = document.querySelector("#error")
    error.textContent = message
  }

  return (
    <>
      <form id="payment-form" onSubmit={processPayment} method="POST">
        <h4>Shipping address</h4>
        <button
          onClick={pretendyouareme}
          className="inline-button"
          type="button"
        >
          Fill with Théo's deets
        </button>
        <Address shipping={shipping} updateShipping={updateShipping} />
        <div className="payment-methods-section">
          <h4>Payment method</h4>
          <div className="tab">
            {availableMethods.map((method, i) => (
              <Paymentmethod key={i} method={method} onselect={selectMethod} />
            ))}
          </div>

          <div id="paypal" className="method-container"></div>

          <div id="blik" className="method-container">
            <label htmlFor="blik_code">
              Please enter the 6-digits BLIK code from your banking application
              <br />
              <input
                className="blik-token"
                pattern="[0-9]*"
                onChange={updateBlikState}
                type="number"
                max="999999"
                id="blik_code"
                name="blik_code"
                placeholder="000000"
                value={blikCode}
              ></input>
            </label>
          </div>

          <div id="card" className="method-container">
            <CardSection />
          </div>

          <div id="p24" className="method-container"></div>
        </div>
        <div id="error"></div>
        <button type="submit" className="buy-button">
          Pay now
        </button>
      </form>
      <p>
        <button onClick={switchCountry} className="inline-button" type="button">
          {buyerCountry === "DE" ? `Switch to Poland` : `Switch to Germany`}
        </button>
      </p>

      {/* modal triggered when the BLIK payment is awaiting user confirmation */}
      <div className="modal-overlay closed" id="modal-overlay"></div>
      <div className="modal closed" id="modal">
        <div className="modal-guts">
          <h3>Confirm the payment</h3>
          <p>
            Please open your banking app, and confirm the BLIK payment when
            prompted. Go on, we'll wait for you here.
          </p>
        </div>
      </div>
    </>
  )
}

export default Checkout
