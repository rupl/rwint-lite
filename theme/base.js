import { breakpoints, colors, fonts, fontSizes, measurements } from './variables'

const base = `
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  *:before, *:after {
     box-sizing: border-box;
  }
  html, body, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 100%;
    background: ${colors.bg.body};
  }
  body {
    font-family: ${fonts.body};
    font-size: ${fontSizes.base};
    color: ${colors.text.body};
    background: ${colors.bg.content};
    max-width: ${measurements.maxWidth};
    margin: 0 auto;
  }
  .container {
    padding: 0 ${measurements.baseUnit}em;
    margin: 0 auto;
    max-width: ${measurements.containerMaxWidth};
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
    font-family: ${fonts.heading};
  }
  a {
    color: ${colors.link.default};
  }
  a:hover, a:active {
    color: ${colors.link.hover};
  }
  a:focus {
    background: ${colors.link.focusBg};
    color: ${colors.link.focus};
    outline: 3px solid ${colors.link.focusBg};
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
  @media (min-width: ${breakpoints.md}) {
    html {
      padding: 0 ${measurements.baseUnit}em;
    }
  }
  @media (min-width: ${breakpoints.xl}) {
    .container {
      padding: 0 ${measurements.baseUnit * 5}em;
    }
  }
`

export default base
