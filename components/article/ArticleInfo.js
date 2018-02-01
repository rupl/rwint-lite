/**
 * Article Info component
 * Displays the facets for the articles
 */

import React from 'react'
import Link from 'next/link'
import { fontSizes, measurements } from '../../theme/variables'

/**
 * Pluralise the heading
 */
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

/**
 * Replace spaces with + in urls
 */
const formatUrl = (name) => {
  return name.split(' ').join('+')
}

/**
 * Format search paths for the facet links
 */
const formatPaths = (searchType = 'report', itemType, name) => {
  const queryString = itemType === 'cost' ? `?search=${itemType}:` : `?search=${itemType}.exact:`
  const asPath = `/${searchType}/listing`
  const hrefPath = `/${searchType}-listing`
  let searchTerm = name
  // Handle searching for 10+ years experience
  if (itemType === 'experience' && searchType === 'job' && name.indexOf('+ years') !== -1) {
    searchTerm = searchTerm.replace('+ years', 'plus years')
  }
  return {
    as: `${asPath}${queryString}%22${formatUrl(searchTerm)}%22`,
    href: `${hrefPath}${queryString}%22${formatUrl(searchTerm)}%22`
  }
}

class ArticleInfo extends React.Component {
  render () {
    const itemsLength = typeof this.props.items === 'string' ? 1 : this.props.items.length
    const heading = formatHeading(this.props.heading, itemsLength)
    const items = typeof this.props.items === 'string' ? [{name: this.props.items}] : this.props.items
    return (
      <div>
        <h2>{heading}</h2>
        {this.props.type !== 'status' && items.map((item, i) =>
          <span key={i}>
            <Link prefetch as={formatPaths(this.props.searchType, this.props.type, item.name).as}
              href={formatPaths(this.props.searchType, this.props.type, item.name).href}>
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
