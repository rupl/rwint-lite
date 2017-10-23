import React from 'react'
import { breakpoints, colors, fontSizes, measurements } from '../../theme/variables'

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
    let isHidden = this.state.isOpen ? 'false' : 'true'
    return (
      <div className='cdh'>
        <div className='container inner'>
          <div className='sites'>
            <button type='button' onClick={this.toggle} className='btn' id='cd-related-platforms-toggle'>
              Related Platforms {this.state.isOpen}
              <span className='arrow' aria-hidden />
            </button>
            <ul className='dd' aria-labelledby='cd-related-platforms-toggle' aria-hidden={isHidden}>
              <li><a href='https://fts.unocha.org/'>Financial Tracking Service</a></li>
              <li><a href='https://humdata.org/'>Humanitarian Data Exchange</a></li>
              <li><a href='https://humanitarian.id/'>Humanitarian ID</a></li>
              <li><a href='https://humanitarianresponse.info/'>HumanitarianResponse.info</a></li>
              <li><a href='https://reliefweb.int/'>ReliefWeb</a></li>
            </ul>
          </div>
        </div>
        <div className={`${this.state.isOpen ? 'menu-underlay' : ''}`} onClick={this.toggle} />
        <style jsx>{`
          .cdh {
            background: ${colors.bg.headerFooter};
          }
          .inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: ${measurements.baseUnit * 5}em;
          }
          .sites {
            position: relative;
            margin-left: -${measurements.baseUnit}em;
          }
          .btn {
            background: none;
            border: none;
            color: ${colors.text.globalHeader};
            text-transform: uppercase;
            text-align: left;
            padding-right: 24px;
            height: 3.33em;
            font-size: ${fontSizes.tiny};
          }
          .btn:hover, .btn:focus {
            background: ${colors.bg.headerFooterHighlight};
            outline: none;
          }
          .dd {
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
          .dd[aria-hidden="false"] {
            display: block;
          }
          .dd a {
            display: block;
            padding: 12px;
            border-bottom: 1px solid #CFD1D2;
            text-decoration: none;
            color: ${colors.text.globalHeader};
            background: ${colors.bg.headerFooter};
          }
          .dd li:last-child a {
            border: none;
          }
          .dd a:hover, .dd a:focus {
            background: ${colors.bg.headerFooterHighlight};
            color: ${colors.text.globalHeader};
          }
          .arrow {
            width: 10px;
            height: 10px;
            position: absolute;
            right: 6px;
            top: 18px;
            background: url('/static/icons.svg') 0 -10px no-repeat;
            transform: rotate(90deg);
          }
          @media (min-width: ${breakpoints.sm}) {
            .sites {
              margin-left: 0;
            }
            .btn {
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
