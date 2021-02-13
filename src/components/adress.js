import React, { useState } from "react"
import "../styles/address.css"

function Address() {
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

  const updateShipping = event => {
    let newval = event.target.value
    switch (event.target.name) {
      case "name":
        setShipping({ ...shipping, name: newval })
        break
      case "address.country":
        console.log(`Updating address country to ${newval}`)
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

  return (
    <div className="address-form">
      <select
        name="address.country"
        value={shipping.address.country}
        onChange={updateShipping}
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
        value={shipping.name}
        onChange={updateShipping}
      />

      <input
        type="text"
        name="address.line1"
        placeholder="Address line 1"
        value={shipping.address.line1}
        onChange={updateShipping}
      />

      <input
        type="text"
        name="address.line2"
        placeholder="Address line 2"
        value={shipping.address.line2}
        onChange={updateShipping}
      />

      <input
        type="text"
        name="address.city"
        placeholder="City"
        value={shipping.address.city}
        onChange={updateShipping}
      />

      <input
        type="text"
        name="address.postal_code"
        placeholder="Postcode"
        value={shipping.address.postal_code}
        onChange={updateShipping}
      />
    </div>
  )
}

export default Address
