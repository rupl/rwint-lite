const buildKeywords = (fields) => {
  let keywords = ['humanitarian']
  const types = ['country', 'source', 'theme', 'disaster', 'disaster_type', 'format', 'language', 'vulnerable_groups']
  types.map((type) => {
    if (fields[type]) fields[type].map((item) => { keywords.push(item.name) })
  })
  return keywords.join(', ')
}

export default buildKeywords
