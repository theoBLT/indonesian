import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Session from "../components/session"

export default ({ data }) => {
 
    return (
      <Layout>
        <Header 
          headerText="Selamat datang!"
          headerTranslation="Welcome!"/>

        <div className="container">
          {/* loop over the sessions _*/}
 
         {data.allAirtable.nodes.map((session, index) => (
            
          // <div key ={index} className="session">
           <Session
            key = {index}
            sessionNumber = {session.data.number}
            sessionDate = {session.data.date}
            sessionWords = {session.data.words}
           />  
          // </div>
        ))}
              <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
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
