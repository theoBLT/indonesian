import React, { useState } from "react"
import Layout from "../components/layout"
import Footer from "../components/footer"
import Header from "../components/header"
import SEO from "../components/seo"
import { createCustomer } from "../utils/api-proxy"
import PlanSection from "../components/plansection"
import SubscribeSection from "../components/subscribesection"
import "../styles/forms.css"

// Stripe wrappers
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const CausesPage = () => {
  const [email, setEmail] = useState("")
  const [customer, setCustomer] = useState("")
  const [plan, setPlan] = useState("")

  const updateEmail = event => {
    setEmail(event.target.value)
  }

  const handleCustomerForm = async event => {
    event.preventDefault()
    createCustomer(email).then(data => setCustomer(data.customer))
  }

  return (
    <>
      <SEO title="CelotehBahasa | The causes" />
      <Layout>
        <Header short="true" />
        <p>
          Welcome to the soon-to-be built <strong>CelotehBahasa causes</strong>.
          My intention here is to feature some great Indonesian causes that I
          contribute to, and help you do the same. — Théo For now this page is a
          playground, in which you can create a test susbcription with a test
          card. Nothing much to it.
        </p>
        <form onSubmit={handleCustomerForm} id="customer-form">
          Please enter your email
          <input
            type="email"
            value={email}
            name="email"
            onChange={updateEmail}
            placeholder="john@appleseed.com"
          />
          <button type="submit">Sign up </button>
        </form>
        <Elements stripe={stripePromise}>
          {customer ? (
            <PlanSection setPlan={setPlan} customer={customer} />
          ) : (
            ""
          )}
          {plan ? <SubscribeSection customer={customer} plan={plan} /> : ""}
        </Elements>
        <Footer />
      </Layout>
    </>
  )
}

export default CausesPage
