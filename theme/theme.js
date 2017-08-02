const blue = '#07719B'
const red = '#F4F4F0'
const purple = '#5C6FA6'

const breakpoints = ({
  sm: '36em', // 576px
  md: '48em', // 768px
  lg: '64.063em', // 1025px
  xl: '75em' // 1200px
})

const colors = ({
  bg: {
    body: '#F4F4F0',
    content: 'white',
    headerFooter: purple,
    headerFooterHighlight: '#495986'
  },
  border: {
    highlight: red,
    default: '#979797',
    light: '#F4F4F0'
  },
  link: {
    default: blue,
    hover: purple,
    focus: '#57699e',
    focusBg: '#F4F4F0'
  },
  text: {
    body: '#555',
    dark: '#333',
    light: '#767676',
    highlight: blue
  }
})

const fontSizes = ({
  tiny: '0.75rem', // 12px
  small: '0.875rem', // 14px
  base: '1rem', // 16px
  medium: '1.5rem', // 24px
  large: '2rem' // 32px
})

const measurements = ({
  baseUnit: 8,
  containerMaxWidth: '1200px',
  maxWidth: '1400px'
})

const base = `
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  *:before, *:after {
     box-sizing: border-box;
  }
  html, body, h1 {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 100%;
    background: ${colors.bg.body};
  }
  body {
    font-family: sans-serif;
    font-size: ${fontSizes.base};
    color: ${colors.text.body};
    background: ${colors.bg.content};
    max-width: ${measurements.maxWidth};
    margin: 0 auto;
  }
  .container {
    padding: 0 ${measurements.baseUnit}px;
    margin: 0 auto;
    max-width: ${measurements.containerMaxWidth};
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
      padding: 0 ${measurements.baseUnit}px;
    }
  }
  @media (min-width: ${breakpoints.xl}) {
    .container {
      padding: 0 ${measurements.baseUnit * 5}px;
    }
  }
`

export { base, breakpoints, colors, fontSizes, measurements }
