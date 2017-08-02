import Logo from './Logo'
import Nav from './Nav'
import GlobalHeader from './GlobalHeader'
import { breakpoints, colors, measurements } from '../../theme/theme'

const Header = (props) => (
  <header role='banner'>
    <GlobalHeader />
    <div className='cd-site-header'>
      <div className='container cd-site-header__inner'>
        <Logo home={props.home} />
        <Nav />
      </div>
    </div>
    <style jsx>{`
      .cd-site-header {
        border-bottom: 2px solid ${colors.border.light};
      }
      .cd-site-header__inner {
        align-items: center;
        position: relative;
        height: ${measurements.baseUnit * 6}px;
        display: flex;
      }
      @media (min-width: ${breakpoints.md}) {
        .cd-site-header__inner {
          height: ${measurements.baseUnit * 7.5}px;
        }
      }
    `}</style>
  </header>
)

export default Header

// TODO
// skip link
