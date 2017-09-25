import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { breakpoints, colors, fonts, measurements } from '../../theme/variables'

export class ArticleBody extends React.Component {
  render () {
    const {report} = this.props
    const body = report.fields && report.fields['body-html'] ? sanitizeHtml(report.fields['body-html']) : ''
    const howApply = report.fields && report.fields['how_to_apply-html'] ? sanitizeHtml(report.fields['how_to_apply-html']) : ''
    const regInfo = report.fields && report.fields['how_to_register-html'] ? sanitizeHtml(report.fields['how_to_register-html']) : ''
    const feeInfo = report.fields && report.fields.fee_information ? report.fields.fee_information : ''

    return (
      <div>
        <div className='body' dangerouslySetInnerHTML={{__html: body}} />
        {howApply &&
          <div className='block'>
            <h2>How to apply</h2>
            <div className='apply' dangerouslySetInnerHTML={{__html: howApply}} />
          </div>
        }
        {feeInfo &&
          <div className='fee'>
            <h2>Fee information</h2>
            <p>{feeInfo}</p>
          </div>
        }
        {regInfo &&
          <div className='block'>
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
          .block {
            border-top: 1px solid ${colors.border.highlight};
            border-bottom: 1px solid ${colors.border.highlight};
            background: ${colors.bg.body};
            padding: ${measurements.baseUnit}em ${measurements.baseUnit * 2}em;
            margin: ${measurements.baseUnit * 3}em 0;
          }
          @media (min-width: ${breakpoints.md}) {
            h2 {
              margin: ${measurements.baseUnit}em 0 ${measurements.baseUnit}em 0;
            }
            .block {
              margin-bottom: 0;
            }
            .block p:last-child {
              margin-bottom: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleBody
