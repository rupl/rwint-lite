import Layout from '../components/Layout'
import { getUpdates } from '../services/requests'
import ReportLink from '../components/links/ReportLink'
import SectionHeading from '../components/SectionHeading'
import { breakpoints } from '../theme/variables'

const Updates = (props) => (
  <Layout title='Updates'>
    <div>
      <SectionHeading heading='Updates' level='1' />
      <div className='reports-wrapper'>
        {props.reports && props.reports.length > 0 &&
          props.reports.map((report, i) => <ReportLink key={report.id} report={report} />)
        }
      </div>
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
  </Layout>
)

Updates.getInitialProps = async function () {
  let reports = await getUpdates()
  return {
    reports: reports
  }
}

export default Updates
