import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Concepts from "../components/concepts"
import Session from "../components/session"
import WordOfTheDay from "../components/wordoftheday"
import Seo from "../components/seo"
import Footer from "../components/footer"
import Word from "../components/word"

const Index = ({ data }) => {
  return (
    <>
      <Seo />
      <Header />
      <Layout>
        <div id="intro" className="row">
          <div id="avatar">
            <Link to="/about">
              <img
                src="https://pbs.twimg.com/profile_images/1322835228197556224/jJwEyHUX_400x400.png"
                alt="Théo Blochet, the website's author"
              />
            </Link>
          </div>
          <p className="subtitle">
            Welcome to Celoteh Bahasa, an unapologetically incomplete guide to
            colloquial Indonesian, with {data.totalWords.totalCount} words and
            counting ! Dive in and learn with me. Thanks for stopping by!
          </p>
        </div>
        <div className="row">
          <h1>Some recent favorites</h1>

          <div className="wordsList">
            <Word word="Letoy" slug="letoy" />
            <Word word="Pede" slug="pede" />
            <Word word="SBB" slug="sbb" />
            <Word word="Santuy" slug="santuy" />
            <Word word="Intinya" slug="intinya" />
            <Word word="TBL" slug="tbl" />
            <Word word="Baper" slug="baper" />
          </div>
        </div>
        <div className="grid-row">
          <Concepts title="From the blog" />
          <WordOfTheDay
            word="Kepepet"
            translation="desperate"
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

export default Index

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
    totalWords: allAirtable {
      totalCount
    }
  }
`
