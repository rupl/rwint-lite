import Layout from '../components/Layout'
import SectionHeading from '../components/SectionHeading'
import { breakpoints } from '../theme/variables'

const Training = (props) => (
  <Layout title='Training'>
    <div>
      <SectionHeading heading='Training' level='1' />
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

export default Training
