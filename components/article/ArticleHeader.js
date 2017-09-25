import formatDate from '../../helpers/formatDate'
import InfoLinks from '../links/InfoLinks'
import { breakpoints, colors, fontSizes, measurements } from '../../theme/variables'

const getTitle = (report) => {
  return report.fields.title || report.fields.name
}

const getDate = (date, type) => {
  if (type === 'job' && date.closing) {
    return `Closing date: ${formatDate(date.closing, true)}`
  }
  if (type === 'training') {
    if (!date.start && !date.end) {
      return 'Ongoing course'
    }
    if (date.start && date.end) {
      return date.start === date.end ? `On ${formatDate(date.start)}` : `From ${formatDate(date.start)} to ${formatDate(date.end)}`
    }
  }
  if (date.created) {
    return `Published on ${formatDate(date.created, true)}`
  }
}

const showInfoSection = (type) => {
  return type !== 'country'
}

const showInfoLinks = (type) => {
  return type === 'update'
}

const ArticleHeader = ({report, type}) => (
  <header>
    {getTitle(report) &&
      <h1>{getTitle(report)}</h1>
    }
    {showInfoSection(type) &&
      <div>
        <p className='header-info'>
          {report.fields.date &&
            <span className='date'>
              {getDate(report.fields.date, type)}
              {report.fields.date.registration &&
                <span className='reg'> Registration before {formatDate(report.fields.date.registration)}</span>
              }
            </span>
          }
          {report.fields.origin &&
            <a href={report.fields.origin} className='original'>View original</a>
          }
        </p>
        {showInfoLinks(type) &&
          <div className='header-info'>
            <InfoLinks countries={[report.fields.primary_country]} sources={report.fields.source} />
          </div>
        }
      </div>
    }
    <style jsx>{`
      header {
        border-bottom: 1px solid ${colors.border.highlight};
        margin-bottom: ${measurements.baseUnit * 2}em;
      }
      h1 {
        color: ${colors.text.dark};
        font-size: ${fontSizes.medium};
        margin: 0 0 ${measurements.baseUnit / 2}em 0;
      }
      .header-info {
        margin: 0 0 ${measurements.baseUnit * 1.5}em 0;
      }
      .header-info + .header-info {
        margin: 0 0 ${measurements.baseUnit * 2}em 0;
      }
      .header-info .date, .header-info a {
        font-size: ${fontSizes.small}
      }
      .date {
        margin: 0;
        line-height: 1;
        color: ${colors.text.light};
      }
      .original {
        margin-left: ${measurements.baseUnit * 2}em;
        text-decoration: none;
      }
      .original:hover, .original:focus {
        text-decoration: underline;
      }
      .reg {
        display: block;
        margin-top: ${measurements.baseUnit * 1.5}em;
      }
      @media (min-width: ${breakpoints.md}) {
        h1 {
          font-size: ${fontSizes.large};
          margin: 0 0 ${measurements.baseUnit}em 0;
        }
        .reg {
          display: inline;
          margin-top: 0;
        }
        .reg:before {
          content: "-";
          margin-left: 4px;
        }
      }
    `}</style>
  </header>
)

export default ArticleHeader
