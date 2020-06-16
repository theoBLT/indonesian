require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve:`gatsby-source-filesystem`,
      options: {
        name:`images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve:`gatsby-source-filesystem`,
      options: {
        name:`posts`,
        path: `${__dirname}/src/posts`
      }
    },
    {
      resolve:`gatsby-source-filesystem`,
      options: {
        name:`images`,
        path: `${__dirname}/src/images`
      }
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
    `gatsby-plugin-sharp`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
