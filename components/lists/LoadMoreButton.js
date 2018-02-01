/**
 * Load More Button component
 */

import React from 'react'
import { primaryButton } from '../../theme/buttons'

export class LoadMoreButton extends React.Component {
  render () {
    if (this.props.supportsPush) {
      return (
        <button type='button' className='btn-primary' onClick={this.props.click}>
          Show more
          <style jsx>{primaryButton}</style>
        </button>
      )
    }

    /**
     * Old browser fallback - link directly to next page instead of using push state to load more onto current list
     */
    return (
      <a className='btn-primary' href={`/${this.props.path}/listing?page=${this.props.nextPage}`}>
        Show more
        <style jsx>{primaryButton}</style>
      </a>
    )
  }
}

export default LoadMoreButton
