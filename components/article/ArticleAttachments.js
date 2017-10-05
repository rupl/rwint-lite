import React from 'react'
import formatFileLinkText from '../../helpers/attachments'
import { fonts, fontSizes, measurements } from '../../theme/variables'

class ArticleAttachments extends React.Component {
  render () {
    const heading = this.props.items.length > 1 ? `${this.props.heading}s` : this.props.heading
    return (
      <div>
        <h2>{heading}</h2>
        <ul>
          {this.props.items.map((file, i) =>
            <li key={i}>
              <a href={file.url} key={i}>
                {formatFileLinkText(file)}
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
          a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    )
  }
}

export default ArticleAttachments
