const blue = '#07719B'
const red = '#F65C51'
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
    dark: '#555',
    headerFooter: purple,
    headerFooterHighlight: '#495986',
    primaryButton: blue
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
    highlight: blue,
    header: purple,
    globalHeader: 'white',
    primaryButton: 'white'
  }
})

const fonts = ({
  body: 'sans-serif',
  heading: 'Georgia, serif'
})

const fontSizes = ({
  tiny: '0.75rem', // 12px
  small: '0.875rem', // 14px
  base: '1rem', // 16px
  medium: '1.5rem', // 24px
  large: '2rem' // 32px
})

const measurements = ({
  baseUnit: 0.5, // Use with em. 8px
  containerMaxWidth: '75em', // 1200px
  maxWidth: '87.5em' // 1400px
})

export { breakpoints, colors, fonts, fontSizes, measurements }
