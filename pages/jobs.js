import Layout from '../components/Layout'
import SectionHeading from '../components/SectionHeading'
import { breakpoints } from '../theme/variables'

const Jobs = (props) => (
  <Layout title='Jobs'>
    <div>
      <SectionHeading heading='Jobs' level='1' />
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

export default Jobs
