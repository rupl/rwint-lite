import Head from 'next/head'
import Router from 'next/router'
import Header from './header/Header'
import Footer from './Footer'
import NewRelic from './NewRelic'
import { GTMInit, GTMIframe } from './gtm'
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
  let resetFocusItem = document.getElementsByTagName('h1')[0]
  if (resetFocusItem) {
    resetFocusItem.setAttribute('tabindex', '-1')
    resetFocusItem.style.outline = 'none'
    resetFocusItem.focus()
  }
}

Router.onAppUpdated = function (nextRoute) {
  window.location.href = nextRoute
}

const dev = process.env.NODE_ENV !== 'production'
const oldBrowserMessage = `<!--[if lt IE 9]><div style="padding: 8px; text-align:center;">
  You are using an <strong>outdated</strong> browser.
  Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.
  <br><br>You can access the main ReliefWeb site at <a href="https://reliefweb.int/">https://reliefweb.int/</a>
  </div><![endif]-->`
const ie9styles = `<!--[if lte IE 9]><link rel="stylesheet" type="text/css" href="/static/ie9.css" /><![endif]-->`

const Layout = (props) => (
  <div>
    <Head>
      <title>{pageTitle(props.home, props.title)}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      {props.home &&
        <meta name='description' content='The latest humanitarian news, jobs, training, crises and disasters on your mobile or on slow connections.' />
      }
      {props.keywords &&
        <meta name='news_keywords' content={props.keywords} />
      }
      <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-touch-icon.png' />
      <link rel='mask-icon' href='/static/safari-pinned-tab.svg' color='#5c6fa6' />
      <link rel='shortcut icon' href='/static/favicon.ico' />
      <link rel='manifest' href='/static/manifest.json' crossOrigin='use-credentials' />
      <meta name='msapplication-config' content='/static/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='robots' content='noindex, nofollow' />

      <link rel='canonical' href={props.url || 'https://reliefweb.int/'} />
      {!dev &&
        <NewRelic />
      }
      {!dev &&
        <GTMInit />
      }
    </Head>
    {!dev &&
      <GTMIframe />
    }
    <div dangerouslySetInnerHTML={{__html: oldBrowserMessage}} />
    <div aria-live='assertive' className='sr-only'>View updated: {props.title}</div>
    <div className='pw'>
      <a href='#main' className='sl'>Skip to content</a>
      <Header home={props.home} query={props.query} />
      <div id='main' role='main' className='container'>
        {props.children}
      </div>
    </div>
    <Footer />
    <div id='loader'>
      <div className='loader-container'>
        <div className='inner' />
      </div>
    </div>
    <div dangerouslySetInnerHTML={{__html: ie9styles}} />
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
        word-wrap: break-word;
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
      .menu-underlay {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 98;
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
        left: 0;
      }
      .loader-container {
        max-width: 87.5em;
        margin: 0 auto;
        width: 100%;
        height: 2px;
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
        background: white;
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
