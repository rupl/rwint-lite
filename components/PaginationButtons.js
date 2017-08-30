import React from 'react'
import { connect } from 'react-redux'
import { primaryButton } from '../theme/buttons'
import { breakpoints, measurements } from '../theme/variables'

export class PaginationButtons extends React.Component {
  render () {
    const nextPage = parseInt(this.props.currentPage, 10) + 1
    const prevPage = parseInt(this.props.currentPage, 10) - 1

    if (this.props.supportsPush) {
      return (
        <div>
          {this.props.updates.canLoadMore &&
            <div className='pagination-container'>
              {prevPage > 0 &&
                <button type='button' onClick={this.props.prevClick}>
                  Prev
                </button>
              }
              <span>Page: {this.props.currentPage}</span>
              <button type='button' onClick={this.props.nextClick}>
                Next
              </button>
              <style jsx>{`
                .pagination-container {
                  text-align: center;
                  margin: ${measurements.baseUnit * 2}em auto;
                }
                button {
                  ${primaryButton}
                  display: inline-block;
                  width: 80px;
                  margin: 0 8px;
                }
                @media (min-width: ${breakpoints.md}) {
                  .pagination-container {
                    margin: ${measurements.baseUnit * 5}em auto;
                  }
                }
              `}</style>
            </div>
          }
        </div>
      )
    }
    return (
      <div>
        {this.props.updates.canLoadMore &&
          <div className='pagination-container'>
            <a href={`/report/listing?page=${prevPage}`}>
              Prev
            </a>
            <span>Page: {this.props.currentPage}</span>
            <a href={`/report/listing?page=${nextPage}`}>
              Next
            </a>
            <style jsx>{`
              .pagination-container {
                text-align: center;
                margin: ${measurements.baseUnit * 2}em auto;
              }
              a {
                ${primaryButton}
                display: inline-block;
                width: 80px;
                margin: 0 8px;
              }
              @media (min-width: ${breakpoints.md}) {
                .pagination-container {
                  margin: ${measurements.baseUnit * 5}em auto;
                }
              }
            `}</style>
          </div>
        }
      </div>
    )
  }
}

export default connect(state => state)(PaginationButtons)