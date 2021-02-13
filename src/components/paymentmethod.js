import React from "react"
import { capitalize } from "../utils/helpers.js"

export default props => {
  const { method } = props
  const lowercase_method = method.toLowerCase()

  const getIconUrl = method => {
    if (method === "p24") {
      return "https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/dotpay.svg"
    } else {
      return (
        `https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/` +
        method +
        `.svg`
      )
    }
  }

  return (
    <button
      type="button"
      id={lowercase_method}
      className={`payment-method `}
      onClick={() => props.onselect(method)}
    >
      <span className="method-icon">
        <img alt={method} src={getIconUrl(lowercase_method)} />
      </span>
      {capitalize(method)}
    </button>
  )
}
