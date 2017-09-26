import Document, { Head, Main, NextScript } from 'next/document'

const polyfill = () => {
  // https://cdn.polyfill.io/v2/polyfill.min.js?features=Object.assign|always
  let data = `(function(undefined) {Object.assign=function(r,t){for(var n,e,o=1;o<arguments.length;++o){e=arguments[o];for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])}return r};}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});`
  return {__html: data}
}

export default class MyDocument extends Document {
  render () {
    const { html } = this.props
    const dev = process.env.NODE_ENV !== 'production'

    return (
      <html lang='en'>
        <Head>
          <script dangerouslySetInnerHTML={polyfill()} />
        </Head>
        <body>
          <Main />
          <NextScript />
          {!dev &&
            <script src='/static/companion.js' data-service-worker='/sw.js' />
          }
        </body>
      </html>
    )
  }
}
