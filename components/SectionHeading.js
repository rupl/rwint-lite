import { breakpoints, colors, fontSizes, measurements } from '../theme/variables'

const SectionHeading = ({heading}) => (
  <h2>{heading}
    <style jsx>{`
      h2 {
        font-size: ${fontSizes.medium};
        border-bottom: 1px dotted ${colors.border.default};
        padding-bottom: ${measurements.baseUnit / 2}em;
        margin: ${measurements.baseUnit * 1.5}em 0 0 0;
      }
      @media (min-width: ${breakpoints.md}) {
        h2 {
          font-size: ${fontSizes.large};
          margin: ${measurements.baseUnit * 2}em 0 ${measurements.baseUnit}em 0;
        }
      }
    `}</style>
  </h2>
)

export default SectionHeading
