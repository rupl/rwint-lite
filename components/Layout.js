import Head from 'next/head'
import Router from 'next/router'
import Header from './header/Header'
import Footer from './Footer'
import NewRelic from './NewRelic'
import { breakpoints, colors, fonts, fontSizes, measurements } from '../theme/variables'

const pageTitle = (home, title) => {
  const siteTitle = 'ReliefWeb Lite'
  return (home || !title) ? siteTitle : `${title} | ${siteTitle}`
}

Router.onRouteChangeStart = () => {
  const $loader = document.getElementById('loader')
  $loader.classList.add('loading')
}

Router.onRouteChangeComplete = () => {
  const $loader = document.getElementById('loader')
  $loader.classList.remove('loading')
}

const dev = process.env.NODE_ENV !== 'production'

const Layout = (props) => (
  <div>
    <Head>
      <title>{pageTitle(props.home, props.title)}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-touch-icon.png' />
      <link rel='mask-icon' href='/static/safari-pinned-tab.svg' color='#5c6fa6' />
      <link rel='shortcut icon' href='/static/favicon.ico' />
      <link rel='manifest' href='/static/manifest.json' crossOrigin='use-credentials' />
      <meta name='msapplication-config' content='/static/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
      <link rel='canonical' href={props.url || 'https://reliefweb.int/'} />
      {!dev &&
        <NewRelic />
      }
    </Head>
    <div className='pw'>
      <a href='#main' className='sl'>Skip to content</a>
      <Header home={props.home} query={props.query} />
      <div id='main' role='main' className='container'>
        {props.children}
      </div>
    </div>
    <Footer />
    <div id='loader'><div className='inner' /></div>
    <style jsx global>{`
      * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
      }
      *:before, *:after {
         box-sizing: border-box;
      }
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
      }
      .container {
        padding: 0 ${measurements.baseUnit}em;
        margin: 0 auto;
        max-width: ${measurements.containerMaxWidth};
      }
      h1 {
        font-weight: normal;
        font-family: ${fonts.heading};
      }
      h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
      }
      p, ul, ol {
        line-height: 1.5;
      }
      a {
        color: ${colors.link.default};
        word-break: break-word;
      }
      a:focus {
        outline: thin dotted;
      }
      button {
        -webkit-appearance: none;
        font-size: 100%;
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
      @media (min-width: ${breakpoints.xl}) {
        .container {
          padding: 0 ${measurements.baseUnit * 5}em;
        }
      }
    `}</style>
    <style jsx>{`
      @keyframes loading {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }
      #loader {
        display: none;
        width: 100%;
        height: 2px;
        position: fixed;
        top: 0;
      }
      #loader.loading {
        display: block
      }
      #loader.loading .inner {
        background: ${colors.border.highlight};
        width: 0;
        height: 100%;
        animation: loading 2s infinite;
      }
      .sl {
        position: absolute;
        left: -99999px;
        font-size: ${fontSizes.tiny};
      }
      .sl:focus {
        left: 0;
        top: 0;
      }
      .pw {
        min-height: 400px;
      }
    `}</style>
  </div>
)

export default Layout
