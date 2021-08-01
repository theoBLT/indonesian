[![Netlify Status](https://api.netlify.com/api/v1/badges/c21155b7-2c84-45c3-8f48-aa305d45801e/deploy-status)](https://app.netlify.com/sites/lucid-curie-27eb3e/deploys)

<h1 align="center">
 CelotehBahasa.com
</h1>

This site is the place where I display the words I learn in Indonesian.
Check it out at [celotehbahsa.com](https://celotehbahsa.com).

To run your own version: 
* Clone the repository locally, initalize git (`git init`)
* Add an `.env.development` file, with at least an `AIRTABLE_API_KEY` value
* Install all dependencies (`npm install`)
* Run the local server (`gatsby develop`)

Note to self: I was forced to set an environment variable of `NODE_VERSION=12` in order to deploy to Netlify with Gatsby 3 ( https://stackoverflow.com/questions/66880068/gatsby-3-x-netlify ): will have to be removed eventually as node versions need to move on.
