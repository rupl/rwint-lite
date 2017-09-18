import Logo from './Logo'
import Nav from './Nav'
import GlobalHeader from './GlobalHeader'
import SearchForm from './SearchForm'
import { breakpoints, colors, measurements } from '../../theme/variables'

const Header = (props) => (
  <header role='banner'>
    <GlobalHeader />
    <div className='cd-site-header'>
      <div className='container cd-site-header__inner'>
        <Logo home={props.home} />
        <SearchForm query={props.query} />
        <Nav />
      </div>
    </div>
    <style jsx>{`
      .cd-site-header {
        border-bottom: 2px solid ${colors.border.light};
      }
      .cd-site-header__inner {
        position: relative;
        height: ${measurements.baseUnit * 6}em;
      }
      @media (min-width: ${breakpoints.md}) {
        .cd-site-header__inner {
          height: ${measurements.baseUnit * 7.5}em;
        }
      }
    `}</style>
  </header>
)

export default Header
