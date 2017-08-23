import React from 'react'
import { connect } from 'react-redux'
import ReportLink from '../components/links/ReportLink'
import SectionHeading from './SectionHeading'
import { breakpoints } from '../theme/variables'

export class Headlines extends React.Component {
  render () {
    const {headlines} = this.props
    return (
      <div>
        <SectionHeading heading='Latest Headlines' />
        <div className='reports-wrapper'>
          {headlines.items && headlines.items.length > 0 &&
            headlines.items.map((item, i) => <ReportLink key={item.id} headingLevel='3' report={item} />)
          }
        </div>
        <style>{`
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

export default connect(state => state)(Headlines)
