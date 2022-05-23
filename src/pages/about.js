import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import Footer from "../components/footer"

export default () => {
  return (
    <>
      <SEO title="My journey learning Indonesian" />
      <Header />
      <Layout>
        <div id="intro">
          <div id="avatar">
            <img
              src="https://pbs.twimg.com/profile_images/1322835228197556224/jJwEyHUX_400x400.png"
              alt="A picture of Théo Blochet"
            />
          </div>

          <div id="welcome_text">
            <p className="subtitle">
              Hi, and welcome to Celoteh Bahasa! I'm{" "}
              <a href="https://www.twitter.com/theoblochet">Théo</a>. I've been
              learning Indonesian since 2019 (see{" "}
              <Link to="/celoteh/tentang/kenapa">why</Link>), and recap the
              "Bahasa gaul" words that I learn in this small dictionary.{" "}
            </p>
            <p className="subtitle">
              <a href="https://www.twitter.com/theoblochet">Hit me up</a> on
              Twitter if this helped in any way, or if you have any feedback or
              ideas for the site!
            </p>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  )
}
