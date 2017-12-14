import Document, { Head, Main, NextScript } from 'next/document'
import { GTMInit, GTMIframe } from '../components//gtm'
import { breakpoints, colors, fonts, fontSizes, measurements } from '../theme/variables'

function polyfill () {
  // https://cdn.polyfill.io/v2/polyfill.min.js?features=Object.assign|always
  const data = `(function(undefined) {Object.assign=function(r,t){for(var n,e,o=1;o<arguments.length;++o){e=arguments[o];for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])}return r};}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});`
  return {__html: data}
}

export default class MyDocument extends Document {
  render () {
    const { html } = this.props

    return (
      <html lang='en'>
        <Head>
          <GTMInit />
          <script dangerouslySetInnerHTML={polyfill()} />
        </Head>
        <body>
          <GTMIframe />
          <Main />
          <NextScript />
        </body>
        <style jsx>{`
          html {
            font-size: 100%;
            background: ${colors.bg.body};
            margin: 0;
            margin-left: calc(100vw - 100%);
            padding: 0;
          }
          body {
            font-family: ${fonts.body};
            font-size: ${fontSizes.base};
            color: ${colors.text.body};
            background: ${colors.bg.content};
            max-width: ${measurements.maxWidth};
            margin: 0 auto;
            padding: 0;
          }
          @media (min-width: ${breakpoints.md}) {
            html {
              padding: 0 ${measurements.baseUnit}em;
            }
          }
        `}</style>
      </html>
    )
  }
}
