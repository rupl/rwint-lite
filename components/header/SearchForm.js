/**
 * Search Form component
 * Searchs different types of content depending on the current page
 */

import React from 'react'
import Router from 'next/router'
import { breakpoints, colors, fonts, fontSizes, measurements } from '../../theme/variables'

/**
 * Set placeholder text based on current page type
 */
function setPlaceHolder (type) {
  if (type === 'report') {
    return 'Search for updates'
  }
  if (type === 'country') {
    return 'Search for countries'
  }
  if (type === 'training') {
    return 'Search for training'
  }
  return `Search for ${type}s`
}

export class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    const value = props.query ? props.query : ''
    let placeholder = 'Search for updates'
    let searchType = 'report'
    this.state = {
      value,
      placeholder,
      searchType
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (Router && Router.router) {
      const value = Router.router.query && Router.router.query.search ? Router.router.query.search : ''

      const route = Router.router.route

      /**
       * Update what is being searched (searchType) and the placeholder text if no on home or report pages
       */
      if (route !== '/' && route !== '/report-listing' && route !== '/report') {
        let searchType = route.replace('/', '')
        searchType = searchType.replace('-listing', '')
        this.setState({
          placeholder: setPlaceHolder(searchType),
          searchType,
          value
        })
      }
    }
  }

  /**
   * Set the search input value from the search query in the route
   */
  componentWillReceiveProps (nextProps) {
    const value = Router.router.query && Router.router.query.search ? Router.router.query.search : ''
    this.setState({
      value: value
    })
  }

  /**
   * Update state when serch input value is changed
   */
  handleChange (event) {
    this.setState({value: event.target.value})
  }

  /**
   * Set and go to correct path based on search type and value
   */
  handleSubmit (event) {
    event.preventDefault()
    const searchPathAs = `/${this.state.searchType}/listing?search=`
    const searchPath = `/${this.state.searchType}-listing?search=`
    let searchTerm = this.state.value
    // Handle searching for 10+ years experience
    if (searchTerm.indexOf('experience.exact') !== -1 && searchTerm.indexOf('+ years') !== -1) {
      searchTerm = searchTerm.replace('+ years', 'plus years')
    }
    const regEx = searchTerm.indexOf('.exact:') !== -1 ? /([!*+\-=<>&|()[\]{}^~?\\/])+/g : /([!*+\-=<>&|()[\]{}^~?:\\/"])+/g
    searchTerm = searchTerm.replace(regEx, ' ')
    Router.push(`${searchPath}${searchTerm}`, `${searchPathAs}${searchTerm}`)
  }

  render () {
    return (
      <form role='search' className='search-form' onSubmit={this.handleSubmit}>
        <label className='sr-only' htmlFor='search'>{this.state.placeholder}</label>
        <input type='search' id='search' className={`${this.state.value ? 'active' : ''}`} value={this.state.value} onChange={this.handleChange} placeholder={this.state.placeholder} />
        <button type='submit'>
          <span className='icon' aria-hidden />
          <span className='sr-only'>Search</span>
        </button>
        <style jsx>{`
          form {
            float: left;
            position: relative;
            height: 100%;
            overflow: hidden;
          }
          input {
            border: none;
            border-bottom: 2px solid transparent;
            border-radius: 0;
            box-shadow:none;
            -webkit-appearance: none;
            font-family: ${fonts.body};
            font-size: ${fontSizes.base};
            padding: ${measurements.baseUnit * 1.5}em ${measurements.baseUnit * 1.5}em ${measurements.baseUnit * 1.5}em ${measurements.baseUnit * 3.5}em;
            width: 400px;
            height: 62px;
            background: transparent;
            color: ${colors.text.light};
          }
          input:focus, input.active {
            outline: none;
            background: ${colors.link.focusBg};
            border-color: ${colors.bg.headerFooter};
          }
          button {
            background: none;
            border: none;
            -webkit-appearance: none;
            width: 22px;
            height: 22px;
            position: absolute;
            padding: 0;
            left: ${measurements.baseUnit * 0.5}em;
            top: 50%;
            margin-top: -12px;
          }
          ::-webkit-input-placeholder {
            font-style: italic;
          }
          ::-moz-placeholder {
            font-style: italic;
          }
          :-ms-input-placeholder {
            font-style: italic;
          }
          :-moz-placeholder {
            font-style: italic;
          }
          .icon {
            display: inline-block;
            width: 14px;
            height: 14px;
            background: url('/static/icons.svg') 0 -54px no-repeat;
          }

          @media (min-width: ${breakpoints.lg}) {
            input {
              width: 220px;
            }
          }

          @media (min-width: ${breakpoints.xl}) {
            input {
              width: 350px;
            }
          }

          @media (max-width: 767px) {
            form {
              position: absolute;
              top: 0;
              left: ${measurements.baseUnit * 7}em;
              width: 65%;
            }
            input {
              height: 50px;
              width: 100%;
            }
          }
        `}</style>
      </form>
    )
  }
}

export default SearchForm
