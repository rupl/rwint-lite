import Link from 'next/link'
import { breakpoints, colors, measurements } from '../../theme/variables'

const Logo = ({home}) => {
  return (
    <div>
      {home &&
        <h1 className='cd-site-header__logo active'>
          <span className='sr-only'>ReliefWeb</span>
        </h1>
      }
      {!home &&
        <Link prefetch href='/'>
          <a className='cd-site-header__logo'>
            <span className='sr-only'>ReliefWeb</span>
          </a>
        </Link>
      }
      <style jsx>{`
      .cd-site-header__logo {
        display: block;
        width: ${measurements.baseUnit * 5}em;
        height: ${measurements.baseUnit * 5}em;
        position: relative;
        background: url("/static/rw-logo-mobile.svg") left center no-repeat;
        background-size: 100% auto;
      }
      .cd-site-header__logo:after {
        content: "";
        position: absolute;
        bottom: -${measurements.baseUnit * 0.75}em;
        left: 0;
        width: 100%;
        border-bottom: 2px solid transparent;
        transition: border-color 0.3s ease;
      }
      .cd-site-header__logo:focus {
        outline-style: dotted;
        outline-width: 1px;
        outline-color: #CFD1D2;
      }
      .cd-site-header__logo.active:after, .cd-site-header__logo:focus:after, .cd-site-header__logo:hover:after {
        border-color: ${colors.bg.headerFooter};
      }
      @media (min-width: ${breakpoints.md}) {
        .cd-site-header__logo {
          background: url("/static/rw-logo.svg") left center no-repeat;
          width: ${measurements.baseUnit * 19}em;
          margin-right: ${measurements.baseUnit * 3}em;
          margin-bottom: -${measurements.baseUnit}em;
          background-size: auto;
        }
        .cd-site-header__logo:after {
          bottom: -${measurements.baseUnit}em;
        }
      }
    `}</style>
    </div>
  )
}

export default Logo
