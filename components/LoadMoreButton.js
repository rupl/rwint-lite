import { primaryButton } from '../theme/buttons'

const LoadMoreButton = ({click, nextPage, supportsPush}) => {
  if (supportsPush) {
    return (
      <button type='button' onClick={click}>
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
    <a className='load-more-link' href={`/report/listing?page=${nextPage}`}>
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

export default LoadMoreButton
