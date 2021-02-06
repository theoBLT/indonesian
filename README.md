[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/theoBLT/indonesian)

<h1 align="center">
 CelotehBahasa.com
</h1>

This site is the place where I display the words I learn in Indonesian. 
Check it out at [celotehbahsa.com](https://celotehbahsa.com). 

## Setup

Want to make your own version of this site? Here's how it works.

### Airtable
The data that runs this site is hosted on Airtable. If you want to replicate it, you will need to point GatsbyJS to your own Airtable base, containing the following 2 tables, with the same case-sensitive column names.

![Words table setup](https://github.com/theoBLT/indonesian/blob/master/README_images/words_table_setup.png)

The `words` table includes the word, its translation, a type, an example (currently unused), and a link to the class/session during which I first studied this word. 

![Sessions table setup](https://github.com/theoBLT/indonesian/blob/master/README_images/sessions_table_setup.png)

The `sessions` table is straightforward: each session has a number, a date, and the list of words it relates to. An optional "learning" rich text field can also be added to include takeaways for the lesson. 

### Gatsby
Download and install all of the dependencies for this project. 

Then, you'll want to start with 2 changes to make this your own: 

*Environment variables* 
Create 2 new files inside your root folder: 
* `.env.development`
* `.env.production`

In each file, store your Airtable API key.

``` javascript
AIRTABLE_API_KEY=key12345678901234
```

You'll also want to replace the Base IDs within the setup of the `gatsby-source-airtable` plugin, inside the `gatsby-config.js`file. This is the plugin responsible for pulling data from AirTable at build time. 

After this, you should be all set to get the build to work, and modify it to your liking. 


[![Netlify Status](https://api.netlify.com/api/v1/badges/c21155b7-2c84-45c3-8f48-aa305d45801e/deploy-status)](https://app.netlify.com/sites/lucid-curie-27eb3e/deploys)