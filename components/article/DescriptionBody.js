/**
 * Description Body component
 * Displays the body content for Disaster pages
 */

import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { breakpoints, fonts, fontSizes, measurements } from '../../theme/variables'

/**
 * Get alt text for an image.
* Uses the document description as the image alt text if present.
 * Uses the url as alt text for image links with no description.
 */
const getAltText = (str) => {
  const startPoint = str.indexOf('<strong>') + '<strong>'.length
  const endPoint = str.indexOf('</strong>')

  if (str.indexOf('<strong>') !== -1) {
    return str.substring(startPoint, endPoint)
  }

  const hrefs = str.split('href="')
  const href = hrefs[1].substring(0, hrefs[1].indexOf('"'))
  if (href.substring(0, 4) === 'http') {
    return `Link to ${href}`
  }
  return 'Link'
}

/**
 * Add alt text to images.
 */
const formatImg = (li) => {
  let imgs = li.split('<img')
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].indexOf('src=') !== -1) {
      imgs[i] = `<img alt="${getAltText(li)}" ${imgs[i]}`
    } else if (imgs[i].indexOf('</a>') !== -1) {
      imgs[i] = `<img src="" alt="${getAltText(li)}" ${imgs[i]}`
    }
  }

  return imgs.join('')
}

/**
 * Add class to Useful links lists
 */
const formatUsefulLinks = (body) => {
  let sections = body.split('<h2>')
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].indexOf('Useful Links') !== -1) {
      sections[i] = sections[i].replace('<ul>', '<ul class="links-list">')
    }
  }
  return sections.join('<h2>')
}

/**
 * Format the HTML
 * Changes h3s to h2s. Formats useful links lists and images.
 */
const formatBodyHtml = (body) => {
  let formattedBody = body.split('h3').join('h2')
  formattedBody = formatUsefulLinks(formattedBody)
  formattedBody = formattedBody.split('<li>')
  for (let i = 0; i < formattedBody.length; i++) {
    if (formattedBody[i].indexOf('</li>') !== -1) {
      if (formattedBody[i].indexOf('img') !== -1) {
        formattedBody[i] = `<li>${formatImg(formattedBody[i])}`
      } else {
        formattedBody[i] = `<li>${formattedBody[i]}`
      }
    }
  }

  return formattedBody.join('')
}

export class DescriptionBody extends React.Component {
  render () {
    const {report} = this.props
    let body = report.fields && report.fields['description-html'] ? formatBodyHtml(report.fields['description-html']) : ''
    body = sanitizeHtml(body, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h2' ]),
      allowedAttributes: {img: ['src', 'width', 'height', 'alt'], li: ['class'], a: ['href', 'class'], ul: ['class']}
    })

    return (
      <div>
        <div className='description-body' dangerouslySetInnerHTML={{__html: body}} />
        <style jsx global>{`
          .description-body img {
            display: block;
            overflow: hidden;
          }
          .description-body ul {
            padding: 0;
          }
          .description-body ul.links-list {
            padding-left: ${measurements.baseUnit * 3}em;
          }
          .description-body ul.links-list li {
            display: list-item;
          }
          .description-body li {
            margin-bottom: ${measurements.baseUnit}em;
            clear: both;
          }
          .description-body li p {
            margin: 0;
          }
          .description-body h2 {
            font-family: ${fonts.body};
            font-weight: bold;
            font-size: ${fontSizes.medium};
            padding-bottom: ${measurements.baseUnit / 2}em;
            margin: ${measurements.baseUnit}em 0 0 0;
            clear: both;
          }
          .links-list img {
            display: inline-block;
          }
          @media (min-width: ${breakpoints.md}) {
            .description-body h2 {
              margin: ${measurements.baseUnit * 2.5}em 0 ${measurements.baseUnit}em 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default DescriptionBody
