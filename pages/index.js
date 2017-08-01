import Layout from '../components/Layout'
import LatestUpdates from '../components/LatestUpdates'
import Featured from '../components/Featured'
import { getFeatured, getUpdates } from '../services/requests'

const Index = (props) => (
  <Layout home='true'>
    <Featured {...props} />
    <LatestUpdates {...props} />
  </Layout>
)

Index.getInitialProps = async function () {
  let featured = await getFeatured()
  let reports = await getUpdates()
  return {
    featured: featured,
    reports: reports
  }
}

export default Index
