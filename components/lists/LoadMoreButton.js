import React from 'react'
import { primaryButton } from '../../theme/buttons'

export class LoadMoreButton extends React.Component {
  render () {
    if (this.props.supportsPush) {
      return (
        <button type='button' onClick={this.props.click}>
          Show more
          <style jsx>{`
            button {
              ${primaryButton}
            }
            button:hover {
              opacity: 0.9;
            }
          `}</style>
        </button>
      )
    }
    return (
      <a className='load-more-link' href={`/${this.props.path}/listing?page=${this.props.nextPage}`}>
        Show more
        <style jsx>{`
          a {
            ${primaryButton}
          }
          a:hover {
            opacity: 0.9;
            color: white;
          }
        `}</style>
      </a>
    )
  }
}

export default LoadMoreButton
