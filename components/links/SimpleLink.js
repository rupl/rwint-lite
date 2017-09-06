import Link from 'next/link'
import { colors, measurements } from '../../theme/variables'
import { Arrow, Star } from '../icons/Icons'

const SimpleLink = ({link}) => (
  <Link
    prefetch
    as={`/${link.type}/${link.id}/${link.urlName}`}
    href={`/${link.type}?id=${link.id}&name=${link.urlName}`}>
    <a>
      <span className='icon arrow'>
        <Arrow direction='right' />
      </span>
      {link.fields &&
        <span className='name'>
          {link.fields.name}
          {link.fields.featured &&
            <span className='icon star'>
              <Star />
            </span>
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
        a:hover .icon, a:focus .icon {
          color: white;
        }
        .name {
          display: flex;
          align-items: center;
        }
        .icon {
          color: ${colors.border.highlight};
        }
        .star {
          display: inline-block;
          line-height: 14px;
          height: 14px;
          width: 14px;
          margin-left: 2px;
          color: ${colors.text.highlight};
        }
        .arrow {
          position: absolute;
          left: 0;
          top: 50%;
          line-height: 10px;
          height: 10px;
          width: 10px;
          margin-top: -5px;
          transition: transform 0.3s ease;
        }
      `}</style>
    </a>
  </Link>
)

export default SimpleLink
