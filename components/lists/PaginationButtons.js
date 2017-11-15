import React from 'react'
import { primaryButton } from '../../theme/buttons'
import { breakpoints, measurements } from '../../theme/variables'

export class PaginationButtons extends React.Component {
  render () {
    const nextPage = parseInt(this.props.currentPage, 10) + 1
    const prevPage = parseInt(this.props.currentPage, 10) - 1

    if (this.props.supportsPush) {
      return (
        <div className='pagination-container'>
          {prevPage > 0 &&
            <button type='button' className='btn-primary' onClick={this.props.prevClick}>
              Prev
            </button>
          }
          <span>Page: {this.props.currentPage}</span>
          <button type='button' className='btn-primary' onClick={this.props.nextClick}>
            Next
          </button>
          <style jsx>{primaryButton}</style>
          <style jsx>{`
            .pagination-container {
              text-align: center;
              margin: ${measurements.baseUnit * 2}em auto;
            }
            .btn-primary {
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
      )
    }
    return (
      <div className='pagination-container'>
        {prevPage > 0 &&
          <a href={`/${this.props.path}/listing?page=${prevPage}`} className='btn-primary'>
            Prev
          </a>
        }
        <span>Page: {this.props.currentPage}</span>
        <a href={`/${this.props.path}/listing?page=${nextPage}`} className='btn-primary'>
          Next
        </a>
        <style jsx>{primaryButton}</style>
        <style jsx>{`
          .pagination-container {
            text-align: center;
            margin: ${measurements.baseUnit * 2}em auto;
          }
          .btn-primary {
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
    )
  }
}

export default PaginationButtons
