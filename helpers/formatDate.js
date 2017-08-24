import fecha from 'fecha'

const formatDate = (date) => {
  return fecha.format(new Date(date), 'DD MMM YYYY')
}
export default formatDate
