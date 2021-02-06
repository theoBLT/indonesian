import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"

const BuyPage = () => {
  const [loading, setLoading ] = useState(false);
  const [intent, setIntent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8888/.netlify/functions/hello-world")
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      setIntent(data.message)
    })
    .catch((error) => {
      console.error('Error',error);
    })
  }, [loading]);
  
    return (
      <>
      <SEO title="Would you like a mug?"/>
      <Layout>
        <Header/>
        <div>
          <img width ="255" src ="https://images.printify.com/mockup/601ee67435b5ea595a48dd7f/70768/6906/enamel-campfire-mug.jpg?s=2048&t=1612638194000" alt ="The official CelotehBahsa.com mug"/>
        </div>
        <h2>Official CelotehBahasa® Enamel Campfire Mug</h2>
          <p>
          Get your hands on this durable enamel mug that holds 12 ounces of your favorite beverage. Add a personalized touch to your hipster moment with full-color printing of a photo, logo or design. Great for indoors and outdoors activities as it can keep up with the dirt and grunge of campsites. This sturdy and stylish cup is perfect for coffee, tea or even your morning cereal in the wild.
          .: 12oz (0.35 l)
          .: Lightweight stainless steel
          .: Rounded corners
          .: C-handle
          </p>
          <button>Buy!</button>
          <footer>
            © {new Date().getFullYear()}, CelotehBahasa.com
          </footer>
      </Layout>
      </>
    )
  }

  export default BuyPage
