import Layout from '../components/Layout'
import { getCountries } from '../services/requests'
import SimpleLink from '../components/links/SimpleLink'
import SectionHeading from '../components/SectionHeading'
import { breakpoints } from '../theme/variables'

const Countries = (props) => (
  <Layout title='Countries'>
    <div>
      <SectionHeading heading='Countries' level='1' />
      <div className='reports-wrapper'>
        {props.countries && props.countries.length > 0 &&
          props.countries.map((country, i) => <SimpleLink key={country.id} link={country} />)
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

Countries.getInitialProps = async function () {
  let countries = await getCountries()
  return {
    countries: countries
  }
}

export default Countries
