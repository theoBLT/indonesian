import React from "react"
import {capitalize} from "../utils/helpers.js"

export default props =>  {
    const {method} = props;
    const lowercase_method = method.toLowerCase()
   
    return (
        <button id ={lowercase_method} className={`payment-method `} onClick={() => props.onselect(method)}>
            <span className="method-icon">
                <img alt={method} src={`https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/`+ lowercase_method +`.svg`}/>
            </span>
            {capitalize(method)}
        </button>
    )
}