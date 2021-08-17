const escapeStringRegexp = require("escape-string-regexp")
const indexName = `Words`
const wordsQuery = `{
  allAirtable(filter: {table: {eq: "words"}}) {
    edges {
      node {
        data {
          slug
          translation
          word
          type
          example
        }
        objectID: recordId
      }
    }
  }
}
  `
  function wordToAlgoliaRecord({ node: { objectID, data} }) {
    return {
      objectID,
      ...data,
    }
  }
const queries = [
  {
    query: wordsQuery,
    transformer: ({ data }) => data.allAirtable.edges.map(wordToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
module.exports = queries