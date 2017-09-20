import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { breakpoints, fonts, measurements } from '../../theme/variables'

export class ArticleBody extends React.Component {
  render () {
    const {report} = this.props
    const body = report.fields['body-html'] ? sanitizeHtml(report.fields['body-html']) : ''
    const howApply = report.fields['how_to_apply-html'] ? sanitizeHtml(report.fields['how_to_apply-html']) : ''
    const regInfo = report.fields['how_to_register-html'] ? sanitizeHtml(report.fields['how_to_register-html']) : ''
    return (
      <div>
        <div className='body' dangerouslySetInnerHTML={{__html: body}} />
        {howApply &&
          <div>
            <h2>How to apply</h2>
            <div className='apply' dangerouslySetInnerHTML={{__html: howApply}} />
          </div>
        }
        {regInfo &&
          <div>
            <h2>How to register</h2>
            <div className='reg' dangerouslySetInnerHTML={{__html: regInfo}} />
          </div>
        }
        <style jsx>{`
          h2 {
            font-family: ${fonts.body};
            font-weight: bold;
            padding-bottom: ${measurements.baseUnit / 2}em;
            margin: ${measurements.baseUnit}em 0 0 0;
          }
          @media (min-width: ${breakpoints.md}) {
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
