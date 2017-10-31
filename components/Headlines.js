import React from 'react'
import { connect } from 'react-redux'
import HeadlineLink from '../components/links/HeadlineLink'
import SectionHeading from './SectionHeading'
import { breakpoints } from '../theme/variables'

export class Headlines extends React.Component {
  render () {
    const {headlines} = this.props
    const online = typeof navigator !== 'undefined' && navigator.onLine
    return (
      <div>
        <SectionHeading heading='Latest Headlines' />
        {!headlines.items.length && online &&
          <p>No results found.</p>
        }
        {!headlines.items.length && !online &&
          <p><em>Unable to fetch data while offline.</em></p>
        }
        <div className='reports-wrapper'>
          {headlines.items && headlines.items.length > 0 &&
            headlines.items.map((item, i) => <HeadlineLink key={item.id} report={item} />)
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

export default connect(state => state)(Headlines)
