import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

function Concepts() {
  const data = useStaticQuery(graphql`
    query GetArticles {
      allMarkdownRemark(
        filter: { frontmatter: { article_type: { eq: "article" } } }
      ) {
        nodes {
          frontmatter {
            title
            path
          }
        }
      }
    }
  `)
  return (
    <>
      <h3>Some recent tips</h3>
      <ul>
        {data.allMarkdownRemark.nodes.map((node, i) => (
          <li>
            <Link key={i} to={node.frontmatter.path}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Concepts
