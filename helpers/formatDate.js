const formatDay = (day) => {
  return day < 10 ? `0${day}` : day
}
const formatDate = (date, longVersion) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const d = new Date(date)
  const formattedDate = longVersion ? `${formatDay(d.getUTCDate())} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}` : `${formatDay(d.getUTCDate())} ${shortMonths[d.getUTCMonth()]} ${d.getUTCFullYear()}`
  return formattedDate
}
export default formatDate
