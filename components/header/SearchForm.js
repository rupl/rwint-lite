import React from 'react'
import Router from 'next/router'
import { SearchIcon } from '../icons/Icons'
import { colors, fonts, fontSizes, measurements } from '../../theme/variables'

export class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    Router.push(`/updates?search=${this.state.value}`, `/report/listing/?search=${this.state.value}`)
  }

  render () {
    return (
      <form role='search' onSubmit={this.handleSubmit}>
        <label className='sr-only' htmlFor='search'>Search for updates</label>
        <input type='search' id='search' value={this.state.value} onChange={this.handleChange} placeholder='Search for updates' />
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
            width: 100%;
            height: 62px;
            background: transparent;
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

          @media (max-width: 48em) {
            form {
              position: absolute;
              top: 0;
              left: ${measurements.baseUnit * 7}em;
              width: 65%;
            }
            input {
              height: 50px;
            }
          }
        `}</style>
      </form>
    )
  }
}

export default SearchForm
