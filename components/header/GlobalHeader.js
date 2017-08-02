import { breakpoints, colors, fontSizes, measurements } from '../../theme/theme'

const GlobalHeader = (props) => (
  <div className='cd-global-header'>
    <div className='container cd-global-header__inner'>
      <div className='cd-global-header__sites'>
        <button type='button' className='cd-global-header__sites-btn'>
          Related Platforms
        </button>
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
        height: ${measurements.baseUnit * 5}px;
      }
      .cd-global-header__sites {
        position: relative;
        margin-left: -${measurements.baseUnit}px;
      }
      .cd-global-header__sites-btn {
        background: none;
        border: none;
        color: white;
        text-transform: uppercase;
        text-align: left;
        padding: 0 ${measurements.baseUnit};
        height: ${measurements.baseUnit * 5}px;
        font-size: ${fontSizes.tiny};
      }
      .cd-global-header__sites-btn:hover, .cd-global-header__sites-btn:focus {
        background: ${colors.bg.headerFooterHighlight};
        outline: none;
      }
      @media (min-width: ${breakpoints.sm}) {
        .cd-global-header__sites {
          margin-left: 0;
        }
        .cd-global-header__sites-btn {
          font-size: ${fontSizes.small};
        }
      }
    `}</style>
  </div>
)

export default GlobalHeader
