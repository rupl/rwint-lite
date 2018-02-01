/**
 * Disaster Status component
 * Displays the color coded current status of the Disaster
 */

import { colors, fontSizes } from '../../theme/variables'

const getStatus = (status) => {
  return status === 'current' ? 'Ongoing' : status
}
const DisasterStatus = ({status}) => (
  <p className={`status ${status}`}>
    {getStatus(status)}
    <style jsx>{`
      .status {
        text-transform: uppercase;
        font-size: ${fontSizes.tiny};
        display: flex;
        align-items: center;
        line-height: 1;
      }
      .status:before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        margin-right: 4px;
        border-radius: 100%;
        background: ${colors.status.past};
      }
      .status.alert:before {
        background: ${colors.status.alert};
      }
      .status.current:before {
        background: ${colors.status.current};
      }
    `}</style>
  </p>
)
export default DisasterStatus
