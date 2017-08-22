import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    const { html } = this.props

    return (
      <html lang='en'>
        <Head>
          <script src='https://cdn.polyfill.io/v2/polyfill.min.js?features=Object.assign' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
