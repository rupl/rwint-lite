import ReportLink from '../components/ReportLink'

const LatestUpdates = (props) => (
  <ul>
    {props.reports && props.reports.length > 0 &&
      props.reports.map((report, i) => <ReportLink key={report.id} report={report} />)
    }
  </ul>
)

export default LatestUpdates
