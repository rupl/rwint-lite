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
    if (fields[type]) fields[type].map((item) => { keywords.push(item.name) })
  })
  return keywords.join(', ')
}

export default buildKeywords
