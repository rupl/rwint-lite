import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'

const Report = (props) => (
  <Layout title={props.report.fields.title}>
    <h1>{props.report.fields.title}</h1>
    <div>{props.report.fields.body}</div>
    <style jsx>{`
      div {
        white-space: pre-wrap;
      }
    `}</style>
  </Layout>
)

Report.getInitialProps = async function (context) {
  const { id } = context.query
  const reportsEndpoint = `https://api.reliefweb.int/v1/reports/${id}?appname=rwmob-dev`
  const res = await fetch(reportsEndpoint)
  const data = await res.json()
  const report = data.data[0]
  return { report }
}

export default Report
