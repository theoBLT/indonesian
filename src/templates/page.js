import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { Link } from "gatsby"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <>
      <SEO title={frontmatter.title} description={excerpt} />
      <Layout>
        <Header short="true" />
        <div className="article">
          <Link to="/">Go back</Link>
          <h3>{frontmatter.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Link to="/">Go back</Link>
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
      }
      excerpt
    }
  }
`
