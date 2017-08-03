import { breakpoints } from '../theme/variables'
import SectionHeading from './SectionHeading'
import SimpleLink from './links/SimpleLink'

const Featured = (props) => (
  <div>
    <SectionHeading heading='Featured' />
    <ul>
      {props.featured && props.featured.length > 0 &&
        props.featured.map((item, i) => (
          <li key={item.id}>
            <SimpleLink link={item} />
          </li>
        )
      )}
    </ul>
    <style jsx>{`
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      @media (min-width: ${breakpoints.md}) {
        ul {
          display: block;
          display: flex;
          flex-wrap: wrap;
        }
        li {
          width: 33.33%;
          padding-right: 4px;
        }
        li:nth-child(3n) {
          padding-right: 0;
        }
      }
    `}</style>
  </div>
)

export default Featured
