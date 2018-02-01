/**
 * Simple Link component
 * Used on Featured on the homepage and the Countries list
 */

import Link from 'next/link'
import { colors, measurements } from '../../theme/variables'

const SimpleLink = ({link}) => (
  <Link
    as={`/${link.type}/${link.id}/${link.urlName}`}
    href={`/${link.type}?id=${link.id}&name=${link.urlName}`}>
    <a>
      <span className='arrow' aria-hidden />
      {link.fields &&
        <span className='name'>
          {link.fields.name}
          {link.fields.featured &&
            <span className='star' aria-hidden />
          }
        </span>
      }
      <style jsx>{`
        a {
          padding: ${measurements.baseUnit * 2}em ${measurements.baseUnit * 2}em ${measurements.baseUnit * 2}em ${measurements.baseUnit * 2}em;
          display: block;
          display: flex;
          align-items: center;
          text-decoration: none;
          position: relative;
          border-bottom: 1px solid ${colors.border.light}
          color: ${colors.text.body};
          height: 100%;
          background: white;
          transition: background 0.3s ease, color 0.3s ease
        }
        a:hover, a:focus {
          background: ${colors.bg.headerFooter};
          color: white;
          outline: none;
        }
        a:hover .arrow, a:focus .arrow {
          color: white;
          background-position: 0 -10px;
        }
        .arrow {
          width: 10px;
          height: 10px;
          position: absolute;
          left: 2px;
          top: 50%;
          margin-top: -5px;
          background: url('/static/icons.svg') 0 0 no-repeat
        }
        .name {
          display: flex;
          align-items: center;
        }
        .star {
          display: inline-block;
          height: 12px;
          width: 12px;
          margin-left: 4px;
          background: url('/static/icons.svg') 0 -30px no-repeat
        }
        a:hover .star, a:focus .star {
          background-position: 0 -42px;
        }
      `}</style>
    </a>
  </Link>
)

export default SimpleLink
