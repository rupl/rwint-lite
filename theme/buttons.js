import { colors, measurements } from './variables'

const primaryButton = `
  display: block;
  border: none;
  background: ${colors.bg.primaryButton};
  color: ${colors.text.primaryButton};
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  padding: ${measurements.baseUnit * 1.5}em;
  width: 100%;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.31);
`

export { primaryButton }