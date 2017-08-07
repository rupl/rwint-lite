/* global fetch */
import 'isomorphic-unfetch'
import shuffleArray from './shuffleArray'

const apiEndpoint = 'https://api.reliefweb.int/v1/'
const appName = 'rwmob-dev'

const formatStringForUrl = (str) => {
  return str.toLowerCase().replace(/\W+/g, '-')
}

const constructEndpoint = (type, limit = 20, sort = [], fields = [], filters = [], filterConditions = []) => {
  let endpoint = `${apiEndpoint}${type}?appname=${appName}&limit=${limit}`

  for (let sortValue of sort) {
    endpoint += `&sort[]=${sortValue}`
  }

  for (let fieldValue of fields) {
    endpoint += `&fields[include][]=${fieldValue}`
  }

  for (let filterValue of filters) {
    endpoint += `&filter[field]=${filterValue}&filter[value]=true`
  }

  for (let i = 0; i < filterConditions.length; i++) {
    endpoint += '&filter[operator]=AND'

    if (filterConditions[i].field) {
      endpoint += `&filter[conditions][${i}][field]=${filterConditions[i].field}`
    }
    if (filterConditions[i].value) {
      for (let theValue of filterConditions[i].value) {
        endpoint += `&filter[conditions][${i}][value][]=${theValue}`
      }
    }
    if (filterConditions[i].operator) {
      endpoint += `&filter[conditions][${i}][operator]=${filterConditions[i].operator}`
    }
  }

  return endpoint
}

const getCountries = async function () {
  const countriesEndpoint = constructEndpoint('countries', 300, ['name:asc'], ['name', 'iso3'], [])
  let res, data
  try {
    res = await fetch(countriesEndpoint)
    data = await res.json()
    data.data.map(item => {
      item.type = 'country'
      item.urlName = formatStringForUrl(item.fields.name)
    })
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
      item.urlName = formatStringForUrl(item.fields.name)
    })
    disastersData.data.map(item => {
      item.type = 'disaster'
      item.urlName = formatStringForUrl(item.fields.name)
    })

    featured = [...countriesData.data, ...disastersData.data]
    const shuffled = shuffleArray(featured)
    return shuffled.slice(0, 6)
  } catch (e) {
    console.log('error', e)
  }
}

const getHeadlines = async function () {
  const sort = ['date.created:desc']
  const fields = ['headline.title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
  const filterConditions = [
    {
      operator: 'OR',
      field: 'status',
      value: ['published', 'to-review']
    },
    {
      field: 'headline'
    }
  ]

  const headlinesEndpoint = constructEndpoint('reports', 16, sort, fields, [], filterConditions)
  let res, data
  try {
    res = await fetch(headlinesEndpoint)
    data = await res.json()
    data.data.map(item => {
      if (item.fields.primary_country) {
        item.urlCountry = item.fields.primary_country.shortname ? formatStringForUrl(item.fields.primary_country.shortname) : formatStringForUrl(item.fields.primary_country.name)
      }
      if (item.fields.title) {
        item.urlTitle = formatStringForUrl(item.fields.title)
      }
    })
    return data.data
  } catch (e) {
    console.log('error', e)
  }
}

const getUpdates = async function () {
  const sort = ['date.created:desc']
  const fields = ['title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
  const filterConditions = [
    {
      operator: 'OR',
      field: 'status',
      value: ['published', 'to-review']
    }
  ]
  const updatesEndpoint = constructEndpoint('reports', 10, sort, fields, [], filterConditions)
  let res, data
  try {
    res = await fetch(updatesEndpoint)
    data = await res.json()
    data.data.map(item => {
      if (item.fields.primary_country) {
        item.urlCountry = item.fields.primary_country.shortname ? formatStringForUrl(item.fields.primary_country.shortname) : formatStringForUrl(item.fields.primary_country.name)
      }
      if (item.fields.title) {
        item.urlTitle = formatStringForUrl(item.fields.title)
      }
    })
    return data.data
  } catch (e) {
    console.log('error', e)
  }
}

export { getCountries, getFeatured, getHeadlines, getUpdates }
