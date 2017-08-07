import Layout from '../components/Layout'
import SectionHeading from '../components/SectionHeading'
import { breakpoints } from '../theme/variables'

const Disasters = (props) => (
  <Layout title='Disasters'>
    <div>
      <SectionHeading heading='Disasters' level='1' />
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

export default Disasters
