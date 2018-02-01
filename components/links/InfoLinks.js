/**
 * Info Link component
 * Displays the sidebar links for articles
 */

import React from 'react'
import InfoLinksList from './InfoLinksList'
import { colors, fontSizes } from '../../theme/variables'

class InfoLinks extends React.Component {
  render () {
    const {countries, disasterTypes, searchType, sources, type} = this.props
    const showDivider = countries && countries.length
    return (
      <div className={type}>
        {countries && countries.length > 0 &&
          <InfoLinksList dataType='country' items={countries} searchType={searchType} type={type} />
        }
        {disasterTypes && disasterTypes.length > 0 &&
          <InfoLinksList dataType='type' divider={showDivider} items={disasterTypes} searchType={searchType} type={type} />
        }
        {sources && sources.length > 0 &&
          <InfoLinksList dataType='source' divider={showDivider} items={sources} searchType={searchType} type={type} />
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
