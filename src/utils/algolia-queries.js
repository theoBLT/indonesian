const escapeStringRegexp = require("escape-string-regexp")
const indexName = `Words`
const wordsQuery = `{
    allAirtable {
      edges {
        node {
          data {
            slug
            translation
            word
            type
          }
          recordId
        }
      }
    }
  }
  `
function pageToAlgoliaRecord({ node: { recordId, data} }) {
  return {
    objectID: recordId,
    ...data,
  }
}
const queries = [
  {
    query: wordsQuery,
    transformer: ({ data }) => data.allAirtable.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
module.exports = queries