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
      <h1>{frontmatter.title}</h1>
      <div>Author: {frontmatter.author}</div>
      <div
        dangerouslySetInnerHTML={{ __html: html}}
        />
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
