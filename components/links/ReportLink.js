import Link from 'next/link'
import fecha from 'fecha'
import { breakpoints, colors, fontSizes, measurements } from '../../theme/variables'

const formatDate = (date) => {
  return fecha.format(new Date(date), 'DD MMM YYYY')
}

const ReportLink = ({report}) => {
  const { id, fields, urlCountry, urlTitle } = report
  return (
    <div className='report'>
      <h3 className='title'>
        <Link prefetch as={`/report/${id}/${urlCountry}/${urlTitle}`} href={`/report?id=${id}`}>
          <a>{fields.title}</a>
        </Link>
      </h3>
      {fields.date &&
        <p className='date'>{formatDate(fields.date.created)}</p>
      }
      <div className='info'>
        {fields.primary_country &&
          <Link prefetch as='report/listing' href='/updates'>
            <a className='country'>{fields.primary_country.shortname || fields.primary_country.name}</a>
          </Link>
        }
        <span className='divider'>|</span>
        {fields.source &&
          fields.source.map((source, i) =>
            <span className='sources' key={i}>
              <Link prefetch as='report/listing' href='/updates'>
                <a>{source.shortname || source.name}</a>
              </Link>
              {i + 1 < fields.source.length &&
                <span>,</span>
              }
            </span>
        )}
      </div>
      <style jsx>{`
        .report {
          border-bottom: 1px solid ${colors.border.light}
          padding: ${measurements.baseUnit * 1.5}em 0 ${measurements.baseUnit}em 0;
          word-break: break-word;
        }
        .title {
          margin-bottom: ${measurements.baseUnit}em;
        }
        .title a {
          color: ${colors.text.dark};
          text-decoration: none;
        }
        .info a:hover, .title a:hover {
          color: ${colors.link.hover};
        }
        .info a:focus, .title a:focus {
          color: ${colors.link.focus};
        }
        .info a:hover, .info a:focus, .title a:hover, .title a:focus {
          text-decoration: underline;
        }
        .date {
          font-size: ${fontSizes.small};
          margin-bottom: ${measurements.baseUnit * 1.5}em;
        }
        .info {
          text-transform: uppercase;
          font-size: ${fontSizes.tiny};
          color: ${colors.text.light};
        }
        .divider {
          margin: 0 ${measurements.baseUnit}em;
        }
        .info a {
          display: inline-block;
          text-decoration: none;
          color: ${colors.text.light};
          padding: ${measurements.baseUnit * 0.67}em 0;
        }
        .sources + .sources {
          margin-left: ${measurements.baseUnit}em;
        }
        @media (min-width: ${breakpoints.md}) {
          .report {
            float: left;
            width: 49%;
          }
          .report:nth-child(odd) {
            margin-right: 1%;
          }
          .report:nth-child(even) {
            margin-left: 1%;
          }
        }
      `}</style>
    </div>
  )
}

export default ReportLink
