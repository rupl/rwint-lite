import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom'
import formatDate from '../../helpers/formatDate'
import { breakpoints, colors, fontSizes, measurements } from '../../theme/variables'

class ReportLink extends React.Component {
  componentDidMount () {
    if (this.props.focusId === this.props.report.id) {
      ReactDOM.findDOMNode(this.refs.theLink).focus()
    }
  }

  render () {
    const { id, fields, urlCountry, urlTitle } = this.props.report
    const headingLevel = this.props.headingLevel || '2'
    const numSourcesToShow = 2
    const displaySources = fields.source.length > numSourcesToShow ? [fields.source[0], fields.source[1]] : fields.source
    const moreSourcesNumber = fields.source.length > numSourcesToShow ? fields.source.length - numSourcesToShow : 0
    const countryQueryString = `?search=country.exact:"${fields.primary_country.shortname || fields.primary_country.name}"`
    let sourceQueryString = '?search=source.exact:'

    return (
      <div className='report'>
        {headingLevel === '2' &&
          <h2 className='title'>
            <Link prefetch as={`/report/${id}/${urlCountry}/${urlTitle}`} href={`/report?id=${id}`}>
              <a ref='theLink'>{fields.title}</a>
            </Link>
          </h2>
        }
        {headingLevel === '3' &&
          <h3 className='title'>
            <Link prefetch as={`/report/${id}/${urlCountry}/${urlTitle}`} href={`/report?id=${id}`}>
              <a ref='theLink'>{fields.title}</a>
            </Link>
          </h3>
        }
        {fields.date &&
          <p className='date'>{formatDate(fields.date.created)}</p>
        }
        <div className='info'>
          {fields.primary_country &&
            <Link as={`/report/listing${countryQueryString}`} href={`/updates${countryQueryString}`}>
              <a className='country'>{fields.primary_country.shortname || fields.primary_country.name}</a>
            </Link>
          }
          <span className='divider'>|</span>
          {fields.source &&
            displaySources.map((source, i) =>

              <span className='sources' key={i}>
                <Link prefetch as={`/report/listing${sourceQueryString}"${source.shortname || source.name}"`} href={`/updates${sourceQueryString}"${source.shortname || source.name}"`}>
                  <a>{source.shortname || source.name}</a>
                </Link>
                {i < displaySources.length && i + 1 !== fields.source.length &&
                  <span>,</span>
                }
              </span>
            )}
          {moreSourcesNumber > 0 &&
            <span className='sources-more'>+{moreSourcesNumber} more</span>
          }
        </div>
        <style jsx>{`
          .report {
            border-bottom: 1px solid ${colors.border.light}
            padding: ${measurements.baseUnit * 1.5}em 0 ${measurements.baseUnit}em 0;
            word-break: break-word;
          }
          p {
            line-height: initial;
          }
          .title {
            margin-bottom: ${measurements.baseUnit}em;
          }
          .title a {
            color: ${colors.text.dark};
            text-decoration: none;
          }
          .info a:hover, .title a:hover {
            color: ${colors.link.hover};
          }
          .info a:focus, .title a:focus {
            color: ${colors.link.focus};
          }
          .info a:hover, .info a:focus, .title a:hover, .title a:focus {
            text-decoration: underline;
          }
          .date {
            font-size: ${fontSizes.small};
            margin-bottom: ${measurements.baseUnit * 1.5}em;
          }
          .info {
            text-transform: uppercase;
            font-size: ${fontSizes.tiny};
            color: ${colors.text.light};
          }
          .divider {
            margin: 0 ${measurements.baseUnit}em;
          }
          .info a {
            display: inline-block;
            text-decoration: none;
            color: ${colors.text.light};
            padding: ${measurements.baseUnit * 0.67}em 0;
          }
          .sources {
            margin-right: ${measurements.baseUnit}em;
          }
          @media (min-width: ${breakpoints.md}) {
            .report {
              float: left;
              width: 49%;
            }
            .report:nth-child(odd) {
              margin-right: 1%;
            }
            .report:nth-child(even) {
              margin-left: 1%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ReportLink
