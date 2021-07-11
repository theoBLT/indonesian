import React from "react"
import Footer from "../components/footer"
import Layout from "../components/layout"
import Header from "../components/header"
import Concepts from "../components/concepts"
import SEO from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout>
    <Header short="true" />
    <SEO title="404: Not found" />
    <h3>This page doesn't exist</h3>
    <p>
      It must be my mistake for directing you to a missing page, I probably
      messed up in renaming a file or something.
    </p>
    <p>
      If you'd like, you can head{" "}
      <Link to="/">back to the site's homepage </Link>
      or check out recent articles:
    </p>
    <Concepts />

    <Footer />
  </Layout>
)

export default NotFoundPage
