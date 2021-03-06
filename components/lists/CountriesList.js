/**
 * Countries List component
 * Countries are grouped alphabetically
 */

import React from 'react'
import { connect } from 'react-redux'
import SimpleLink from '../links/SimpleLink'
import { breakpoints, colors, fontSizes, measurements } from '../../theme/variables'

const sortAlphabetically = (countries) => {
  countries.sort((a, b) => {
    return a.fields.name.localeCompare(b.fields.name)
  })
}

/**
 * Group countries alphabetically
 */
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

/**
 * Display search for countries
 */
const filterCountries = (countries, searchQuery) => {
  return countries.filter(country => country.fields.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
}

export class CountriesList extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      online: true
    }
  }

  handleChange (event) {
    window.location.hash = '#' + event.target.value
  }

  componentDidMount () {
    this.setState({
      online: typeof navigator !== 'undefined' && navigator.onLine
    })
  }

  render () {
    let countries = [...this.props.countries.items]
    const searchQuery = this.props.searchQuery
    if (searchQuery) {
      countries = filterCountries(countries, searchQuery)
    }
    const groupedCountries = groupCountries(countries)

    return (
      <div className='countries'>
        <div className='styled-select'>
          <label htmlFor='selectLetter'>Go to letter</label>
          <select name='selectLetter' id='selectLetter' onChange={this.handleChange}>
            {groupedCountries.map((group, i) =>
              <option key={i} value={group.id}>{group.id}</option>
            )}
          </select>
          <span className='arrow down' aria-hidden />
        </div>

        {!countries.length && this.state.online &&
          <p>No results found.</p>
        }
        {!countries.length && !this.state.online &&
          <p><em>Unable to fetch data while offline.</em></p>
        }

        {groupedCountries.map((group, i) =>
          <div className='group' key={i}>
            <h2 id={group.id}>{group.id}</h2>
            <ol>
              {group.countries.map((country, j) =>
                <li key={j}>
                  <SimpleLink link={country} />
                </li>
              )}
            </ol>
            <div className='top'>
              <a href='#main'>
                Top
                <span className='arrow' aria-hidden />
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
            width: 50px;
            height: 50px;
            line-height: 50px;
            background: ${colors.bg.dark};
            color: white;
            text-align: center;
          }
          ol {
            list-style: none;
            margin: ${measurements.baseUnit}em 0 ${measurements.baseUnit}em ${measurements.baseUnit * 8}em;
            padding: 0;
            line-height: initial;
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
          .arrow {
            width: 10px;
            height: 10px;
            display: inline-block;
            margin-left: ${measurements.baseUnit}em;
            background: url('/static/icons.svg') 0 -20px no-repeat;
            transform: rotate(-90deg);
          }
          .arrow.down {
            display: block;
            position: absolute;
            top: 14px;
            right: 6px;
            transform: rotate(90deg);
            margin: 0;
          }
          .styled-select {
            position: relative;
            width: ${measurements.baseUnit * 15}em;
            margin-top: ${measurements.baseUnit}em;
            height: ${measurements.baseUnit * 4.5}em;
            border: 1px solid ${colors.border.default};
          }
          .styled-select label {
            font-weight: bold;
            position: absolute;
            top: 0;
            left: 0;
            height: ${measurements.baseUnit * 4.5}em;
            line-height: ${measurements.baseUnit * 4.5}em;
            padding-left: ${measurements.baseUnit}em;
          }
          select {
            -webkit-appearance: none;
            background: transparent;
            border: none;
            width: 100%;
            height: ${measurements.baseUnit * 4.5}em;
            text-align-last:right;
            position: absolute;
            z-index: 1;
            opacity: 0;
            color: white;
            font-size: ${fontSizes.base};
          }
          select:focus {
            opacity: 0.5;
          }
          option {
            color: ${colors.text.dark};
          }
          @media (min-width: 280px) {
            .styled-select {
              position: absolute;
              right: 0;
              top: ${measurements.baseUnit * -6}em;
              margin-top: 0;
            }
          }
          @media (min-width: ${breakpoints.sm}) {
            ol {
              display: flex;
              flex-wrap: wrap;
            }
            li {
              margin-right: ${measurements.baseUnit}em
            }
            .top {
              bottom: 0;
            }
          }
          @media (min-width: ${breakpoints.md}) {
            .countries {
              padding-top: ${measurements.baseUnit * 2}em;
            }
            .group {
              margin-bottom: ${measurements.baseUnit * 4}em;
              padding-bottom: ${measurements.baseUnit * 4}em;
            }
            h2 {
            }
            ol {
              margin: 0 0 0 ${measurements.baseUnit * 8}em
            }
            .styled-select {
              top: ${measurements.baseUnit * -7.5}em
            }
          }
       `}</style>
      </div>
    )
  }
}

export default connect(state => state)(CountriesList)
