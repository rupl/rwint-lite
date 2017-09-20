import React from 'react'
import ArticleHeader from './ArticleHeader'
import ArticleBody from './ArticleBody'
import ArticleSideBar from './ArticleSideBar'
import DescriptionBody from './DescriptionBody'
import ArticleSideBarReports from './ArticleSideBarReports'
import { primaryButton } from '../../theme/buttons'
import { breakpoints, colors, measurements } from '../../theme/variables'

export class ArticleLayout extends React.Component {
  render () {
    const {report} = this.props

    return (
      <div>
        {this.props.type !== 'country' &&
          <div className='article-container'>
            <article className='article-main'>
              <ArticleHeader report={report} type={this.props.type} />
              {this.props.type === 'disaster' &&
                <DescriptionBody report={report} />
              }
              {this.props.type !== 'disaster' &&
                <ArticleBody report={report} />
              }
            </article>
            <aside className='article-secondary'>
              <div className='sidebar'>
                <ArticleSideBar report={report} type={this.props.type} />
                {this.props.type === 'disaster' &&
                  <div>
                    <span className='divider' />
                    <ArticleSideBarReports item={report} type={this.props.type} />
                  </div>
                }
              </div>
            </aside>
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
