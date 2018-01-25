# ReliefWeb Lite

[![Greenkeeper badge](https://badges.greenkeeper.io/UN-OCHA/rwint-lite.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/UN-OCHA/rwint-lite.svg?branch=master)](https://travis-ci.org/UN-OCHA/rwint-lite)

New version of the ReliefWeb mobile site built [React](https://facebook.github.io/react/) and [Next.js](https://github.com/zeit/next.js).

## Getting started

Clone the repo: `git clone git@github.com:UN-OCHA/rwint-lite.git`

Go to the folder: `cd rwint-lite`

Install: `npm install`

## Running in dev mode

`npm run dev`

## Running in production mode

```
npm run build
npm start
```

Note: Logging causes an error when running the production build locally, to avoid this, in server.js comment out `server.use(accessLogger)` on line 37.

## Unit tests

Unit tests use [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/)

`npm test`

To run a single test suite

`npm test -- <path-to-test>`

## Linting

https://standardjs.com/

`npm run lint`

## pa11y

[pa11y-ci](https://github.com/pa11y/ci) is used for automated accessibility testing.

To run locally:

`npm run test:pa11y`

Add new pages to test to .pa11yci


## Using the docker image

Get the docker image (latest dev branch is being pulled in the example below)

`docker pull unocha/rwint-lite:dev`

To view it on host port 3000

`docker run -d -p 3000:3000 unocha/rwint-lite:dev`
