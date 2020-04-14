import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Session from "../components/session"

export default ({ data }) => {
 
    return (
      <Layout>
        <Header 
          text="Selamat datang!"
          translation="Welcome!"/>

        <div className="container">
 
         {data.allAirtable.nodes.map((session, index) => (
           <Session
            key = {index}
            sessionNumber = {session.data.number}
            sessionDate = {session.data.date}
            sessionWords = {session.data.words}
           />  
        ))}
          <footer>
            © {new Date().getFullYear()}, CelotehBahasa.com
          </footer>
        </div>
      </Layout>
    )
  }

export const query =graphql`
query getWordsBySession {
  allAirtable(filter: {data: {number: {ne: null}}}, sort: {order: DESC, fields: data___number}) {
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
