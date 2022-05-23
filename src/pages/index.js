import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Concepts from "../components/concepts"
import Session from "../components/session"
import WordOfTheDay from "../components/wordoftheday"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Word from "../components/word"

export default ({ data }) => {
  return (
    <>
      <SEO />
      <Header />
      <Layout>
        <div className="row">
          <p>
            Celoteh Bahasa is a complete dictionnary of “
            <span className="example-highlight">Bahasa Indonesia gaul</span>”
            (colloquial Indonesian) brought to you by a Bule learning the
            language. Hope this helps you understand the meaning of the words
            your coolest Jakartan friends use, whether at the bar or in chat
            messages!
          </p>
        </div>
        <div className="row">
          <h1>Some recent favorites</h1>

          <div className="wordsList">
            <Word word="Patungan" slug="patungan" />
            <Word word="Baper" slug="baper" />
            <Word word="SBB" slug="sbb" />
            <Word word="Santuy" slug="santuy" />
            <Word word="Mumpung" slug="mumpung" />
            <Word word="TBL" slug="tbl" />
            <Word word="Nyempil" slug="nyempil" />
          </div>
        </div>
        <div className="grid-row">
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
