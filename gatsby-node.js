const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter}) => {
    const {createPage} = actions 
    const pageTemplate = path.resolve(`src/templates/page.js`)
    const result = await graphql(`
    query {
        allMarkdownRemark(filter: {frontmatter: {path: {regex: "/celoteh?/"}}}) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `)
    console.log(JSON.stringify(result, null, 4));
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query`)
        
    return
    }

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
            path: node.frontmatter.path,
            component: pageTemplate,
            context: {}
        })
    })
}