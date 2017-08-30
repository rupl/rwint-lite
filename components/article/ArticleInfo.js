import React from 'react'
import Link from 'next/link'
import { fonts, fontSizes, measurements } from '../../theme/variables'

const formatHeading = (heading, itemsLength) => {
  if (itemsLength === 1) {
    return heading
  }
  if (heading === 'Country') {
    return 'Countries'
  }
  return `${heading}s`
}

class ArticleInfo extends React.Component {
  render () {
    const heading = formatHeading(this.props.heading, this.props.items.length)
    const queryString = `?search=${this.props.type}.exact:`
    return (
      <div>
        <h2>{heading}</h2>
        {this.props.items.map((item, i) =>
          <span key={i}>
            <Link prefetch as={`/report/listing${queryString}"${item.name}"`} href={`/updates${queryString}"${item.name}"`}>
              <a>{item.name}</a>
            </Link>
            {i + 1 < this.props.items.length &&
              <span className='divider'>/</span>
            }
          </span>
        )}
        <style jsx>{`
          div {
            margin-bottom: ${measurements.baseUnit * 2}em;
          }
          h2 {
            text-transform: uppercase;
            font-family: ${fonts.body};
            font-size: ${fontSizes.small};
            margin-bottom: 4px;
          }
          a {
            font-size: ${fontSizes.small};
            font-weight: bold;
            text-decoration: none;
          }
          span {
            display: inline-block;
          }
          .divider {
            padding: 0 ${measurements.baseUnit}em;
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleInfo
