import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Header />
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
