/**
 * Nav component
 * Site navigation
 */

import React from 'react'
import Router from 'next/router'
import NavLink from './NavLink'
import { breakpoints, colors, measurements } from '../../theme/variables'

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      activeLink: '',
      canSetState: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getActiveState (type) {
    return this.state.activeLink === `/${type}-listing` || this.state.activeLink === `/${type}`
  }

  componentDidMount () {
    if (Router && Router.router && Router.router.route) {
      this.setState({
        activeLink: Router.route,
        canSetState: true
      })
    }
  }

  render () {
    const navLinks = [
      {
        label: 'Updates',
        type: 'report'
      },
      {
        label: 'Countries',
        type: 'country'
      },
      {
        label: 'Disasters',
        type: 'disaster'
      },
      {
        label: 'Jobs',
        type: 'job'
      },
      {
        label: 'Training',
        type: 'training'
      }
    ]
    return (
      <div>
        <nav className={`site-nav ${this.state.isOpen ? 'open' : ''} ${!this.state.canSetState ? 'keep-open' : ''}`} role='navigation'>
          <ul className='nav'>
            {navLinks.map((item, i) => (
              <li className='item' key={i}>
                <NavLink link={item} isActive={this.getActiveState(item.type)} />
              </li>
            ))}
          </ul>
        </nav>
        <button type='button' className='toggle' onClick={this.toggle}>
          {this.state.isOpen &&
            <span className='toggle-cancel' aria-hidden />
          }
          {!this.state.isOpen &&
            <span className='toggle-menu' aria-hidden />
          }
          <span className='sr-only'>Main menu</span>
        </button>
        <div className={`${this.state.isOpen ? 'menu-underlay' : ''}`} onClick={this.toggle} />
        <style jsx>{`
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
          @media (max-width: ${breakpoints.lg}) {
            .toggle {
              border: none;
              background: white;
              width: ${measurements.baseUnit * 5}em;
              height: ${measurements.baseUnit * 5}em;
              position: absolute;
              top: ${measurements.baseUnit / 2}em;
              right: 0;
              padding: 0;
              line-height: 0;
              display: flex;
              justify-content: center;
              align-content: center;
            }
            .toggle-menu, .toggle-cancel {
              display: block;
              width: 24px;
              height: 16px;
              background: url('/static/icons.svg') 0 -92px no-repeat;
            }
            .toggle-cancel {
              background-position: 0 -68px;
              height: 24px;
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
              display: none;
            }
            .site-nav.open {
              display: block;
            }
            .site-nav.keep-open {
              display: block;
              position:relative;
              top: auto;
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
          }
          @media (min-width: ${breakpoints.md}) {
            .site-nav {
              top: ${measurements.baseUnit * 7}em;
            }
            .toggle {
              top: ${measurements.baseUnit * 1.5}em;
              right: ${measurements.baseUnit}em;
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
            .site-nav {
              display: block;
            }
            .nav {
              display: flex;
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
