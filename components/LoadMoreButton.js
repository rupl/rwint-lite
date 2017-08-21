import { primaryButton } from '../theme/buttons'

const LoadMoreButton = ({click, nextPage, supportsPush}) => {
  if (supportsPush) {
    return (
      <button type='button' onClick={click}>
        Show more
        <style jsx>{`
          button {
            ${primaryButton}
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
      `}</style>
    </a>
  )
}

export default LoadMoreButton
