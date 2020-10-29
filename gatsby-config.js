require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Celotehbahsa.com`,
    description: `My journey learning Indonesian language.`,
    author: `@theoblochet`,
  },
  plugins: [
    {
      resolve:`gatsby-source-filesystem`,
      options: {
        name:`pages`,
        path: `${__dirname}/src/pages`
      },
    },
    {
      resolve:`gatsby-source-filesystem`,
      options: {
        name:`posts`,
        path: `${__dirname}/src/posts`
      },
    },
    {
      resolve:`gatsby-source-filesystem`,
      options: {
        name:`images`,
        path: `${__dirname}/src/images`
      },
    },
    {
      resolve:`gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: `appGmWAihDWDGn2kP`,
            tableName: `words`,
            // createSeparateNodeType: true,
          },
          {
            baseId: `appGmWAihDWDGn2kP`,
            tableName: `sessions`,
            tableLinks: [`words`],
            // createSeparateNodeType: true,
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Work Sans`
        ],
        display: 'swap'
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options:{
        extensions: [`.md`,`.mdx`],
        gatsbyRemarkPlugins: [ 
          {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth:1200,
          },
        },
      ],
      }
    }
  ],
}
