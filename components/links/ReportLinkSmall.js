import Link from 'next/link'
import formatDate from '../../helpers/formatDate'
import { colors, fontSizes, measurements } from '../../theme/variables'

const ReportLinkSmall = ({report}) => (
  <Link as={`/report/${report.id}/${report.urlCountry}/${report.urlTitle}`} href={`/report?id=${report.id}`}>
    <a>
      <span className='title'>{report.fields.title}</span>
      {report.fields.date &&
        <span className='date'>{formatDate(report.fields.date.created)}</span>
      }
      <style jsx>{`
        a {
          text-decoration: none;
          display: block;
          padding: ${measurements.baseUnit}em 0;
        }
        a:hover .title {
          text-decoration: underline;
        }
        span {
          font-size: ${fontSizes.small};
        }
        .title {
          font-weight: bold;
          display: block;
          line-height: 1.4;
        }
        .date {
          color: ${colors.text.light};

        }
      `}</style>
    </a>
  </Link>
)

export default ReportLinkSmall
