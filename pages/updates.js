import Layout from '../components/Layout'
import { getUpdates } from '../services/requests'
import ReportsList from '../components/ReportsList'
import SectionHeading from '../components/SectionHeading'
import { breakpoints } from '../theme/variables'

const Updates = (props) => (
  <Layout title='Updates'>
    <div>
      <SectionHeading heading='Updates' level='1' />
      <ReportsList {...props} />
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

Updates.getInitialProps = async function (context) {
  const reportsPerPage = 10
  const maxReports = 100
  let reports = []
  let pageNumber = 1
  let limit = reportsPerPage
  let offset = 0
  let aboveMax = false
  let canLoadMore = true

  if (context && context.req && context.req.query.page) {
    pageNumber = context.req.query.page
  } else {
    if (context && context.asPath) {
      const pageFromPath = context.asPath.split('page=')[1]
      pageNumber = pageFromPath ? parseInt(pageFromPath, 10) : 1
    }
  }
  aboveMax = (reportsPerPage * pageNumber) > maxReports
  limit = aboveMax ? reportsPerPage : reportsPerPage * pageNumber
  offset = aboveMax ? pageNumber - 1 : 0
  reports = await getUpdates(offset, limit)
  canLoadMore = reports.totalCount > (pageNumber * reportsPerPage)
  return {
    aboveMax: aboveMax,
    canLoadMore: canLoadMore,
    currentPage: pageNumber,
    reports: reports.data
  }
}

export default Updates
