import Layout from '../components/Layout'
import Headlines from '../components/Headlines'
import Featured from '../components/Featured'
import { getFeatured, getHeadlines } from '../services/requests'

const Index = (props) => (
  <Layout home='true'>
    <Featured {...props} />
    <Headlines {...props} />
  </Layout>
)

Index.getInitialProps = async function () {
  let featured = await getFeatured()
  let headlines = await getHeadlines()
  return {
    featured: featured,
    reports: headlines
  }
}

export default Index
