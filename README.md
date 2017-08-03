# ReliefWeb Mobile v2

[![Build Status](https://travis-ci.org/UN-OCHA/rw-mobile2.svg?branch=master)](https://travis-ci.org/UN-OCHA/rw-mobile2)

New version of the ReliefWeb mobile site built using [React](https://facebook.github.io/react/) and [Next.js](https://github.com/zeit/next.js).

## Running in dev mode

`npm run dev`

## Running in production mode

```
npm run build
npm run start
```

## Unit tests

Unit tests use [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/)

`npm test`

To run a single test suite

`npm test -- <path-to-test>`

## Linting

https://standardjs.com/

`npm run lint`

## Using the docker image

Get the docker image (latest dev branch is being pulled in the example below)

`docker pull unocha/rw-mobile:dev`

To view it on host port 3000

`docker run -d -p 3000:3000 unocha/rw-mobile:dev`