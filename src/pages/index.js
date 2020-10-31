import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Session from "../components/session"
import SEO from "../components/seo"

export default ({ data }) => {
 
    return (
      <>
      <SEO></SEO>
      <Layout>
      <div className="container">
        <Header/>

         {data.allAirtable.nodes.map((session, index) => (
           <Session
            key = {index}
            sessionNumber = {session.data.number}
            sessionDate = {session.data.date}
            sessionWords = {session.data.words}
            sessionIntro = {session.data.intro.childMdx.body}
           />  
        ))}
          <footer>
            © {new Date().getFullYear()}, CelotehBahasa.com
          </footer>
        </div>
      </Layout>
      </>
    )
  }

export const query =graphql`
query getWordsBySession {
  allAirtable(filter: {data: {number: {ne: null}}}, sort: {order: DESC, fields: data___number}) {
    nodes {
      data {
        date(fromNow: true)
        number
        words {
          data {
            word
            translation
            type
          }
        }
        intro {
          id
          childMdx {
            body
          }
        }
      }
    }
  }
}
`
