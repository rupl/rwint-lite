import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'

const Disaster = (props) => (
  <Layout title={props.disaster.fields.name}>
    <h1>{props.disaster.fields.name}</h1>
    <div>{props.disaster.fields.description}</div>
    <style jsx>{`
      div {
        white-space: pre-wrap;
      }
    `}</style>
  </Layout>
)

Disaster.getInitialProps = async function (context) {
  const { id } = context.query
  const disastersEndpoint = `https://api.reliefweb.int/v1/disasters/${id}?appname=rwmob-dev`
  const res = await fetch(disastersEndpoint)
  const data = await res.json()
  const disaster = data.data[0]
  return { disaster }
}

export default Disaster
