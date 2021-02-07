import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import {loadStripe} from '@stripe/stripe-js';

const completePage = () => {return (
      <>
      <SEO title="Thank you for your purchase"/>
      <Layout>
        <Header/>
        <h2>Purchase complete!</h2>
          <p>
          The mug is on your way! Well, we haven't yet checked that the payment was succesful, but it should be!
          </p>
          <footer>
            © {new Date().getFullYear()}, CelotehBahasa.com
          </footer>
      </Layout>
      </>
    )
  }

  export default completePage
