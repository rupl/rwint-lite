import Link from 'next/link'
import React from 'react'
import { colors, fontSizes, measurements } from '../../theme/variables'

class InfoLinks extends React.Component {
  render () {
    const {country, primaryType, sources} = this.props
    const countryName = this.props.type === 'summary' ? (country.shortname || country.name) : country.name
    const countryQueryString = `?search=country.exact:"${countryName}"`
    const primaryTypeQueryString = primaryType ? `?search=disaster_type.exact:"${primaryType.name}"` : ''
    const sourceQueryString = '?search=source.exact:'
    const numSourcesToShow = 2
    const displaySources = sources && sources.length > numSourcesToShow ? [sources[0], sources[1]] : sources
    const moreSourcesNumber = sources && sources.length > numSourcesToShow ? sources.length - numSourcesToShow : 0

    return (
      <div className={this.props.type}>
        {country &&
          <Link as={`/report/listing${countryQueryString}`} href={`/updates${countryQueryString}`}>
            <a className='country'>{countryName}</a>
          </Link>
        }
        {primaryType &&
          <span>
            <span className='divider'>|</span>
            <Link as={`/report/listing${primaryTypeQueryString}`} href={`/updates${primaryTypeQueryString}`}>
              <a className='country'>{primaryType.name}</a>
            </Link>
          </span>
        }
        {sources && sources.length > 0 &&
          <span>
            <span className='divider'>|</span>
            {displaySources.map((source, i) =>

              <span className='sources' key={i}>
                <Link prefetch as={`/report/listing${sourceQueryString}"${source.name}"`} href={`/updates${sourceQueryString}"${source.name}"`}>
                  <a>{this.props.type === 'summary' ? (source.shortname || source.name) : source.name }</a>
                </Link>
                {i < displaySources.length && i + 1 !== sources.length &&
                  <span>,</span>
                }
              </span>
            )}
          </span>
        }
        {moreSourcesNumber > 0 &&
          <span className='sources-more'>+{moreSourcesNumber} more</span>
        }
        <style jsx>{`
          div {
            font-size: ${fontSizes.small};
            color: ${colors.text.light};
          }
          .summary {
            text-transform: uppercase;
            font-size: ${fontSizes.tiny};
          }
          a {
            display: inline-block;
            text-decoration: none;
            padding: ${measurements.baseUnit * 0.67}em 0;
          }
          a:hover {
            text-decoration: underline;
          }
          .divider {
            margin: 0 ${measurements.baseUnit}em;
          }
          .sources {
            margin-right: ${measurements.baseUnit}em;
          }
        `}</style>
      </div>
    )
  }
}

export default InfoLinks
