import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Definition from "../components/definition"
import SEO from "../components/seo"
import { Link } from "gatsby"

export default function Template({ data }) {
const {word, type, translation, example, extra_definitions, example_mapping, context} = data.airtable.data
  return (
    <>
      <SEO 
        title={`${word} — Definition of ${word} in Indonesian`}
        description={`Meaning of ${word} in Indonesian`}
        />
      <Layout>
        <Header short="true" />
        <div className="dictionary-definition">
          <Link to="/">
            <h2 className="backarrow">←</h2>
          </Link>
          <h1>{word}</h1>
          {/* If there's more than one definition, show a number */}
          {extra_definitions ? <h3>1.</h3> :''}
          <Definition 
          translation={translation}
          type={type}
          example={example}
          mapping={JSON.parse(example_mapping)}
          context={context}
          />
          {extra_definitions ? extra_definitions.map((record,index) => (
          <Definition 
          key={index}
          rank={index}
          translation={record.data.translation}
          type={record.data.type}
          example={record.data.example}
          />)):''}

        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
query ($record_id: String!) {
  airtable(recordId: {eq: $record_id}, table: {eq: "words"}) {
    id
    data {
      word
      type
      translation
      session
      example
      context
      example_mapping
      extra_definitions {
        data {
          translation
          example
          type
        }
      }
    }
    recordId
  }
}
`
