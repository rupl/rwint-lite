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
    const sectionHeading = this.props.statusCode === 404 ? 'Page not found' : 'Error'
    return (
      <Layout title={sectionHeading}>
        <SectionHeading heading={sectionHeading} level='1' />
        {this.props.statusCode === 404 &&
          <div>
            <p>The requested page does not exist.</p>
            <p>
              <Link prefetch href='/'>
                <a>Go to the home page</a>
              </Link>
            </p>
          </div>
        }
      </Layout>
    )
  }
}
