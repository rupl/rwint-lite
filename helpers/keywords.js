/**
 * Keywords helper
 * Builds string of keywords for use in the news_keywords meta tag
 */

const buildKeywords = (fields) => {
  let keywords = ['humanitarian']
  const types = [
    'career_categories',
    'city',
    'cost',
    'country',
    'disaster',
    'disaster_type',
    'experience',
    'format',
    'language',
    'source',
    'theme',
    'type',
    'vulnerable_groups'
  ]
  types.map((type) => {
    if (typeof fields[type] === 'string') {
      keywords.push(fields[type])
      return
    }
    if (fields[type]) fields[type].map((item) => { keywords.push(item.name) })
  })
  return keywords.join(', ')
}

export default buildKeywords
