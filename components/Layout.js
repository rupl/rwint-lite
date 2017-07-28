import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

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
    <Header home={props.home} />
    <main id='main' role='main'>
      {props.children}
    </main>
    <Footer />
    <style jsx global>{`
      body { font-family: sans-serif }
    `}</style>
  </div>
)

export default Layout
