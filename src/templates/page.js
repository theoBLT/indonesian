import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"

export default function Template({data}){
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <>
    <SEO/>
    <Layout>
    <Header/>
      <div className="article">
      <div
        dangerouslySetInnerHTML={{ __html: html}}
        />
      </div>
    </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: {path: { eq: $path }}){
      html
      frontmatter {
        path
        title
        author
        date
      }
    }
  }
`
