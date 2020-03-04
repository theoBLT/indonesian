<h1 align="center">
  Indonesian word display
</h1>

This site is just a repository of Indonesian words, pulled from Airtable, displayed on a static site, built with GatsbyJS, and deployed with Netlify. 

Find it in the wild at [https://lucid-curie-27eb3e.netlify.com](https://lucid-curie-27eb3e.netlify.com)

## Setup

### Airtable
The data that runs this site is hosted on Airtable. If you want to replicate it, you will need to point GatsbyJS to your own base, containing the following 2 tables, with the same case-sensitive column names.

![Words table setup](https://github.com/theoBLT/indonesian/blob/master/README_images/words_table_setup.png)

The words table includes the word, its translation, a type, an example (currently unused), and a link to the class/session during which I first studied this word. 

![Sessions table setup](https://github.com/theoBLT/indonesian/blob/master/README_images/sessions_table_setup.png)

The sessions table is much more straightforward: each session has a number, a date, and the list of words it relates to. 

### Gatsby
Download and install all of the dependencies for this project. 

Then, you'll want to make 2 changes to make this your own: 

*Environment variables* 
You'll want to create 2 new files inside your root folder: 
* `.env.development`
* `.env.production`

In each file, you'll want to store your Airtable API key.

``` javascript
AIRTABLE_API_KEY=key12345678901234
```

You'll also want to replace the Base IDs within the setup of the `gatsby-source-airtable` plugin, inside the `gatsby-config.js`file.

After this, you should be all set to get the build to work, and modify it to your liking. 


[![Netlify Status](https://api.netlify.com/api/v1/badges/c21155b7-2c84-45c3-8f48-aa305d45801e/deploy-status)](https://app.netlify.com/sites/lucid-curie-27eb3e/deploys)