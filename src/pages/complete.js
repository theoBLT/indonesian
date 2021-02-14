import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Footer from "../components/footer"
import Header from "../components/header"
import SEO from "../components/seo"
import { getPaymentStatus } from "../utils/api-proxy.js"
import { Link } from "gatsby"

const CompletePage = () => {
  // Defining initial state for the component
  const [loading, setLoading] = useState(true)
  const [paymentSucceeded, setPaymentSucceeded] = useState(false)

  // Calling a serverless function to retrieve payment status
  useEffect(() => {
    // This needs to take place in useEffect. If not, it runs at build time and break https://www.gatsbyjs.com/docs/debugging-html-builds/
    const urlParams = new URLSearchParams(window.location.search)
    const payment_intent = urlParams.get("payment_intent")

    getPaymentStatus(payment_intent).then(data => {
      if (data.status === "succeeded" || data.status === "processing") {
        setLoading(false)
        setPaymentSucceeded(true)
      } else {
        setLoading(false)
        setPaymentSucceeded(false)
      }
    })
  }, [])

  return (
    <>
      <SEO title="Thank you for your purchase" />
      <Layout>
        <Header short="true" />

        <div className={loading ? `` : `hidden`}>
          Loading the result of your payment — hold with us, this shouldn't take
          long...
        </div>

        <div className={loading ? `hidden` : ``}>
          <h2>
            {paymentSucceeded
              ? `Thank you for your order!`
              : `Oops, payment failed.`}
          </h2>
          <p>
            {paymentSucceeded
              ? `Awesome! Payment went through, and your mug is on the way!`
              : `It looks like your order could not be paid at this time. Please try again or select a different payment option.`}
          </p>
          <p>
            <Link to="/books">Buy again</Link>
          </p>
        </div>
        <Footer />
      </Layout>
    </>
  )
}

export default CompletePage
