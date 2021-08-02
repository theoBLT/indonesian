[![Netlify Status](https://api.netlify.com/api/v1/badges/c21155b7-2c84-45c3-8f48-aa305d45801e/deploy-status)](https://app.netlify.com/sites/lucid-curie-27eb3e/deploys)

<h1 align="center">
 CelotehBahasa.com
</h1>

This site is the place where I display the words I learn in Indonesian.
Live version is at [celotehbahsa.com](https://celotehbahsa.com).

### To run your own version: 
* Clone the repository locally, initalize git (`git init`)
* Add an `.env.development` file, with at least an `AIRTABLE_API_KEY` value
* Install all dependencies (`npm install`)
* Run the local server (`gatsby develop`)

### Next updates I plan to make

*Words SEO*
I'd like to make one page per word, or one page per expression I learn, and SEO them. This way the site could have a chance to hit Google search results for the relatively obscure words I learn, making it ~more~ useful to people. 

*JSX Explainers* 
Using JSX, I'd like to help deconstruct some common sentences in Indonesian. Then, growing from there, I'd like to use that same syntax highlighting work to help people make sense of entire YouTube transcripts or Blogs. That way you'd come to this site to read interesting content pulled from elsewhere, with a layer of understanding added for second language learners. 



Note to self: I was forced to set an environment variable of `NODE_VERSION=12` in order to deploy to Netlify with Gatsby 3 ( https://stackoverflow.com/questions/66880068/gatsby-3-x-netlify ): will have to be removed eventually as node versions need to move on.
