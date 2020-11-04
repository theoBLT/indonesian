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
        name:`posts`,
        path: `${__dirname}/src/markdown`
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
            mapping:{
              'intro': `text/markdown`
            },
            separateMapType: true
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
    `gatsby-transformer-remark`,
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
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CelotehBahasa`,
        short_name: `CelotehBahasa`,
        start_url: `/`,
        icon:`src/images/gatsby-icon.svg`
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-8E26NKKHYW"
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },
  ],
}
