import Logo from './Logo'
import Nav from './Nav'
import GlobalHeader from './GlobalHeader'
import SearchForm from './SearchForm'
import { breakpoints, colors, measurements } from '../../theme/variables'

const Header = (props) => (
  <header role='banner'>
    <GlobalHeader />
    <div className='sh'>
      <div className='container inner'>
        <Logo home={props.home} />
        <SearchForm query={props.query} />
        <Nav />
      </div>
    </div>
    <style jsx>{`
      .sh {
        border-bottom: 2px solid ${colors.border.light};
      }
      .inner {
        position: relative;
        height: ${measurements.baseUnit * 6}em;
      }
      @media (min-width: ${breakpoints.md}) {
        .inner {
          height: ${measurements.baseUnit * 7.5}em;
        }
      }
      @media print {
        header {
          display: none!important;
        }
      }
    `}</style>
  </header>
)

export default Header
