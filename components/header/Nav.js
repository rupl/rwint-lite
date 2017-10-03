import React from 'react'
import Link from 'next/link'
import { Cancel, Menu } from '../icons/Icons'
import { breakpoints, colors, measurements } from '../../theme/variables'
import Router from 'next/router'

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      activeLink: ''
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  componentDidMount () {
    this.setState({
      activeLink: Router.route
    })
  }
  render () {
    return (
      <div>
        <nav className='site-nav' role='navigation' aria-hidden={!this.state.isOpen}>
          <ul className='nav'>
            <li className='item'>
              <Link prefetch as='/report/listing' href='/report-listing'>
                <a className={`link ${(this.state.activeLink === '/report-listing' || this.state.activeLink === '/report') ? 'link--active' : ''}`}>
                  Updates
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link prefetch as='/country/listing' href='/country-listing'>
                <a className={`link ${(this.state.activeLink === '/country-listing' || this.state.activeLink === '/country') ? 'link--active' : ''}`}>
                  Countries
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link prefetch as='/disaster/listing' href='/disaster-listing'>
                <a className={`link ${(this.state.activeLink === '/disaster-listing' || this.state.activeLink === '/disaster') ? 'link--active' : ''}`}>
                  Disasters
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link prefetch as='/job/listing' href='/job-listing'>
                <a className={`link ${(this.state.activeLink === '/job-listing' || this.state.activeLink === '/job') ? 'link--active' : ''}`}>
                  Jobs
                </a>
              </Link>
            </li>
            <li className='item'>
              <Link prefetch as='/training/listing' href='/training-listing'>
                <a className={`link ${(this.state.activeLink === '/training-listing' || this.state.activeLink === '/training') ? 'link--active' : ''}`}>
                  Training
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <button type='button' className='toggle' onClick={this.toggle}>
          <span className='toggle-cancel'>
            <Cancel />
          </span>
          <span className='toggle-menu'>
            <Menu />
          </span>
          <span className='sr-only'>Main menu</span>
        </button>
        <style jsx>{`
          .link {
            display: block;
            line-height: 1;
            text-decoration: none;
            position: relative;
            color: ${colors.text.header};
            height: ${measurements.baseUnit * 7.5}em;
            padding: ${measurements.baseUnit * 3}em ${measurements.baseUnit * 2}em;
          }
          .nav {
            list-style: none;
            margin: 0;
            padding: 0;
            float: right;
          }
          .item {
            position: relative;
            text-transform: uppercase;
            display: inline-block;
            border: none;
          }
          .link:after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            border-bottom: 2px solid transparent;
            transition: border-color 0.3s ease;
          }
          .link:hover, .link:focus {
            background: ${colors.link.focusBg};
            outline: none;
          }
          .link:hover:after, .link:focus:after, .link--active:after {
            border-color: ${colors.bg.headerFooter};
          }
          .cd-active .link {
            font-weight: bold;
          }
          .cd-active .link:after {
            border-color: #${colors.bg.headerFooter};
          }
          @media (max-width: ${breakpoints.lg}) {
            .toggle {
              border: none;
              background: white;
              width: ${measurements.baseUnit * 5}em;
              height: ${measurements.baseUnit * 5}em;
              position: absolute;
              top: ${measurements.baseUnit / 2}em;
              right: ${measurements.baseUnit}em;
              padding: 0;
              line-height: 0;
            }
            .site-nav {
              top: ${measurements.baseUnit * 6}em;
              width: 100%;
              right: 0;
              position: absolute;
              z-index: 99;
              background: white;
              box-shadow: 0 3px 3px 0 rgba(0,0,0,.15);
              padding: 0 ${measurements.baseUnit * 1.5}em ${measurements.baseUnit / 2}em ${measurements.baseUnit * 1.5}em;
            }
            .site-nav[aria-hidden="true"] {
              display: none;
            }
            .site-nav[aria-hidden="true"] + .toggle .toggle-cancel {
              display: none;
            }
            .site-nav[aria-hidden="false"] + .toggle .toggle-menu {
              display: none;
            }
            .nav {
              float: none;
            }
            .item {
              display: block;
              border-bottom: 1px solid ${colors.border.light};
            }
            .item:last-child {
              border: none;
            }
            .link {
              height: auto;
              padding: ${measurements.baseUnit * 2}em ${measurements.baseUnit}em;
            }
          }
          @media (min-width: ${breakpoints.md}) {
            .site-nav {
              top: ${measurements.baseUnit * 7}em;
            }
            .toggle {
              top: ${measurements.baseUnit * 1.5}em;
            }
          }
          @media (min-width: ${breakpoints.lg}) {
            .toggle {
              display: none;
            }
            .site-nav {
              box-shadow: none;
              position: relative;
              float: right;
              top: auto;
              right: auto;
              background: none;
              width: auto;
              padding: 0;
            }
            .site-nav[aria-hidden="true"] {
              display: block;
            }
            .nav {
              display: flex;
            }
            .link:hover, .link:focus {
              text-decoration: none;
              color: #5C6FA6;
            }
            .link:before {
              content: "";
              top: 50%;
              margin-top: -5px;
              background: #5C6FA6;
              display: inline-block;
              width: 1px;
              position: absolute;
              right: 0;
              height: 12px;
              z-index: 1;
            }
            .item:last-child .link:before {
              content: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Nav
