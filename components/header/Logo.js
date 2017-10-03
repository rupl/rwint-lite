import Link from 'next/link'
import { breakpoints, colors, measurements } from '../../theme/variables'

const Logo = ({home}) => {
  return (
    <div className='lh'>
      {home &&
        <h1 className='logo active'>
          <span className='sr-only'>ReliefWeb</span>
        </h1>
      }
      {!home &&
        <Link prefetch href='/'>
          <a className='logo'>
            <span className='sr-only'>ReliefWeb</span>
          </a>
        </Link>
      }
      <style jsx>{`
      .logo {
        display: block;
        width: ${measurements.baseUnit * 5}em;
        height: ${measurements.baseUnit * 6}em;
        position: relative;
        background: url("/static/rw-logo-mobile.svg") left center no-repeat;
        background-size: 100% auto;
      }
      .logo:after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        border-bottom: 2px solid transparent;
        transition: border-color 0.3s ease;
      }
      .logo:focus {
        outline-style: dotted;
        outline-width: 1px;
        outline-color: #CFD1D2;
      }
      .logo.active:after, .logo:focus:after, .logo:hover:after {
        border-color: ${colors.bg.headerFooter};
      }

      .lh {
        float: left;
      }

      @media (max-width: 1024px) {
        .lh {
          float: none;
        }
      }

      @media (min-width: ${breakpoints.md}) {
        .lh {
          float: left;
        }
        .logo {
          background: url("/static/rw-logo.svg") left 14px no-repeat;
          width: ${measurements.baseUnit * 19}em;
          height: ${measurements.baseUnit * 7.5}em;
          margin-right: ${measurements.baseUnit * 3}em;
          margin-bottom: -${measurements.baseUnit}em;
          background-size: auto;
        }
      }
    `}</style>
    </div>
  )
}

export default Logo
