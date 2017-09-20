import React from 'react'
import Link from 'next/link'
import ArticleAttachments from './ArticleAttachments'
import ArticleInfo from './ArticleInfo'
import { primaryButton } from '../../theme/buttons'
import { breakpoints, measurements } from '../../theme/variables'

class ArticleSideBar extends React.Component {
  render () {
    const {report} = this.props
    return (
      <div>
        {report.fields.country &&
          <ArticleInfo heading='Country' searchType={this.props.type} type='country' items={report.fields.country} />
        }
        {report.fields.city &&
          <ArticleInfo heading='City' searchType={this.props.type} type='city' items={report.fields.city} />
        }
        {report.fields.source &&
          <ArticleInfo heading='Source' searchType={this.props.type} type='source' items={report.fields.source} />
        }
        {report.fields.career_categories &&
          <ArticleInfo heading='Career category' searchType={this.props.type} type='career_categories' items={report.fields.career_categories} />
        }
        {report.fields.experience &&
          <ArticleInfo heading='Years of experience' searchType={this.props.type} type='experience' items={report.fields.experience} />
        }
        {report.fields.disaster &&
          <ArticleInfo heading='Disaster' searchType={this.props.type} type='disaster' items={report.fields.disaster} />
        }
        {report.fields.theme &&
          <ArticleInfo heading='Theme' searchType={this.props.type} type='theme' items={report.fields.theme} />
        }
        {report.fields.disaster_type &&
          <ArticleInfo heading='Disaster type' searchType={this.props.type} type='disaster_type' items={report.fields.disaster_type} />
        }
        {report.fields.type &&
          <ArticleInfo heading={this.props.type === 'disaster' ? 'Disaster type' : 'type'} searchType={this.props.type} type='type' items={report.fields.type} />
        }
        {report.fields.vulnerable_groups &&
          <ArticleInfo heading='Vulnerable group' searchType={this.props.type} type='vulnerable_groups' items={report.fields.vulnerable_groups} />
        }
        {report.fields.format &&
          <ArticleInfo heading='Format' searchType={this.props.type} type='format' items={report.fields.format} />
        }
        {report.fields.language &&
          <ArticleInfo heading='Language' searchType={this.props.type} type='language' items={report.fields.language} />
        }
        {report.fields.file &&
          <ArticleAttachments heading='Attachment' items={report.fields.file} />
        }
        {this.props.type === 'update' &&
          <Link prefetch as='report/listing' href='/updates'>
            <a className='btn-primary'>View latest updates</a>
          </Link>
        }
        <style jsx>{primaryButton}</style>
        <style jsx>{`
          .btn-primary {
            margin-bottom: ${measurements.baseUnit * 2}em;
          }
          @media (min-width: ${breakpoints.md}) {
            .btn-primary {
              display: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleSideBar

// city
// career category
// years of experience
// type
