/* global fetch */
import 'isomorphic-unfetch'
import shuffleArray from './shuffleArray'

const apiEndpoint = 'https://api.reliefweb.int/v1/'
const appName = 'rwmob-dev'

const constructEndpoint = (type, limit = 20, sort = [], fields = [], filters = []) => {
  let endpoint = `${apiEndpoint}${type}?appname=${appName}&limit=${limit}`

  for (var sortValue of sort) {
    endpoint += `&sort[]=${sortValue}`
  }

  for (var fieldValue of fields) {
    endpoint += `&fields[include][]=${fieldValue}`
  }

  for (var filterValue of filters) {
    // does this need to be an array of can just have a filter & its value?
    endpoint += `&filter[field]=${filterValue}&filter[value]=true`
  }

  return endpoint
}

const getUpdates = async () => {
  const sort = ['date:desc', 'title:asc']
  const fields = ['country', 'source', 'date']
  const reportsEndpoint = constructEndpoint('reports', 10, sort, fields)
  let res, data

  try {
    res = await fetch(reportsEndpoint)
    data = await res.json()
    return data.data
  } catch (e) {
    console.log('error', e)
  }
}

const getFeatured = async function () {
  const countriesEndpoint = constructEndpoint('countries', 20, [], [], ['featured'])
  const disastersEndpoint = constructEndpoint('disasters', 20, [], [], ['featured'])
  const countriesPromise = fetch(countriesEndpoint)
  const disastersPromise = fetch(disastersEndpoint)
  let res1, res2, countriesData, disastersData, featured

  try {
    [res1, res2] = await Promise.all([countriesPromise, disastersPromise])
    countriesData = await res1.json()
    disastersData = await res2.json()
    countriesData.data.map(item => {
      item.type = 'country'
      item.urlName = item.fields.name.toLowerCase().replace(/\W+/g, '-')
    })
    disastersData.data.map(item => {
      item.type = 'disaster'
      item.urlName = item.fields.name.toLowerCase().replace(/\W+/g, '-')
    })

    featured = [...countriesData.data, ...disastersData.data]
    const shuffled = shuffleArray(featured)
    return shuffled.slice(0, 6)
  } catch (e) {
    console.log('error', e)
  }
}

export { getFeatured, getUpdates }
