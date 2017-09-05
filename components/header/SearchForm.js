import React from 'react'
import Router from 'next/router'
import { SearchIcon } from '../icons/Icons'
import { breakpoints, colors, fonts, fontSizes, measurements } from '../../theme/variables'

export class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    let value = ''
    let placeholder = 'Search for updates'
    let search = 'updates'
    this.state = {
      value,
      placeholder,
      search
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (Router && Router.router) {
      if (Router.router.route === '/countries') {
        let placeholder = 'Search for countries'
        let search = 'countries'
        this.setState({
          placeholder,
          search
        })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const value = Router.router.query && Router.router.query.search ? Router.router.query.search : ''
    this.setState({
      value: value
    })
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    const searchPath = this.state.search === 'updates' ? '/report/listing/?search=' : '/country/listing/?search='
    const searchPathAs = this.state.search === 'updates' ? '/updates?search=' : '/countries?search='
    const searchTerm = this.state.value.replace(/\W+/g, ' ')
    Router.push(`${searchPathAs}${searchTerm}`, `${searchPath}${searchTerm}`)
  }

  render () {
    return (
      <form role='search' onSubmit={this.handleSubmit}>
        <label className='sr-only' htmlFor='search'>{this.state.placeholder}</label>
        <input type='search' id='search' value={this.state.value} onChange={this.handleChange} placeholder={this.state.placeholder} />
        <button type='submit'>
          <SearchIcon />
          <span className='sr-only'>Search</span>
        </button>
        <style jsx>{`
          form {
            float: left;
            position: relative;
            height: 100%;
          }
          input {
            border: none;
            border-bottom: 2px solid transparent;
            border-radius: none;
            box-shadow: none;
            -webkit-appearance: none;
            font-family: ${fonts.body};
            font-size: ${fontSizes.base};
            padding: ${measurements.baseUnit * 1.5}em ${measurements.baseUnit * 1.5}em ${measurements.baseUnit * 1.5}em ${measurements.baseUnit * 3.5}em;
            width: 400px;
            height: 62px;
            background: transparent;
            color: ${colors.text.light};
          }
          input:focus {
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

          @media (min-width: ${breakpoints.lg}) {
            input {
              width: 270px;
            }
          }

          @media (min-width: ${breakpoints.xl}) {
            input {
              width: 380px;
            }
          }

          @media (max-width: 48em) {
            form {
              position: absolute;
              top: 0;
              left: ${measurements.baseUnit * 7}em;
              width: 65%;
            }
            input {
              height: 50px;
              width: auto;
            }
          }
        `}</style>
      </form>
    )
  }
}

export default SearchForm
