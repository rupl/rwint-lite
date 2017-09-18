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
      <link rel='manifest' href='/static/manifest.json' />
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
