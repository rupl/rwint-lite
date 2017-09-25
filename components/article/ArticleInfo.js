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
  if (heading === 'Career category') {
    return 'Career categories'
  }
  if (heading === 'City') {
    return 'Cities'
  }
  return `${heading}s`
}

const formatSearchPaths = (type = 'update') => {
  const asPath = type === 'update' ? '/report/listing' : `/${type}/listing`
  const hrefPath = `/${type}s`
  return {
    as: asPath,
    href: hrefPath
  }
}

class ArticleInfo extends React.Component {
  render () {
    const itemsLength = typeof this.props.items === 'string' ? 1 : this.props.items.length
    const heading = formatHeading(this.props.heading, itemsLength)
    const queryString = this.props.type === 'cost' ? `?search=${this.props.type}:` : `?search=${this.props.type}.exact:`
    const asPath = formatSearchPaths(this.props.searchType).as
    const hrefPath = formatSearchPaths(this.props.searchType).href
    const items = typeof this.props.items === 'string' ? [{name: this.props.items}] : this.props.items
    return (
      <div>
        <h2>{heading}</h2>
        {items.map((item, i) =>
          <span key={i}>
            <Link prefetch as={`${asPath}${queryString}"${item.name}"`} href={`${hrefPath}${queryString}"${item.name}"`}>
              <a>{item.name}</a>
            </Link>
            {i + 1 < items.length &&
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
          a:hover {
            text-decoration: underline;
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
