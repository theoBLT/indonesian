import React from "react"
import { Link } from "gatsby"
import algoliasearch from 'algoliasearch/lite';
import Searchhit from "../components/searchhit"
import { InstantSearch, SearchBox, Hits, connectStateResults } from 'react-instantsearch-dom';

const searchClient = algoliasearch('KNGW4E76GQ', '303d6ed1f7af0462583d12f07a871e04');

const Results = connectStateResults(({ searchState, searchResults, children }) => (
  // If there is a state and a query
  searchState && searchState.query ? ( 

  // If that query returned zero results
    searchResults && searchResults.nbHits === 0 ? 
    <div className="no-results">
      There are no results for <span className="example-highlight">{searchState.query}</span>, would you like to <a href={`https://translate.google.com/?sl=id&tl=en&text=`+searchState.query+`&op=translate`}>Google translate it</a>, or <a target="_blank" href={`https://airtable.com/shrV656H340zjGWi4?prefill_word=`+searchState.query}>add this word?</a>
      </div> 
      : children) 
  
  // Then, if there is a query, results, but no result returned
  : (
     null
    // <div className="font-size--small"><i>Learners before you searched for <Link to="kepepet">kepepet</Link>, <Link to="gokil">gokil</Link> or <Link to="gelar-tikar">gelar tikar</Link>.</i> To add a word, <a href="https://airtable.com/shrV656H340zjGWi4" target="_blank"> head here.</a></div>
  ) 
));


function HeaderTemplate() {
  return (
    <InstantSearch 
          searchClient={searchClient} 
          indexName="Words"
          >
    <div className="header">
      <Link to="/">
        CB.
      </Link>


          <SearchBox 
          translations={{
            placeholder: 'Search any word...',
          }}/>

      <div className="menubar">
        <Link to="about">About</Link>
      </div>
    </div>
    <div className="container">
    <Results>
            <Hits hitComponent={Searchhit}/>
    </Results>
    </div>
    </InstantSearch>
  
  )
}

export default HeaderTemplate
