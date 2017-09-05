import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { breakpoints, colors, fonts, measurements } from '../../theme/variables'

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

const formatImg = (li) => {
  let imgs = li.split('<img')
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].indexOf('src=') !== -1) {
      imgs[i] = `<img alt="${getAltText(li)}" ${imgs[i]}`
    }
  }

  return imgs.join('')
}

const formatLinks = (li) => {
  let links = li.split('<a')
  for (let i = 0; i < links.length; i++) {
    if (links[i].indexOf('href') !== -1) {
      const startPoint = links[i].indexOf('<a>') + '<a>'.length
      const endPoint = links[i].indexOf('</a>')
      const link = links[i].substring(startPoint, endPoint)

      if (link.indexOf('img') !== -1) {
        links[i] = `<a class="tb-img" ${links[i]}`
      } else {
        links[i] = `<a ${links[i]}`
      }
    }
  }
  return links.join('')
}

const formatBodyHtml = (body) => {
  let formattedBody = body.split('h3').join('h2')
  formattedBody = formattedBody.split('<li>')
  for (let i = 0; i < formattedBody.length; i++) {
    if (formattedBody[i].indexOf('</li>') !== -1) {
      if (formattedBody[i].indexOf('img') !== -1) {
        formattedBody[i] = `<li class="has-img">${formattedBody[i]}`
        formattedBody[i] = formatLinks(formattedBody[i])
        formattedBody[i] = formatImg(formattedBody[i])
      } else {
        formattedBody[i] = `<li>${formattedBody[i]}`
      }
    }
  }

  return formattedBody.join('')
}

export class CountryBody extends React.Component {
  render () {
    const {report} = this.props
    let body = report.fields['description-html'] ? formatBodyHtml(report.fields['description-html']) : ''
    body = sanitizeHtml(body, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h2' ]),
      allowedAttributes: {img: ['src', 'width', 'height', 'alt'], li: ['class'], a: ['href', 'class']}
    })

    return (
      <div>
        <div className='country-report' dangerouslySetInnerHTML={{__html: body}} />
        <style jsx global>{`
          .has-img {
            display: flex;
            overflow: auto'
          }
          .has-img p {
            display: flex;
          }
          .has-img img, .has-img .tb-img {
            order: -1;
            margin-left: 0;
            margin-right: ${measurements.baseUnit}em;
          }
          .has-img .tb-img img {
            margin-right: 0;
          }
          .has-img img {
            overflow: hidden;
            position: relative;
          }
          .has-img img:after {
            content: "Image not found";
            position: absolute;
            background: white;
            border: 1px solid ${colors.border.default};
            text-align: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
          }
          .has-img a {
            margin-left: ${measurements.baseUnit}em;
          }
          .tb-img:focus {
            background: none;
            outline: -webkit-focus-ring-color auto 5px;
          }
          .country-report ul {
            padding: 0;
          }
          .country-report li {
            margin-bottom: ${measurements.baseUnit}em;
            clear: both;
          }
          .country-report li p {
            margin: 0;
          }
          .country-report h2 {
            font-family: ${fonts.body};
            font-weight: bold;
            padding-bottom: ${measurements.baseUnit / 2}em;
            margin: ${measurements.baseUnit}em 0 0 0;
            clear: both;
          }
          .country-report img {
            float: left;
          }
          @media (min-width: ${breakpoints.md}) {
            .country-report h2 {
              margin: ${measurements.baseUnit}em 0 ${measurements.baseUnit}em 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default CountryBody
