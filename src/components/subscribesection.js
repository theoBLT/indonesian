import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import CardSection from "../components/cardsection"
import { createSubscription } from "../utils/api-proxy"

const SubscribeSection = props => {
  // Retrieve Stripe objects from Elements wrapper
  const stripe = useStripe()
  const elements = useElements()

  const createPaymentMethod = () => {
    stripe
      .createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      })
      .then(result => {
        if (result.error) {
          console.log(result.error)
        } else {
          createSubscription({
            customer: props.customer,
            priceId: props.plan,
            paymentMethodId: result.paymentMethod.id,
          })
            .then(result => {
              if (result.error) {
                throw result
              }
              return result
            })
            .then(result => {
              console.log(result)
              return {
                paymentMethodId: result.paymentMethodId,
                priceId: result.priceId,
                subscription: result.subscription,
                session: result.session,
              }
            })
            .then(result => {
              handleSuccessfulSubscription(result.session)
            })
        }
      })
  }

  const handleSuccessfulSubscription = link => {
    console.log("Entering succesful setting function")
    console.log(link)
    const success = document.querySelector("#confirmation")
    success.innerHTML = `You were succesfully subscribed. To manage your subscription, head <a href="${link}">here</a>`
  }

  return (
    <>
      <CardSection />
      <button onClick={createPaymentMethod} className="buy-button">
        Subscribe now
      </button>
      <div id="confirmation"></div>
    </>
  )
}

export default SubscribeSection
