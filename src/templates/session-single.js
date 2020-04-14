import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    console.log(data)
    return (
      <Layout>
        <div>
          <h1>Session {$slug}</h1>
        </div>
      </Layout>
    )
  }
  export const query = graphql`
  query ($slug: Int!) {
    allAirtable(filter: {data: {number: {eq: $slug }}}) {
      nodes {
        data {
          date(formatString: "MMMM DD, YYYY")
          number
          words {
            data {
              word
              translation
              type
            }
          }
        }
      }
    }
  }
  `