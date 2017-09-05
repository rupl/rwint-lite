import React from 'react'
import { breakpoints, colors, fontSizes, measurements } from '../../theme/variables'
import { Arrow } from '../icons/Icons'

class GlobalHeader extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    return (
      <div className='cd-global-header'>
        <div className='container cd-global-header__inner'>
          <div className='cd-global-header__sites'>
            <button type='button' onClick={this.toggle} className='cd-global-header__sites-btn' id='cd-related-platforms-toggle'>
              Related Platforms
              <span className='cd-global-header__sites-icon'>
                <Arrow direction='down' color='globalHeader' />
              </span>
            </button>
            <ul className='cd-global-header__sites-dropdown' aria-labelledby='cd-related-platforms-toggle' aria-hidden={!this.state.isOpen}>
              <li><a href='https://fts.unocha.org/'>Financial Tracking Service</a></li>
              <li><a href='https://humdata.org/'>Humanitarian Data Exchange</a></li>
              <li><a href='https://humanitarian.id/'>Humanitarian ID</a></li>
              <li><a href='https://humanitarianresponse.info/'>HumanitarianResponse.info</a></li>
              <li><a href='https://reliefweb.int/'>ReliefWeb</a></li>
            </ul>
          </div>
        </div>
        <style jsx>{`
          .cd-global-header {
            background: ${colors.bg.headerFooter};
          }
          .cd-global-header__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: ${measurements.baseUnit * 5}em;
          }
          .cd-global-header__sites {
            position: relative;
            margin-left: -${measurements.baseUnit}em;
          }
          .cd-global-header__sites-btn {
            background: none;
            border: none;
            color: ${colors.text.globalHeader};
            text-transform: uppercase;
            text-align: left;
            padding: 0 ${measurements.baseUnit};
            height: 3.33em;
            font-size: ${fontSizes.tiny};
          }
          .cd-global-header__sites-btn:hover, .cd-global-header__sites-btn:focus {
            background: ${colors.bg.headerFooterHighlight};
            outline: none;
          }
          .cd-global-header__sites-dropdown {
            list-style: none;
            margin: 0;
            padding: 0;
            position: absolute;
            z-index: 99;
            background: white;
            width: 100%;
            min-width: 224px;
            box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.25);
            display: none;
          }
          .cd-global-header__sites-dropdown[aria-hidden="false"] {
            display: block;
          }
          .cd-global-header__sites-dropdown a {
            display: block;
            padding: 12px;
            border-bottom: 1px solid #CFD1D2;
            text-decoration: none;
            color: #767676;
            word-break: break-word;
          }
          .cd-global-header__sites-dropdown li:last-child a {
            border: none;
          }
          .cd-global-header__sites-dropdown a:hover, .cd-global-header__sites-dropdown a:focus {
            background: ${colors.bg.headerFooter};
            color: ${colors.text.globalHeader};
          }
          .cd-global-header__sites-icon {
            width: 10px;
            height: 10px;
            display: inline-block;
            margin-left: ${measurements.baseUnit}em;
            color: ${colors.text.globalHeader};
          }
          @media (min-width: ${breakpoints.sm}) {
            .cd-global-header__sites {
              margin-left: 0;
            }
            .cd-global-header__sites-btn {
              font-size: ${fontSizes.small};
              height: 2.857em;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default GlobalHeader
