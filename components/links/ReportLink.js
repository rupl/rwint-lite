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
    const title = fields.title ? fields.title : fields.name
    const sources = fields.source ? fields.source : []
    const disasterTypes = fields.type ? fields.type : ''
    const countries = fields.primary_country ? [fields.primary_country] : fields.country
    let linkPath = `/report/${id}/${urlCountry}/${urlTitle}`
    let hrefPath = `/report?id=${id}`
    if (this.props.reportsType === 'disaster') {
      linkPath = `/disaster/${id}/${urlTitle}`
      hrefPath = `/disaster?id=${id}`
    }
    if (this.props.reportsType === 'job') {
      linkPath = `/job/${id}/${urlTitle}`
      hrefPath = `/job?id=${id}`
    }

    return (
      <div className='report'>
        {headingLevel === '2' &&
          <h2 className='title'>
            <Link prefetch as={linkPath} href={hrefPath}>
              <a ref='theLink'>{title}</a>
            </Link>
          </h2>
        }
        {headingLevel === '3' &&
          <h3 className='title'>
            <Link prefetch as={linkPath} href={hrefPath}>
              <a ref='theLink'>{title}</a>
            </Link>
          </h3>
        }
        {fields.date && fields.date.created &&
          <p className='date'>{formatDate(fields.date.created)}</p>
        }
        {fields.date && fields.date.closing &&
          <p className='date'>Valid until {formatDate(fields.date.closing)}</p>
        }
        {fields.status &&
          <p className={`status ${fields.status}`}>{fields.status}</p>
        }
        <InfoLinks countries={countries} sources={sources} disasterTypes={disasterTypes} searchType={this.props.reportsType} type='summary' />
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
            color: ${colors.text.body};
            font-weight: bold;
            text-decoration: none;
          }
          .title a:hover {
            text-decoration: underline;
          }
          .date, .status {
            font-size: ${fontSizes.small};
            margin-bottom: ${measurements.baseUnit * 1.5}em;
          }
          .status {
            text-transform: uppercase;
            font-size: ${fontSizes.tiny};
            display: flex;
            align-items: center;
            line-height: 1;
          }
          .status:before {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            margin-right: 4px;
            border-radius: 100%;
            background: ${colors.status.past};
          }
          .status.alert:before {
            background: ${colors.status.alert};
          }
          .status.current:before {
            background: ${colors.status.current};
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
