import Link from 'next/link'
import React from 'react'
import formatDate from '../../helpers/formatDate'
import InfoLinks from '../links/InfoLinks'
import { reportLinkStyle } from '../../theme/links'

class HeadlineLink extends React.Component {
  render () {
    const { fields, id, urlCountry, urlTitle } = this.props.report
    const headline = fields.headline && fields.headline.title ? fields.headline.title : fields.title
    const sources = fields.source ? fields.source : []
    const countries = fields.primary_country ? [fields.primary_country] : fields.country

    return (
      <div className='report'>
        <h3 className='title'>
          <Link as={`/report/${id}/${urlCountry}/${urlTitle}`} href={`/report?id=${id}`}>
            <a ref='theLink'>{headline}</a>
          </Link>
        </h3>
        {fields.date && fields.date.created &&
          <p className='date'>
            {formatDate(fields.date.created)}
          </p>
        }
        <InfoLinks countries={countries} sources={sources} searchType='report' type='summary' />
        <style jsx>{reportLinkStyle}</style>
      </div>
    )
  }
}

export default HeadlineLink
