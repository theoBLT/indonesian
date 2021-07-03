import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function Template({ data }) {
  const { mdx } = data
  const { frontmatter, body, excerpt } = mdx

  return (
    <>
      <SEO title={frontmatter.title} description={excerpt} />
      <Layout>
        <Header short="true" />
        <div className="article">
          <Link to="/">
            <h2 classname="backarrow">←</h2>
          </Link>
          <h1>{frontmatter.title}</h1>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
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
