import { breakpoints, colors, fonts, fontSizes, measurements } from '../theme/variables'

const SectionHeading = ({heading, level = '2'}) => {
  return (
    <div>
      {level === '1' &&
        <h1 className='section-heading'>{heading}</h1>
      }
      {level === '2' &&
        <h2 className='section-heading'>{heading}</h2>
      }
      <style jsx>{`
        .section-heading {
          font-size: ${fontSizes.medium};
          font-family: ${fonts.heading};
          font-weight: normal;
          border-bottom: 1px solid ${colors.border.highlight};
          padding-bottom: ${measurements.baseUnit / 2}em;
          margin: ${measurements.baseUnit * 1.5}em 0 0 0;
        }
        @media (min-width: ${breakpoints.md}) {
          .section-heading {
            font-size: ${fontSizes.large};
            margin: ${measurements.baseUnit * 2}em 0 ${measurements.baseUnit}em 0;
          }
        }
      `}</style>
    </div>

  )
}

export default SectionHeading
