import React from "react"
import { graphql} from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Concepts from "../components/concepts"
import Session from "../components/session"
import WordOfTheDay from "../components/wordoftheday"
import SEO from "../components/seo"
import Footer from "../components/footer"

export default ({ data }) => {
  return (
    <>
      <SEO />
      <Header />
      <Layout>
       
        <div class ="grid-row">
        <Concepts title="From the blog" />
        <WordOfTheDay 
          word="Kepepet"
          translation="desperate"
          type="adjective"
          example="Ngak ada figuran yang pacaran figuran lain. Kecuali kepepet!"
          />
        </div>


        <h1>Learning in progress</h1>
        {data.allAirtable.nodes.map((session, index) => (
          <Session
            key={index}
            sessionNumber={session.data.number}
            sessionDate={session.data.date}
            sessionWords={session.data.words}
            sessionIntro={session.data.intro.childMdx.body}
          />
        ))}
        <Footer />
      </Layout>
    </>
  )
}

export const query = graphql`
  query getWordsBySession {
    allAirtable(
      filter: { data: { number: { ne: null } } }
      sort: { order: DESC, fields: data___number }
    ) {
      nodes {
        data {
          date(fromNow: true)
          number
          words {
            data {
              word
              translation
              type
              example
              context
              slug
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
