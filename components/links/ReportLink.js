import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom'
import formatDate from '../../helpers/formatDate'
import InfoLinks from '../links/InfoLinks'
import DisasterStatus from '../article/DisasterStatus'
import { reportLinkStyle } from '../../theme/links'
import { breakpoints, measurements } from '../../theme/variables'

const renderDate = (date) => {
  if (date.created) {
    return formatDate(date.created)
  }
  if (date.closing) {
    return `Closing date: ${formatDate(date.closing)}`
  }
  if (date.start && date.end) {
    return date.start === date.end ? `On ${formatDate(date.start)}` : `From ${formatDate(date.start)} to ${formatDate(date.end)}`
  }
}

const formatPaths = (report, reportsType = 'report') => {
  const { id, urlCountry, urlTitle } = report
  let hrefPath = `/${reportsType}?id=${id}`
  let linkPath = urlCountry && reportsType !== 'disaster' ? `/${reportsType}/${id}/${urlCountry}/${urlTitle}` : `/${reportsType}/${id}/${urlTitle}`
  return {
    href: hrefPath,
    link: linkPath
  }
}

class ReportLink extends React.Component {
  componentDidMount () {
    if (this.props.focusId === this.props.report.id) {
      ReactDOM.findDOMNode(this.refs.theLink).focus()
    }
  }

  render () {
    const { fields } = this.props.report
    const title = fields.title ? fields.title : fields.name
    const sources = fields.source ? fields.source : []
    const disasterTypes = fields.type ? fields.type : ''
    const countries = fields.primary_country ? [fields.primary_country] : fields.country
    const linkPath = formatPaths(this.props.report, this.props.reportsType).link
    const hrefPath = formatPaths(this.props.report, this.props.reportsType).href

    return (
      <div className='report'>
        <h2 className='title'>
          <Link as={linkPath} href={hrefPath}>
            <a ref='theLink'>{title}</a>
          </Link>
        </h2>
        {fields.date &&
          <p className='date'>
            {renderDate(fields.date)}
            {fields.date.registration &&
              <span className='reg'> Registration before {formatDate(fields.date.registration)}</span>
            }
          </p>
        }
        {!fields.date && this.props.reportsType === 'training' &&
          <p className='date'>Ongoing course</p>
        }
        {fields.status &&
          <DisasterStatus status={fields.status} />
        }
        <InfoLinks countries={countries} sources={sources} disasterTypes={disasterTypes} searchType={this.props.reportsType} type='summary' />
        <style jsx>{reportLinkStyle}</style>
        <style jsx>{`
          .reg {
            display: block;
            margin-top: ${measurements.baseUnit * 1.5}em;
          }
          @media (min-width: ${breakpoints.md}) {
            .reg {
              display: inline;
              margin-top: 0;
            }
            .reg:before {
              content: "-";
              margin-left: 4px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ReportLink
