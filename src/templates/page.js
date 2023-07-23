import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function Template({ data }) {
  const { mdx } = data
  const { frontmatter, body, excerpt } = mdx

  return (
    <>
      <Seo title={frontmatter.title} description={excerpt} />
      <Header />
      <Layout>
        <div className="article">
          <div className="definition-title article-title">
            <Link to="/">
              <h2 className="backarrow">←</h2>
            </Link>
            <h1>{frontmatter.title}</h1>
          </div>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <span className="date">{frontmatter.date}</span>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        path
        title
        author
        date(locale: "en_US")
      }
      excerpt
    }
  }
`
