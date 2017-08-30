import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Arrow } from './icons/Icons'
import { breakpoints, colors, fontSizes, measurements } from '../theme/variables'

const sortAlphabetically = (countries) => {
  countries.sort((a, b) => {
    return a.fields.name.localeCompare(b.fields.name)
  })
}

const groupCountries = (countries) => {
  let grouped = []
  sortAlphabetically(countries)

  for (let i in countries) {
    let letter = countries[i].fields.name.charAt(0)
    letter = letter.toUpperCase()
    var index = grouped.map(function (x) { return x.id }).indexOf(letter)
    if (index === -1) {
      grouped.push({id: letter, countries: [countries[i]]})
    } else {
      grouped[index].countries.push(countries[i])
    }
  }
  return grouped
}

export class CountriesList extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    window.location.hash = '#' + event.target.value
  }

  render () {
    const groupedCountries = groupCountries(this.props.countries.items)

    return (
      <div className='countries'>

        <div className='styled-select'>
          <label htmlFor='selectLetter'>Go to letter</label>
          <select name='selectLetter' onChange={this.handleChange}>
            <option />
            {groupedCountries.map((group, i) =>
              <option key={i} value={group.id}>{group.id}</option>
            )}
          </select>
          <span><Arrow direction='down' /></span>
        </div>

        {groupedCountries.map((group, i) =>
          <div className='group' key={i}>
            <h2 id={group.id}>{group.id}</h2>
            <ol>
              {group.countries.map((country, j) =>
                <li key={j}>
                  <Link as={`/country/${country.id}/${country.urlName}`}
                    href={`/country?id=${country.id}&name=${country.urlName}`}>
                    <a>{country.fields.name}</a>
                  </Link>
                </li>
              )}
            </ol>
            <div className='top'>
              <a href='#main'>
                Top
                <span>
                  <Arrow />
                </span>
              </a>
            </div>
          </div>
        )}
        <style jsx>{`
          .countries {
            position: relative;
          }
          .group {
            position: relative;
            margin: 0 0 ${measurements.baseUnit * 5}em 0;
          }
          h2 {
            font-size: ${fontSizes.large};
            position: absolute;
            top: 0;
            left: 0;
            width: ${measurements.baseUnit * 2.5}em;
            height: ${measurements.baseUnit * 2.5}em;
            line-height: ${measurements.baseUnit * 2.5}em;
            background: ${colors.bg.dark};
            color: white;
            text-align: center;
          }
          ol {
            list-style: none;
            margin: ${measurements.baseUnit}em 0 ${measurements.baseUnit}em ${measurements.baseUnit * 6}em;
            padding: 0;
          }
          li {
            border-bottom: 1px solid ${colors.border.light};
          }
          a {
            display: block;
            padding: ${measurements.baseUnit}em ${measurements.baseUnit}em
            text-decoration: none;
          }
          a:hover, a:focus {
            text-decoration: underline;
          }
          .top {
            position: absolute;
            right: 0;
            bottom: ${measurements.baseUnit * -4}em
          }
          .top a {
            font-size: ${fontSizes.small};
          }
          .top span {
            width: 10px;
            height: 10px;
            display: inline-block;
            margin-left: 8px;
          }
          .styled-select {
            width: 88px;
            position: absolute;
            right: 0;
            top: ${measurements.baseUnit * -5}em;
          }
          .styled-select label {
            color: ${colors.text.highlight};
            font-size: ${fontSizes.small};
            position: absolute;
            top: 0;
            left: 0;
            height: ${measurements.baseUnit * 4}em;
            line-height: ${measurements.baseUnit * 4}em;
          }
          .styled-select span {
            width:10px;
            height:10px;
            display: block;
            position: absolute;
            top: 6px;
            right: 2px
          }
          select {
            -webkit-appearance: none;
            background: transparent;
            border: none;
            width: 100%;
            height: ${measurements.baseUnit * 4.5}em;
            padding: 0 0 0 2px;;
            text-align-last:right;
            position: absolute;
            z-index: 1;
            opacity: 0;
            color: white;
          }
          select:focus {
            opacity: 0.5;
          }
          option {
            color: ${colors.text.dark};
          }
          @media (min-width: ${breakpoints.sm}) {
            ol {
              display: flex;
              flex-wrap: wrap;
            }
            li {
              width: 50%;
              border: none;
            }
          }
          @media (min-width: ${breakpoints.md}) {
            .countries {
              padding-top: ${measurements.baseUnit * 2}em;
            }
            .group {
              margin-bottom: ${measurements.baseUnit * 4}em;
              padding-bottom: ${measurements.baseUnit * 4}em;
              min-height: ${measurements.baseUnit * 5}em;
              border-bottom: 1px solid ${colors.border.light};
            }
            h2 {
            }
            ol {
              margin: 0 0 0 ${measurements.baseUnit * 8}em
            }
            li {
              width: 33.3%;
              padding-right: ${measurements.baseUnit * 2}em
            }
            .styled-select {
              top: ${measurements.baseUnit * -6.5}em
            }
          }
       `}</style>
      </div>
    )
  }
}

export default connect(state => state)(CountriesList)
