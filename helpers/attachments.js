/**
 * Attachments helper
 * Formats link text for file attachments
 */

import { measurements } from '../theme/variables'

/**
 * Display the filesize
 */
const formatFileSize = (size) => {
  if (!size) { return '' }
  let filesize = Math.round(size / 1000)
  if (filesize < 1000) {
    return `${filesize} kB`
  }
  filesize = (filesize / 1000).toFixed(2)
  return `${filesize} MB`
}

/**
 * Display the file type
 */
const formatMimeType = (mimeType) => {
  if (!mimeType) { return '' }
  return mimeType.split('/')[1].toUpperCase()
}

const formatFileLinkText = (file, type) => {
  const name = file.description || file.filename || file.url
  return (
    <span>
      <strong className={type}>{name}</strong> ({formatMimeType(file.mimetype)} <span className='divider'>|</span> {formatFileSize(file.filesize)})
      <style jsx>{`
        strong.body {
          text-decoration: underline;
        }
        .divider {
          padding: 0 ${measurements.baseUnit / 2}em;
        }
      `}</style>
    </span>
  )
}
export default formatFileLinkText
