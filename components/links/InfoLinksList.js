import Link from 'next/link'
import React from 'react'
import { measurements } from '../../theme/variables'

class InfoLinksList extends React.Component {
  render () {
    const { dataType, divider, items, type } = this.props
    const searchType = this.props.searchType || 'report'
    const totalItems = items.length
    const queryString = `?search=${dataType}.exact:`
    const numToShow = 2
    const displayItems = items && items.length > numToShow ? [items[0], items[1]] : items
    const moreNumber = items && items.length > numToShow ? items.length - numToShow : 0
    return (
      <span>
        {divider &&
          <span className='divider'>|</span>
        }
        {displayItems.map((item, i) =>
          <span className='item' key={i}>
            <Link prefetch
              as={`/${searchType}/listing${queryString}"${item.name}"`}
              href={`/${searchType}-listing${queryString}"${item.name}"`}>
              <a>{type === 'summary' ? (item.shortname || item.name) : item.name }</a>
            </Link>
            {i < items.length && i + 1 !== totalItems &&
              <span>,</span>
            }
          </span>
        )}
        {moreNumber > 0 &&
          <span className='more item'>+{moreNumber} more</span>
        }
        <style jsx>{`
          a {
            display: inline-block;
            text-decoration: none;
            padding: ${measurements.baseUnit * 0.67}em 0;
          }
          a:hover {
            text-decoration: underline;
          }
          .divider, .item {
            margin-right: ${measurements.baseUnit}em;
          }
        `}</style>
      </span>
    )
  }
}

export default InfoLinksList
