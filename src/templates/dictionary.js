import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { Link } from "gatsby"

export default function Template({ data }) {
const {word, type, translation, example} = data.airtable.data

  return (
    <>
      <SEO title={word}/>
      <Layout>
        <Header short="true" />
        <div className="dictionary-definition">
          <Link to="/">
            <h2 className="backarrow">←</h2>
          </Link>
          <h1>{word}</h1>
          <span className="dictionary-translation">{translation}</span> {" • "}
          <span className="small-subtitle">{type}</span>
          <blockquote>{example}</blockquote>
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
query ($record_id: String!) {
  airtable(recordId: {eq: $record_id}) {
    id
    data {
      word
      type
      translation
      session
      example
    }
    recordId
  }
}
`
