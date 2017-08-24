import React from 'react'
import { connect } from 'react-redux'
import { primaryButton } from '../theme/buttons'

export class LoadMoreButton extends React.Component {
  render () {
    if (this.props.supportsPush) {
      return (
        <div>
          {this.props.updates.canLoadMore &&
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
          }
        </div>
      )
    }
    return (
      <div>
        {this.props.updates.canLoadMore &&
          <a className='load-more-link' href={`/report/listing?page=${this.props.nextPage}`}>
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
        }
      </div>
    )
  }
}

export default connect(state => state)(LoadMoreButton)
