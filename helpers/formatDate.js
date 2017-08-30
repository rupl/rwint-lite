import fecha from 'fecha'

const formatDate = (date, longVersion) => {
  const format = longVersion ? 'DD MMMM YYYY' : 'DD MMM YYYY'
  return fecha.format(new Date(date), format)
}
export default formatDate
