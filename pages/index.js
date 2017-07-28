import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import ReportLink from '../components/ReportLink'

const Index = (props) => (
  <Layout>
    <div>
      <h1>RW mobile</h1>
      <ul>
        {props.reports.length > 0 &&
          props.reports.map((report, i) => <ReportLink key={report.id} report={report} />)
        }
      </ul>
    </div>
  </Layout>
)

Index.getInitialProps = async function () {
  const reportsEndpoint = 'https://api.reliefweb.int/v1/reports?appname=rwmob-dev&fields[include][]=country&fields[include][]=source&fields[include][]=date'
  const res = await fetch(reportsEndpoint)
  const data = await res.json()

  return {
    reports: data.data
  }
}

export default Index
