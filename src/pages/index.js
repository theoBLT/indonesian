import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import Concepts from "../components/concepts"
import Session from "../components/session"
import Searchhit from "../components/searchhit"
import WordOfTheDay from "../components/wordoftheday"
import SEO from "../components/seo"
import Footer from "../components/footer"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults } from 'react-instantsearch-dom';

const searchClient = algoliasearch('KNGW4E76GQ', '303d6ed1f7af0462583d12f07a871e04');

const Results = connectStateResults(({ searchState, searchResults, children }) => (
  // If there is a state and a query
  searchState && searchState.query ? ( 

  // If that query returned zero results
    searchResults && searchResults.nbHits === 0 ? 
    <div className="no-results">
      There are no results for {searchState.query}, would you like to <a href={`https://translate.google.com/?sl=id&tl=en&text=`+searchState.query+`&op=translate`}>Google translate it</a>, or <a target="_blank" href={`https://airtable.com/shrV656H340zjGWi4?prefill_word=`+searchState.query}>add this word?</a>
      </div> 
      : children) 
  
  // Then, if there is a query, results, but no result returned
  : (
    <div className="font-size--small"><i>Learners before you searched for <Link to="kepepet">kepepet</Link>, <Link to="gokil">gokil</Link> or <Link to="gelar-tikar">gelar tikar</Link>.</i> To add a word, <a href="https://airtable.com/shrV656H340zjGWi4" target="_blank"> head here.</a></div>
  ) 
));

export default ({ data }) => {
  return (
    <>
      <SEO />
      <Layout>
        <Header />

        <InstantSearch 
          searchClient={searchClient} 
          indexName="Words"
          >

          <SearchBox 
          translations={{
            placeholder: 'Search for any word...',
          }}/>

          <Results>
            <Hits hitComponent={Searchhit}/>
          </Results>
        </InstantSearch>
       
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
