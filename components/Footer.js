import { breakpoints, colors, fontSizes, measurements } from '../theme/variables'

const Footer = () => (
  <footer role='contentinfo'>
    <div className='container'>
      <ul>
        <li><a href='https://reliefweb.int/'>Full site</a></li>
        <li><a href='https://reliefweb.int/blog'>Blog</a></li>
        <li><a href='http://labs.reliefweb.int/'>Labs</a></li>
        <li><a href='https://reliefweb.int/about'>About us</a></li>
        <li><a href='http://www.un.org/en/sections/about-website/privacy-notice/'>Privacy policy</a></li>
      </ul>

      <div className='sp'>
        <p>© United Nations Office for the Coordination of Humanitarian Affairs</p>
        <a className='top' href='#main'>
          Top
          <span className='arrow' aria-hidden />
        </a>
      </div>
    </div>
    <style jsx>{`
      footer {
        background: ${colors.bg.headerFooter};
        margin-top: ${measurements.baseUnit * 3}em;
        padding: ${measurements.baseUnit * 2}em 0;
        color: ${colors.text.globalHeader};
      }
      a {
        color: ${colors.text.globalHeader};
        text-decoration: none;
        font-size: ${fontSizes.small};
        border-bottom: 1px solid transparent;
      }
      a:hover, a:focus {
        border-color: rgba(255,255,255,0.6);
      }
      ul  {
        text-transform: uppercase;
        list-style: none;
        margin: 0 0 ${measurements.baseUnit * 2}em 0;
        padding: 0;
      }
      li {
        display:inline-block;
        position: relative;
        margin: 0 ${measurements.baseUnit * 2}em 0 0;
        padding: 0
      }
      li:after {
        content: "|";
        position: absolute;
        right: -10px;
        font-size: ${fontSizes.small};
        top: 2px;
        opacity: 0.8;
      }
      li:last-child:after {
        content: none;
      }
      p {
        font-size: ${fontSizes.small};
        margin-bottom: 0;
      }
      .top {
        display: inline-block;
        font-size: ${fontSizes.small};
        margin-top: ${measurements.baseUnit * 2}em;
        line-height: 1.5;
      }
      .arrow {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 0 2px ${measurements.baseUnit / 2}em;
        background: url('/static/icons.svg') 0 -10px no-repeat;
        transform: rotate(-90deg);
      }
      @media (min-width: ${breakpoints.md}) {
        footer {
          padding: ${measurements.baseUnit * 3}em 0;
          margin-top: ${measurements.baseUnit * 5}em;
        }
        a {
          font-size: ${fontSizes.base};
        }
        a.top {
          font-size: ${fontSizes.small};
        }
        li {
          margin-right: ${measurements.baseUnit * 7}em
        }
        li:after {
          right: -32px;
          font-size: ${fontSizes.base};
          top: 0;
        }
        .sp {
          display: flex;
          justify-content: space-between;
        }
      }
      @media (min-width: ${breakpoints.xl}) {
        footer {
          padding: ${measurements.baseUnit * 5}em 0;
        }
        ul {
          margin-bottom: ${measurements.baseUnit * 4}em;
        }
      }
    `}</style>
  </footer>
)

export default Footer
