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
      <Layout>
        <Header />
        <div id="intro">
        <div id="avatar">
          <img
            src="https://pbs.twimg.com/profile_images/1322835228197556224/jJwEyHUX_400x400.png"
            alt="A portrait of Théo Blochet"
          />
        </div>

        <div id="welcome_text">
          <p className="subtitle">
            Hi, and welcome to my site! I'm{" "}
            <a href="https://www.twitter.com/theoblochet">Théo</a>. My goal is
            to speak Indonesian fluently by the end of 2021 (see{" "}
            <Link to="/celoteh/tentang/kenapa">why</Link>). I study the language
            for 3 hours a week with my teacher Viona and recap what I learn
            here.
          </p>
        </div>
      </div> 
        <Footer />
      </Layout>
    </>
  )
}


