import React from "react"
import { CardElement } from "@stripe/react-stripe-js"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Work Sans", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "18px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
}

function CardSection() {
  return (
    <label>
      Please enter your card details below
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  )
}

export default CardSection
