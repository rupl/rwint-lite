import React from 'react'
import sanitizeHtml from 'sanitize-html'
import formatDate from '../../helpers/formatDate'
import ArticleSideBar from './ArticleSideBar'
import InfoLinks from '../links/InfoLinks'
import { breakpoints, colors, fonts, fontSizes, measurements } from '../../theme/variables'

export class ArticleBody extends React.Component {
  render () {
    const {report} = this.props
    const body = report.fields['body-html'] ? sanitizeHtml(report.fields['body-html']) : ''

    return (
      <div className='article-container'>
        <article className='article-main'>
          <header>
            {report.fields.title &&
              <h1>{report.fields.title}</h1>
            }
            <p className='header-info'>
              {report.fields.date && report.fields.date.created &&
                <span className='date'>Published on {formatDate(report.fields.date.created, true)}</span>
              }
              {report.fields.origin &&
                <a href={report.fields.origin} className='original'>View original</a>
              }
            </p>
            <div className='header-info'>
              <InfoLinks country={report.fields.primary_country} sources={report.fields.source} />
            </div>
          </header>
          {body &&
            <div className='body' dangerouslySetInnerHTML={{__html: body}} />
          }
        </article>
        <aside className='article-secondary'>
          <ArticleSideBar report={report} />

        </aside>
        <style jsx>{`
          .article-container {
            padding-top: ${measurements.baseUnit * 2.25}em;
          }
          header {
            border-bottom: 1px solid ${colors.border.highlight};
            padding-bottom: ${measurements.baseUnit * 2}em;
            margin-bottom: ${measurements.baseUnit * 2}em;
          }
          h1 {
            color: ${colors.text.dark};
            font-size: ${fontSizes.medium};
          }
          .header-info {
            margin: ${measurements.baseUnit * 1.5}em 0 0 0;
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
          h2 {
            font-family: ${fonts.body};
            font-weight: bold;
            padding-bottom: ${measurements.baseUnit / 2}em;
            margin: ${measurements.baseUnit}em 0 0 0;
          }
          @media (min-width: ${breakpoints.md}) {
            .article-container {
              padding-top: ${measurements.baseUnit * 4}em;
              overflow: auto;
            }
            .article-main {
              width: 70%;
              float: left;
              padding-right: ${measurements.baseUnit * 4}em;
            }
            .article-secondary {
              width: 30%;
              float: left;
            }
            h1 {
              font-size: ${fontSizes.large};
              margin: 0 0 ${measurements.baseUnit}em 0;
            }
            h2 {
              margin: ${measurements.baseUnit}em 0 ${measurements.baseUnit}em 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleBody
