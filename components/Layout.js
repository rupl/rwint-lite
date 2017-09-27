import Head from 'next/head'
import Header from './header/Header'
import Footer from './Footer'
import NewRelic from './NewRelic'
import { fontSizes } from '../theme/variables'
import base from '../theme/base'

const pageTitle = (home, title) => {
  const siteTitle = 'ReliefWeb Mobile'
  return (home || !title) ? siteTitle : `${title} | ${siteTitle}`
}

const dev = process.env.NODE_ENV !== 'production'

const Layout = (props) => (
  <div>
    <Head>
      <title>{pageTitle(props.home, props.title)}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
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
    <div className='page-wrapper'>
      <a href='#main' className='skip-link'>Skip to content</a>
      <Header home={props.home} query={props.query} />
      <div id='main' role='main' className='container'>
        {props.children}
      </div>
    </div>
    <Footer />
    <style jsx global>{base}</style>
    <style jsx>{`
      .skip-link {
        position: absolute;
        left: -99999px;
        font-size: ${fontSizes.tiny};
      }
      .skip-link:focus {
        left: 0;
        top: 0;
      }
    `}</style>
  </div>
)

export default Layout
