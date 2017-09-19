import React from 'react'
import Router from 'next/router'
import { SearchIcon } from '../icons/Icons'
import { breakpoints, colors, fonts, fontSizes, measurements } from '../../theme/variables'

export class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    const value = props.query ? props.query : ''
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
      const value = Router.router.query && Router.router.query.search ? Router.router.query.search : ''

      const route = Router.router.route
      if (route !== '/' && route !== '/updates' && route !== '/update') {
        let search = route.replace('/', '')
        if (route === '/disaster') {
          search = 'disasters'
        }
        if (route === '/job') {
          search = 'jobs'
        }
        if (route === '/training') {
          search = 'trainings' // lets pretend this is actually the plural
        }
        let placeholder = `Search for ${search}`
        if (route === '/training' || route === '/trainings') {
          placeholder = `Search for training`
        }
        this.setState({
          placeholder,
          search,
          value
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
    const paths = {
      country: {
        href: '/countries',
        as: '/country/listing'
      },
      countries: {
        href: '/countries',
        as: '/country/listing'
      },
      disaster: {
        href: '/disasters',
        as: '/disaster/listing'
      },
      disasters: {
        href: '/disasters',
        as: '/disaster/listing'
      },
      job: {
        href: '/jobs',
        as: '/job/listing'
      },
      jobs: {
        href: '/jobs',
        as: '/job/listing'
      },
      training: {
        href: '/trainings',
        as: '/training/listing'
      },
      trainings: {
        href: '/trainings',
        as: '/training/listing'
      },
      report: {
        href: '/updates',
        as: '/report/listing'
      },
      updates: {
        href: '/updates',
        as: '/report/listing'
      }
    }
    const searchPathAs = `${paths[this.state.search].as}?search=`
    const searchPath = `${paths[this.state.search].href}?search=`
    const searchTerm = this.state.value.replace(/([!*+\-=<>&|()[\]{}^~?:\\/"])+/g, ' ')
    Router.push(`${searchPath}${searchTerm}`, `${searchPathAs}${searchTerm}`)
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
