import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'

const Country = (props) => (
  <Layout title={props.country.fields.name}>
    <h1>{props.country.fields.name}</h1>
    <div>{props.country.fields.description}</div>
    <style jsx>{`
      div {
        white-space: pre-wrap;
      }
    `}</style>
  </Layout>
)

Country.getInitialProps = async function (context) {
  const { id } = context.query
  const countriesEndpoint = `https://api.reliefweb.int/v1/countries/${id}?appname=rwmob-dev`
  const res = await fetch(countriesEndpoint)
  const data = await res.json()
  const country = data.data[0]
  return { country }
}

export default Country
