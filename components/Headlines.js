import ReportLink from '../components/links/ReportLink'
import SectionHeading from './SectionHeading'
import { breakpoints } from '../theme/variables'

const LatestUpdates = (props) => (
  <div>
    <SectionHeading heading='Latest Headlines' />
    <div className='reports-wrapper'>
      {props.reports && props.reports.length > 0 &&
        props.reports.map((report, i) => <ReportLink key={report.id} report={report} />)
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

export default LatestUpdates
