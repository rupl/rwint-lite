import React from 'react'
import { connect } from 'react-redux'
import ReportLink from '../components/links/ReportLink'
import { breakpoints } from '../theme/variables'

export class ReportsList extends React.Component {
  render () {
    const {updates} = this.props
    return (
      <div>
        <div className='reports-wrapper'>
          {updates.reports && updates.reports.length > 0 &&
            updates.reports.map((report, i) => <ReportLink key={report.id} report={report} focusId={updates.focusId} />)
          }
        </div>
        <style jsx>{`
         @media (min-width: ${breakpoints.md}) {
           .reports-wrapper {
             overflow: auto;
             display: flex;
             flex-wrap: wrap;
           }
         }
       `}</style>
      </div>
    )
  }
}

export default connect(state => state)(ReportsList)
