import React from "react"
import { Link } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import Searchhit from "../components/searchhit"
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"

const searchClient = algoliasearch(
  "KNGW4E76GQ",
  "303d6ed1f7af0462583d12f07a871e04"
)

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    // If there is a state and a query
    searchState && searchState.query ? (
      // If that query returned zero results
      searchResults && searchResults.nbHits === 0 ? (
        <div className="no-results">
          There are no results for{" "}
          <span className="example-highlight">{searchState.query}</span>, would
          you like to{" "}
          <a
            href={
              `https://translate.google.com/?sl=id&tl=en&text=` +
              searchState.query +
              `&op=translate`
            }
          >
            Google translate it
          </a>
          , or{" "}
          <a
            target="_blank"
            href={
              `https://airtable.com/shrV656H340zjGWi4?prefill_word=` +
              searchState.query
            }
          >
            add this word?
          </a>
        </div>
      ) : (
        children
      )
    ) : // State when user hasn't typed anything
    null
)

function HeaderTemplate() {
  return (
    <InstantSearch searchClient={searchClient} indexName="Words">
      <div className="header">
        <Link to="/" className="test">
          {" "}
          CB.{" "}
        </Link>

        <div className="search-box">
          <SearchBox
            translations={{
              placeholder: "Search for any word...",
            }}
          />
          <a href={`https://airtable.com/shrV656H340zjGWi4`} id="add-word">
            <span class="short-button">+</span>
            <span class="long-button">Add a new definition</span>
          </a>
        </div>

        <div className="menubar">
          <Link to="about">About</Link>
        </div>
      </div>
      <div className="container">
        <Results>
          <Hits hitComponent={Searchhit} />
        </Results>
      </div>
    </InstantSearch>
  )
}

export default HeaderTemplate
