import Layout from '../components/Layout'
import LatestUpdates from '../components/LatestUpdates'
import { getUpdates } from '../services/requests'

const Index = (props) => (
  <Layout home='true'>
    <LatestUpdates {...props} />
  </Layout>
)

Index.getInitialProps = async function () {
  let reports = await getUpdates()
  return {
    reports: reports
  }
}

export default Index
