import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Concepts from "../components/concepts"
import Session from "../components/session"
import Searchhit from "../components/searchhit"
import SEO from "../components/seo"
import Footer from "../components/footer"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults } from 'react-instantsearch-dom';

const searchClient = algoliasearch('KNGW4E76GQ', '303d6ed1f7af0462583d12f07a871e04');
const Results = connectStateResults(({ searchState, children }) =>
  searchState && searchState.query ? (
    children
  ) : (
    <div><i>Cool people previously searched for <Link to="kepepet">kepepet</Link>, <Link to="gokil">gokil</Link> or <Link to="gelar-tikar">Gelar tikar</Link></i></div>
  )
);

export default ({ data }) => {
  return (
    <>
      <SEO title="My journey learning Indonesian" />
      <Layout>
        <Header />
        
        <InstantSearch 
          searchClient={searchClient} 
          indexName="Words"
          >

          <SearchBox 
          translations={{
            placeholder: 'Type any word...',
          }}/>

          <Results>
            <Hits hitComponent={Searchhit}/>
          </Results>
        </InstantSearch>
        <Concepts title="Some recent tips" />

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
