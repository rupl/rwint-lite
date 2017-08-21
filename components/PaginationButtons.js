import { primaryButton } from '../theme/buttons'
import { breakpoints, measurements } from '../theme/variables'

const PaginationButtons = ({prevClick, nextClick, currentPage, supportsPush}) => {
  const nextPage = parseInt(currentPage, 10) + 1
  const prevPage = parseInt(currentPage, 10) - 1
  if (supportsPush) {
    return (
      <div className='pagination-container'>
        {prevPage > 0 &&
          <button type='button' onClick={prevClick}>
            Prev
          </button>
        }
        <span>Page: {currentPage}</span>
        <button type='button' onClick={nextClick}>
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
    )
  }
  return (
    <div className='pagination-container'>
      <a href={`/report/listing?page=${prevPage}`}>
        Prev
      </a>
      <span>Page: {currentPage}</span>
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
  )
}

export default PaginationButtons
