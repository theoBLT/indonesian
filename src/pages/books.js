import React from "react"
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
      <SEO title="CelotehBahasa | The book club" />
      <Layout>
        <Header short="true" />
        <p>
          Welcome to <strong>the CelotehBahasa book club</strong>. My intention
          is to include great reads about Indonesia, for other people who like
          me have an interest in the culture. For now that section only includes
          one (great) book below, but stay tuned for more options coming soon! —
          Théo
        </p>
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
