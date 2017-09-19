import React from 'react'
import InfoLinksList from './InfoLinksList'
import { colors, fontSizes } from '../../theme/variables'

class InfoLinks extends React.Component {
  render () {
    const {countries, disasterTypes, type, sources} = this.props
    return (
      <div className={type}>
        {countries && countries.length > 0 &&
          <InfoLinksList dataType='country' items={countries} type={type} />
        }
        {disasterTypes && disasterTypes.length > 0 &&
          <InfoLinksList dataType='disaster_type' divider='true' items={disasterTypes} type={type} />
        }
        {sources && sources.length > 0 &&
          <InfoLinksList dataType='source' divider='true' items={sources} type={type} />
        }
        <style jsx>{`
          div {
            font-size: ${fontSizes.small};
            color: ${colors.text.light};
          }
          .summary {
            text-transform: uppercase;
            font-size: ${fontSizes.tiny};
          }
        `}</style>
      </div>
    )
  }
}

export default InfoLinks
