import { colors, fontSizes, measurements } from './variables'

export const primaryButton = `.btn-primary {
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
}
.btn-primary:hover {
  opacity: 0.9;
  color: white;
}
.btn-primary:focus {
  outline: -webkit-focus-ring-color auto 5px;
  background: ${colors.bg.primaryButton};
  color: white;
}`

export const smallButton = `.btn-small {
  display: inline-block;
  border: none;
  text-decoration: none;
  text-align: center;
  font-size: ${fontSizes.small};
  font-weight: bold;
  padding: 0;
  line-height: 1.4;
}
.btn-small:hover {
  opacity: 0.9;
  text-decoration: underline;
}
.btn-small:focus {
  outline: -webkit-focus-ring-color auto 5px;
}`
