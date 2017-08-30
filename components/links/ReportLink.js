import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom'
import formatDate from '../../helpers/formatDate'
import InfoLinks from '../links/InfoLinks'
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
        <InfoLinks country={fields.primary_country} sources={fields.source} type='summary' />
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
          .title a:hover {
            color: ${colors.link.hover};
          }
          .title a:focus {
            color: ${colors.link.focus};
          }
          .title a:hover, .title a:focus {
            text-decoration: underline;
          }
          .date {
            font-size: ${fontSizes.small};
            margin-bottom: ${measurements.baseUnit * 1.5}em;
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
