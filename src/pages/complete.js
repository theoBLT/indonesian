import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import {loadStripe} from '@stripe/stripe-js';

const CompletePage = () => { 

    // Defining initial state for the component
    const [loading, setLoading ] = useState(false);
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);

    // Calling a serverless function to retrieve payment status
    useEffect(() => {

        // This needs to take place in useEffect. If not, it runs at build time and break https://www.gatsbyjs.com/docs/debugging-html-builds/
      const urlParams = new URLSearchParams(window.location.search);
      const payment_intent = urlParams.get('payment_intent')

      fetch("/.netlify/functions/get-payment-status",{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({id:payment_intent})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.status);
        if(data.status === 'succeeded'){
          setPaymentSucceeded(true);
        }
      })
      .catch((error) => {
        console.error('Error',error);
      })
    }, [loading]);

  return (
      <>
      <SEO title="Thank you for your purchase"/>
      <Layout>
        <Header short="true"/>
        <h2>{paymentSucceeded?`Thank you for your order!`:`Oops, payment failed.`}</h2>
          <p>
          {paymentSucceeded?`Woot! Payment went through, and your mug is on the way!`:`It looks like your order could not be paid at this time. Please try again or select a different payment option.`}
          </p>
          <p>
            <a href ="/buy" alt="buy another">Purchase again</a>
          </p>
          <footer>
            © {new Date().getFullYear()}, CelotehBahasa.com
          </footer>
      </Layout>
      </>
    )
  }

  export default CompletePage
