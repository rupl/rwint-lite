/**
 * Overrides default Next.js error page
 */

import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SectionHeading from '../components/SectionHeading'

export default class Error extends React.Component {
  static getInitialProps ({ res, jsonPageRes }) {
    const statusCode = res
      ? res.statusCode
      : jsonPageRes ? jsonPageRes.status : null
    return { statusCode }
  }

  render () {
    const offline = typeof navigator !== 'undefined' && !navigator.onLine
    let sectionHeading = this.props.statusCode === 404 ? 'Page not found' : 'Error'
    let msg = this.props.statusCode === 404 ? 'The requested page does not exist.' : 'Something\'s gone wrong!'
    if (offline) {
      sectionHeading = 'You are currently offline'
      msg = 'Please check your internet connection and try again.'
    }
    return (
      <Layout title={sectionHeading}>
        <SectionHeading heading={sectionHeading} level='1' />
        <p>{msg}</p>
        {!offline &&
          <p>
            <Link prefetch href='/'>
              <a>Go to the home page</a>
            </Link>
          </p>
        }
      </Layout>
    )
  }
}
