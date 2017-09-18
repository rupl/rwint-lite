import React from 'react'
import Link from 'next/link'
import ArticleHeader from './ArticleHeader'
import ArticleBody from './ArticleBody'
import ArticleSideBar from './ArticleSideBar'
import CountryBody from './CountryBody'
import ArticleSideBarReports from './ArticleSideBarReports'
import ReportsList from '../ReportsList'
import { primaryButton } from '../../theme/buttons'
import { breakpoints, colors, measurements } from '../../theme/variables'

export class ArticleLayout extends React.Component {
  render () {
    const {report} = this.props
    const body = report.fields['body-html'] || report.fields['description-html'] || ''
    const hasInfo = this.props.type !== 'country'

    return (
      <div>
        {body &&
          <div className='article-container'>
            <article className='article-main'>
              <ArticleHeader report={report} hasInfo={hasInfo} />
              {(this.props.type === 'country' || this.props.type === 'disaster') &&
                <CountryBody report={report} />
              }
              {this.props.type !== 'country' && this.props.type !== 'disaster' &&
                <ArticleBody report={report} />
              }
            </article>
            <aside className='article-secondary'>
              <div className='sidebar'>
                {this.props.type !== 'country' &&
                  <ArticleSideBar report={report} type={this.props.type} />
                }
                {this.props.type === 'disaster' &&
                  <span className='divider' />
                }
                {(this.props.type === 'country' || this.props.type === 'disaster') &&
                  <ArticleSideBarReports item={report} type={this.props.type} />
                }
              </div>
            </aside>
          </div>
        }
        {!body &&
          <div className='article-container'>
            <ArticleHeader report={report} hasInfo={hasInfo} />
            <ReportsList headingLevel='3' />
            <div className='btn-container'>
              <Link prefetch as={`/report/listing?search=country.exact:"${report.fields.name}"`}
                href={`/updates?search=country.exact:"${report.fields.name}"`}>
                <a className='btn-primary'>
                  View more {report.fields.name} updates
                </a>
              </Link>
            </div>
          </div>
        }
        <style jsx>{primaryButton}</style>
        <style jsx>{`
          .article-container {
            padding-top: ${measurements.baseUnit * 2.25}em;
          }
          .sidebar {
            border-top: 1px solid ${colors.border.highlight};
            border-bottom: 1px solid ${colors.border.highlight};
            padding: ${measurements.baseUnit * 2}em 0 0 0;
            margin-bottom: ${measurements.baseUnit * 3}em;
          }
          .divider {
            display: block;
            margin: ${measurements.baseUnit * 2}em 0;
            border-bottom: 1px solid ${colors.border.highlight};
          }
          .btn-container {
            max-width: 320px;
            margin: ${measurements.baseUnit * 2}em auto;
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
            .btn-container {
              margin: ${measurements.baseUnit * 5}em auto;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleLayout
