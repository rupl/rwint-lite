import formatDate from '../../helpers/formatDate'
import InfoLinks from '../links/InfoLinks'
import { smallButton } from '../../theme/buttons'
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

const ArticleHeader = ({report, type = 'report'}) => (
  <header>
    {getTitle(report) &&
      <h1>{getTitle(report)}</h1>
    }
    <div>
      <p className='info'>
        {report.fields.date &&
          <span className='date'>
            {getDate(report.fields.date, type)}
            {report.fields.date.registration &&
              <span className='reg'> Registration before {formatDate(report.fields.date.registration)}</span>
            }
          </span>
        }
        {report.fields.origin &&
          <a href={report.fields.origin} className='btn-small'>
            View original
            <span className='arrow' aria-hidden />
          </a>
        }
      </p>
      {type === 'report' &&
        <div className='info'>
          <InfoLinks countries={[report.fields.primary_country]} sources={report.fields.source} />
        </div>
      }
    </div>
    <style jsx>{smallButton}</style>
    <style jsx>{`
      header {
        border-bottom: 1px solid ${colors.border.highlight};
        margin-bottom: ${measurements.baseUnit * 2}em;
      }
      h1 {
        color: ${colors.text.dark};
        font-size: ${fontSizes.mediumLarge};
        margin: 0 0 ${measurements.baseUnit / 2}em 0;
      }
      .info {
        margin: 0 0 ${measurements.baseUnit}em 0;
      }
      .info + .info {
        margin: 0 0 ${measurements.baseUnit * 2}em 0;
      }
      .info .date, .info a {
        font-size: ${fontSizes.small}
      }
      .date {
        margin: 0;
        line-height: 1;
        color: ${colors.text.light};
      }
      .btn-small {
        display: block;
        width: 108px;
        margin-top: ${measurements.baseUnit / 2}em;
        text-align: left;
      }
      .arrow {
        display: inline-block;
        width: 10px;
        height: 10px;
        line-height: 10px;
        margin-left: 4px;
        background: url('/static/icons.svg') 0 -20px no-repeat;
      }
      .reg {
        display: block;
        margin-top: ${measurements.baseUnit * 1.5}em;
      }
      @media (min-width: ${breakpoints.sm}) {
        .info {
          display: flex;
          justify-content: space-between;
        }
        .btn-small {
          display: inline-block;
          margin-top: 0;
          width: auto;
          line-height: 1;
        }
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
