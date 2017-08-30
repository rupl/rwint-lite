import React from 'react'
import Link from 'next/link'
import ArticleAttachments from './ArticleAttachments'
import ArticleInfo from './ArticleInfo'
import { primaryButton } from '../../theme/buttons'
import { colors, measurements } from '../../theme/variables'

class ArticleSideBar extends React.Component {
  render () {
    const {report} = this.props
    return (
      <div>
        <div className='inner'>
          {report.fields.country &&
            <ArticleInfo heading='Country' type='country' items={report.fields.country} />
          }
          {report.fields.source &&
            <ArticleInfo heading='Source' type='source' items={report.fields.source} />
          }
          {report.fields.disaster &&
            <ArticleInfo heading='Disaster' type='disaster' items={report.fields.disaster} />
          }
          {report.fields.theme &&
            <ArticleInfo heading='Theme' type='theme' items={report.fields.theme} />
          }
          {report.fields.disaster_type &&
            <ArticleInfo heading='Disaster type' type='disaster_type' items={report.fields.disaster_type} />
          }
          {report.fields.vulnerable_groups &&
            <ArticleInfo heading='Vulnerable group' type='vulnerable_groups' items={report.fields.vulnerable_groups} />
          }
          {report.fields.format &&
            <ArticleInfo heading='Format' type='format' items={report.fields.format} />
          }
          {report.fields.language &&
            <ArticleInfo heading='Language' type='language' items={report.fields.language} />
          }
          {report.fields.file &&
            <ArticleAttachments heading='Attachment' items={report.fields.file} />
          }
        </div>
        <Link prefetch as='report/listing' href='/updates'>
          <a>View latest updates</a>
        </Link>
        <style jsx>{`
          .inner {
            border-top: 1px solid ${colors.border.highlight};
            border-bottom: 1px solid ${colors.border.highlight};
            padding: ${measurements.baseUnit * 2}em 0 0 0;
            margin-bottom: ${measurements.baseUnit * 3}em;
          }
          a {
            ${primaryButton}
          }
          a:hover {
            opacity: 0.9;
            color: white;
          }
          a:focus {
            outline: -webkit-focus-ring-color auto 5px;
            background: ${colors.bg.primaryButton};
            color: white;
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleSideBar
