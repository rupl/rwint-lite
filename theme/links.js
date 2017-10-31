import { breakpoints, colors, fontSizes, measurements } from './variables'

export const reportLinkStyle = `.report {
  border-bottom: 1px solid ${colors.border.light};
  padding: ${measurements.baseUnit * 1.5}em 0 ${measurements.baseUnit}em 0;
  word-wrap: break-word;
}
p {
  line-height: initial;
}
.title {
  margin-bottom: ${measurements.baseUnit}em;
}
.title a {
  color: ${colors.text.body};
  font-weight: bold;
  text-decoration: none;
}
.title a:hover {
  text-decoration: underline;
}
.date, .status {
  font-size: ${fontSizes.small};
  margin-bottom: ${measurements.baseUnit * 1.5}em;
}
@media (min-width: ${breakpoints.md}) {
  .report {
    float: left;
    width: 49%;
  }
  .report:nth-child(odd) {
    margin-right: 1%;
  }
  .report:nth-child(even) {
    margin-left: 1%;
  }
}`
