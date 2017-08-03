import Link from 'next/link'
import { colors, measurements } from '../../theme/variables'
import { Arrow } from '../icons/Icons'

const SimpleLink = ({link}) => (
  <Link
    prefetch
    as={`/${link.type}/${link.id}/${link.urlName}`}
    href={`/${link.type}?id=${link.id}&name=${link.urlName}`}>
    <a>
      <Arrow direction='right' />
      {link.fields &&
        link.fields.name
      }
      <style jsx>{`
        a {
          padding: ${measurements.baseUnit * 2}em ${measurements.baseUnit}em ${measurements.baseUnit * 2}em 0;
          display: block;
          text-decoration: none;
          position: relative;
          padding-left: 24px;
          border-bottom: 1px solid ${colors.border.light}
          color: ${colors.text.body};
          height: 100%;
          transition: background 0.3s ease, color 0.3s ease;
        }
        a:hover, a:focus {
          background: ${colors.bg.dark};
          color: #fff;
          outline: none;
        }
      `}</style>
    </a>
  </Link>
)

export default SimpleLink
