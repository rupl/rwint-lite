import React from 'react'
import { connect } from 'react-redux'
import ReportLinkSmall from '../links/ReportLinkSmall'
import Link from 'next/link'
import { primaryButton } from '../../theme/buttons'
import { colors, fonts, fontSizes, measurements } from '../../theme/variables'

export class ArticleSideBarReports extends React.Component {
  render () {
    const {updates} = this.props
    return (
      <div>
        <h2>Latest updates</h2>
        {!updates.items &&
          <p>No updates</p>
        }
        {updates.items && updates.items.length > 0 &&
          <ul>
            {updates.items.map((item, i) => <li key={item.id}><ReportLinkSmall report={item} /></li>)}
          </ul>
        }
        <Link prefetch as={`/report/listing?search=${this.props.type}.exact:"${this.props.item.fields.name}"`}
          href={`/updates?search=${this.props.type}.exact:"${this.props.item.fields.name}"`}>
          <a className='btn-primary'>
            View more {this.props.item.fields.name} updates
          </a>
        </Link>
        <style jsx>{primaryButton}</style>
        <style jsx>{`
          h2 {
            text-transform: uppercase;
            font-family: ${fonts.body};
            font-size: ${fontSizes.small};
            margin-bottom: 4px;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0 0 ${measurements.baseUnit}em 0;
          }
          li {
            border-bottom: 1px solid ${colors.border.light};
          }
          li:last-child {
            border: none;
          }
          .btn-primary {
            margin-bottom: ${measurements.baseUnit * 2}em;
          }
       `}</style>
      </div>
    )
  }
}

export default connect(state => state)(ArticleSideBarReports)
