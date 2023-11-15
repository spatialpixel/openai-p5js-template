# OpenAI + P5.js template by SpatialPixel

This is just a simple template to incorporate OpenAI's Node.js SDK into a P5.js sketch.

## Requirements

This template requires a recent version of Node.js, recommended version 16 or later.

Clone the repository with git...

    git clone https://github.com/spatialpixel/openai-p5js-template.git

...or [download the code from the repository](https://github.com/spatialpixel/openai-p5js-template) as a zip file.

Then install the libraries:

    cd openai-p5js-template
    npm install

## Start the dev environment

This template uses [Vite](https://vitejs.dev/) as a local development server. Start it with the following:

    npm run dev

By default, this starts a local server at http://localhost:5173/. Just copy/paste this URL into
a browser window to view the app. This will automatically update when you save changes to your code (that is,
no manual refresh required!).

## OpenAI API Key

Remember to provide your OpenAI API key into `sketch.js`. Note that this is configured
for local development only, and this code should not be used on a production server.
