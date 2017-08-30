import React from 'react'
import { fonts, fontSizes, measurements } from '../../theme/variables'

class ArticleAttachments extends React.Component {
  render () {
    return (
      <div>
        <h2>{this.props.heading}</h2>
        <ul>
          {this.props.items.map((file, i) =>
            <li key={i}>
              <a href={file.url} key={i}>
                {file.description || file.filename || file.url}
              </a>
            </li>
          )}
        </ul>
        <style jsx>{`
          div {
            margin-bottom: ${measurements.baseUnit * 2}em;
          }
          h2 {
            text-transform: uppercase;
            font-family: ${fonts.body};
            font-size: ${fontSizes.small};
            margin-bottom: 4px;
          }
          ul {
            margin: 0;
            padding 0;
          }
          li {
            list-style: none;
            line-height: 1.2;
          }
          a {
            font-size: ${fontSizes.small};
            font-weight: bold;
            text-decoration: none;
            word-break: break-word;
          }
          .divider {
            padding: 0 ${measurements.baseUnit}em;
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleAttachments
