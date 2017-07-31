import fetch from 'isomorphic-unfetch'

const appName = 'rwmob-dev'
const endpoint = `https://api.reliefweb.int/v1/reports?appname=${appName}`

const getUpdates = async function () {
  const sortOrder = '&sort[]=date:desc&sort[]=title:asc'
  const fields = '&fields[include][]=country&fields[include][]=source&fields[include][]=date'
  const reportsEndpoint = endpoint + fields + sortOrder
  let res, data

  try {
    res = await fetch(reportsEndpoint)
    data = await res.json()
    return data.data
  } catch (e) {
    console.log('error', e)
  }
}

export { getUpdates }
