import React from "react"
import "../styles/address.css"

const Address = props => {
  return (
    <div className="address-form">
      <select
        name="address.country"
        value={props.shipping.address.country}
        onChange={props.updateShipping}
      >
        <option value="">Pick a country</option>
        <option value="FR">France</option>
        <option value="GB">United Kingdom</option>
        <option value="IE">Ireland</option>
        <option value="PL">Poland</option>
        <option value="US">United States</option>
      </select>

      <input
        type="text"
        name="name"
        placeholder="Full name"
        value={props.shipping.name}
        onChange={props.updateShipping}
      />

      <input
        type="text"
        name="address.line1"
        placeholder="Address line 1"
        value={props.shipping.address.line1}
        onChange={props.updateShipping}
      />

      <input
        type="text"
        name="address.line2"
        placeholder="Address line 2"
        value={props.shipping.address.line2}
        onChange={props.updateShipping}
      />

      <input
        type="text"
        name="address.city"
        placeholder="City"
        value={props.shipping.address.city}
        onChange={props.updateShipping}
      />

      <input
        type="text"
        name="address.postal_code"
        placeholder="Postcode"
        value={props.shipping.address.postal_code}
        onChange={props.updateShipping}
      />
    </div>
  )
}

export default Address
