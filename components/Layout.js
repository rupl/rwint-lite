import Head from 'next/head'
import Header from './header/Header'
import Footer from './Footer'
import { base, fontSizes } from '../theme/theme'

const pageTitle = (home, title) => {
  const siteTitle = 'ReliefWeb Mobile'
  return (home || !title) ? siteTitle : `${title} | ${siteTitle}`
}

const Layout = (props) => (
  <div>
    <Head>
      <title>{pageTitle(props.home, props.title)}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='manifest' href='/static/manifest.json' />
    </Head>
    <div className='page-wrapper'>
      <a href='#main' className='skip-link'>Skip to content</a>
      <Header home={props.home} />
      <main id='main' role='main' className='container'>
        {props.children}
      </main>
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
