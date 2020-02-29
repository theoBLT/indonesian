import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"

export default ({ data }) => {
 
    return (
      <Layout>
        <Header 
          headerText="Selamat datang!"
          headerTranslation="Welcome!"/>

        <div className="container">
          {/* loop over the sessions _*/}
         {data.allAirtable.nodes.map((session, index) => (

          <div key ={index} className="session">

          <h3>Session #{session.data.number}</h3>
          <span className ="date">{session.data.date}</span>

            {/* loop over the words _*/}
            <ul>
            {session.data.words.map((definition, i) =>
              <li key={i}>
                <span className="word">{definition.data.word}</span> <span className="type">({definition.data.type})</span> 
                <span className="translation">{definition.data.translation}</span>
              </li>
              )}
            </ul>
            
            
          </div>
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
