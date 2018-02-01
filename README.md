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

Note: the service worker isn't enabled in dev mode, if you've previously run in production mode you'll need to remove it in your browser (in Chrome: dev tools > application > clear storage).

## Running in production mode

```
npm run build
npm start
```

Note: Logging causes an error when running the production build locally, to avoid this, in server.js comment out `server.use(accessLogger)` on line 37.

## Using the docker image

Get the docker image (latest dev branch is being pulled in the example below)

`docker pull unocha/rwint-lite:dev`

To view it on host port 3000

`docker run -d -p 3000:3000 unocha/rwint-lite:dev`

## Deployment

See https://github.com/UN-OCHA/rwint-lite-stack

## Unit tests

Unit tests use [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/).

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

## Travis CI

Unit tests, linting and pa11y run on [Travis CI](https://travis-ci.org/UN-OCHA/rwint-lite) on pushed branches and pull requests.

## Greenkeeper

[Greenkeeper](https://greenkeeper.io/) is used to monitor and update npm dependencies.

## Project info

### Server-side rendering

An Express server is used to provide server-side rendering. This is setup, and routes defined in, [server.js](server.js). See the [Next custom server docs](https://github.com/zeit/next.js#custom-server-and-routing) for more info.

### Static files

Static files such as images and manifest.json must be put in the [/static](/static) folder.

### Service Worker

A service worker is used for some caching and a custom offline page, see [/offline/serviceWorker.js](/offline/serviceWorker.js).

### Redux

[Redux](https://redux.js.org/docs/introduction/) is used as a data store for the app.

### Styling

[Styled-jsx](https://github.com/zeit/styled-jsx) is used for styling. The majority of styles are in the components, variables and some re-useable styles are in [/theme](/theme).
