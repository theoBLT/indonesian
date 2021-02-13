import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Footer from "../components/footer"
import Header from "../components/header"
import SEO from "../components/seo"
import Checkout from "../components/checkout"
import Product from "../components/product"

// Stripe wrappers
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const BuyPage = () => {
  return (
    <>
      <SEO title="Would you like a mug?" />
      <Layout>
        <Header short="true" />
        <Product />

        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>

        <Footer />
      </Layout>
    </>
  )
}

export default BuyPage
