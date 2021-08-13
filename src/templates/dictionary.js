import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { Link } from "gatsby"

export default function Template({ data }) {

  return (
    <>
      <SEO title={data.airtable.data.word}/>
      <Layout>
        <Header short="true" />
        <div className="article">
          <Link to="/">
            <h2 className="backarrow">←</h2>
          </Link>
          <h1>{data.airtable.data.word}</h1>
          {data.airtable.data.type}, {data.airtable.data.translation}
          <blockquote>{data.airtable.data.example}</blockquote>
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
