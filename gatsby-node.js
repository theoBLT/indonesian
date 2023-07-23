const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`src/templates/page.js`)
  const dictionaryTemplate = path.resolve(`src/templates/dictionary.js`)
  const result = await graphql(`
  {
    allMdx(filter: {frontmatter: {path: {regex: "/celoteh?/"}}}) {
      edges {
        node {
          frontmatter {
            path
          }
        }
      }
    }
    allAirtable {
      edges {
        node {
          data {
            slug
          }
          recordId
        }
      }
    }
  }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query`)

    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: pageTemplate,
      context: {},
    })
  })

  result.data.allAirtable.edges.forEach(({ node }) => {
    if(node.data.slug) {
      createPage({
        path: node.data.slug,
        component: dictionaryTemplate,
        context: {
          record_id: node.recordId,
        },
      })
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type AirtableFieldtextmarkdown implements Node {
      id: ID!
      childMdx: Mdx
    }

    type Mdx {
      body: String
    }
  `;
  createTypes(typeDefs);
};
