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
        <nav className='cd-site-header__nav' role='navigation' aria-hidden={!this.state.isOpen}>
          <ul className='cd-nav'>
            <li className='cd-nav__item'>
              <Link prefetch as='/report/listing' href='/updates'>
                <a className={`cd-nav__link ${(this.state.activeLink === '/updates' || this.state.activeLink === '/report') ? 'cd-nav__link--active' : ''}`}>
                  Updates
                </a>
              </Link>
            </li>
            <li className='cd-nav__item'>
              <Link prefetch as='/country/listing' href='/countries'>
                <a className={`cd-nav__link ${(this.state.activeLink === '/countries' || this.state.activeLink === '/country') ? 'cd-nav__link--active' : ''}`}>
                  Countries
                </a>
              </Link>
            </li>
            <li className='cd-nav__item'>
              <Link prefetch as='/disaster/listing' href='/disasters'>
                <a className={`cd-nav__link ${(this.state.activeLink === '/disasters' || this.state.activeLink === '/disaster') ? 'cd-nav__link--active' : ''}`}>
                  Disasters
                </a>
              </Link>
            </li>
            <li className='cd-nav__item'>
              <Link prefetch as='/job/listing' href='/jobs'>
                <a className={`cd-nav__link ${(this.state.activeLink === '/jobs' || this.state.activeLink === '/job') ? 'cd-nav__link--active' : ''}`}>
                  Jobs
                </a>
              </Link>
            </li>
            <li className='cd-nav__item'>
              <Link prefetch as='/training/listing' href='/trainings'>
                <a className={`cd-nav__link ${(this.state.activeLink === '/trainings') ? 'cd-nav__link--active' : ''}`}>
                  Training
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <button type='button' className='cd-site-header__nav-toggle' onClick={this.toggle}>
          <span className='cd-site-header__nav-toggle-cancel'>
            <Cancel />
          </span>
          <span className='cd-site-header__nav-toggle-menu'>
            <Menu />
          </span>
          <span className='sr-only'>Main menu</span>
        </button>
        <style jsx>{`
          .cd-nav__link {
            display: block;
            line-height: 1;
            text-decoration: none;
            position: relative;
            color: ${colors.text.header};
            height: ${measurements.baseUnit * 7.5}em;
            padding: ${measurements.baseUnit * 3}em ${measurements.baseUnit * 2}em;
          }
          .cd-nav {
            list-style: none;
            margin: 0;
            padding: 0;
            float: right;
          }
          .cd-nav__item {
            position: relative;
            text-transform: uppercase;
            display: inline-block;
            border: none;
          }
          .cd-nav__link:after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            border-bottom: 2px solid transparent;
            transition: border-color 0.3s ease;
          }
          .cd-nav__link:hover, .cd-nav__link:focus {
            background: ${colors.link.focusBg};
            outline: none;
          }
          .cd-nav__link:hover:after, .cd-nav__link:focus:after, .cd-nav__link--active:after {
            border-color: ${colors.bg.headerFooter};
          }
          .cd-active .cd-nav__link {
            font-weight: bold;
          }
          .cd-active .cd-nav__link:after {
            border-color: #${colors.bg.headerFooter};
          }
          @media (max-width: 1024px) {
            .cd-site-header__nav-toggle {
              border: none;
              background: none;
              width: ${measurements.baseUnit * 5}em;
              height: ${measurements.baseUnit * 5}em;
              position: absolute;
              top: ${measurements.baseUnit / 2}em;
              right: ${measurements.baseUnit}em;
              padding: 0;
            }
            .cd-site-header__nav {
              top: ${measurements.baseUnit * 6}em;
              width: 100%;
              right: 0;
              position: absolute;
              z-index: 99;
              background: white;
              box-shadow: 0 3px 3px 0 rgba(0,0,0,.15);
              padding: 0 ${measurements.baseUnit * 1.5}em ${measurements.baseUnit / 2}em ${measurements.baseUnit * 1.5}em;
            }
            .cd-site-header__nav[aria-hidden="true"] {
              display: none;
            }
            .cd-site-header__nav[aria-hidden="true"] + .cd-site-header__nav-toggle .cd-site-header__nav-toggle-cancel {
              display: none;
            }
            .cd-site-header__nav[aria-hidden="false"] + .cd-site-header__nav-toggle .cd-site-header__nav-toggle-menu {
              display: none;
            }
            .cd-nav {
              float: none;
            }
            .cd-nav__item {
              display: block;
              border-bottom: 1px solid ${colors.border.light};
            }
            .cd-nav__item:last-child {
              border: none;
            }
            .cd-nav__link {
              height: auto;
              padding: ${measurements.baseUnit * 2}em ${measurements.baseUnit}em;
            }
          }
          @media (min-width: ${breakpoints.md}) {
            .cd-site-header__nav {
              top: ${measurements.baseUnit * 7}em;
            }
            .cd-site-header__nav-toggle {
              top: ${measurements.baseUnit * 1.5}em;
            }
          }
          @media (min-width: ${breakpoints.lg}) {
            .cd-site-header__nav-toggle {
              display: none;
            }
            .cd-site-header__nav {
              box-shadow: none;
              position: relative;
              float: right;
              top: auto;
              right: auto;
              background: none;
              width: auto;
              padding: 0;
            }
            .cd-site-header__nav[aria-hidden="true"] {
              display: block;
            }
            .cd-nav {
              display: flex;
            }
            .cd-nav__link:hover, .cd-nav__link:focus {
              text-decoration: none;
              color: #5C6FA6;
            }
            .cd-nav__link:before {
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
            .cd-nav__item:last-child .cd-nav__link:before {
              content: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Nav
