/**
 * NavLink component
 */

import Link from 'next/link'
import { breakpoints, colors, measurements } from '../../theme/variables'

const NavLink = (props) => (
  <Link prefetch as={`/${props.link.type}/listing`} href={`/${props.link.type}-listing`}>
    <a className={`link ${props.isActive ? 'link--active' : ''}`}>
      {props.link.label}
      <style jsx>{`
        .link {
          display: block;
          line-height: 1;
          text-decoration: none;
          position: relative;
          color: ${colors.text.header};
          height: ${measurements.baseUnit * 7.5}em;
          padding: ${measurements.baseUnit * 3}em ${measurements.baseUnit * 2}em;
        }
        .link:after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          border-bottom: 2px solid transparent;
          transition: border-color 0.3s ease;
        }
        .link:hover, .link:focus {
          background: ${colors.link.focusBg};
          outline: none;
        }
        .link:hover:after, .link:focus:after, .link--active:after {
          border-color: ${colors.bg.headerFooter};
        }
        @media (max-width: ${breakpoints.lg}) {
          .link {
            height: auto;
            padding: ${measurements.baseUnit * 2}em ${measurements.baseUnit}em;
          }
        }
        @media (min-width: ${breakpoints.lg}) {
          .link:hover, .link:focus {
            text-decoration: none;
            color: #5C6FA6;
          }
          .link:before {
            content: "";
            top: 50%;
            margin-top: -5px;
            background: #5C6FA6;
            display: inline-block;
            width: 1px;
            position: absolute;
            right: 0;
            height: 12px;
            z-index: 1;
          }
        }
      `}</style>
    </a>
  </Link>
)

export default NavLink
