/* global fetch */
import 'isomorphic-unfetch'
import shuffleArray from './shuffleArray'

const apiEndpoint = 'https://api.reliefweb.int/v1/'
const appName = 'rwmob-dev'

const formatStringForUrl = (str) => {
  return str.toLowerCase().replace(/\W+/g, '-')
}

const constructRequestBody = (limit = 20, offset = 0, sort = [], fields = [], filter, preset, query) => {
  let requestBody = {
    limit: limit,
    offset: offset
  }

  if (preset) {
    requestBody.preset = preset
  }

  if (sort.length) {
    requestBody.sort = sort
  }

  if (fields.length) {
    requestBody.fields = {
      include: fields
    }
  }

  if (filter) {
    requestBody.filter = {
      field: filter
    }
    if (filter === 'featured') {
      requestBody.filter.value = true
    }
  }

  if (query) {
    requestBody.query = {
      value: query,
      operator: 'AND'
    }
  }

  return requestBody
}

const getCountries = async function () {
  const requestBody = constructRequestBody(300, 0, ['name:asc'], ['name', 'iso3'])
  let res, data
  try {
    res = await fetch(`${apiEndpoint}countries?appname=${appName}`, {
      method: 'post',
      body: JSON.stringify(requestBody)
    })
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

const requestFeatured = async function () {
  const requestBody = {
    filter: {
      field: 'featured',
      value: true
    }
  }
  const countriesPromise = fetch(`${apiEndpoint}countries?appname=${appName}`, {
    method: 'post',
    body: JSON.stringify(requestBody)
  })
  const disastersPromise = fetch(`${apiEndpoint}disasters?appname=${appName}`, {
    method: 'post',
    body: JSON.stringify(requestBody)
  })
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

const requestHeadlines = async function () {
  const sort = ['date:desc']
  const fields = ['headline.title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
  const requestBody = constructRequestBody(16, 0, sort, fields, 'headline')
  let res, data
  try {
    res = await fetch(`${apiEndpoint}reports?appname=${appName}`, {
      method: 'post',
      body: JSON.stringify(requestBody)
    })
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

const requestUpdate = async function (id) {
  const endpoint = `${apiEndpoint}reports/${id}?appname=${appName}`
  let res, data
  try {
    res = await fetch(endpoint)
    data = await res.json()
    return data.data
  } catch (e) {
    console.log('error', e)
  }
}

const requestUpdates = async function (offset, limit = 10, query) {
  const sort = ['date:desc']
  const fields = ['title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
  const requestBody = constructRequestBody(limit, offset, sort, fields, '', 'latest', query)
  let res, data
  try {
    res = await fetch(`${apiEndpoint}reports?appname=${appName}`, {
      method: 'post',
      body: JSON.stringify(requestBody)
    })
    data = await res.json()
    data.data.map(item => {
      if (item.fields.primary_country) {
        item.urlCountry = item.fields.primary_country.shortname ? formatStringForUrl(item.fields.primary_country.shortname) : formatStringForUrl(item.fields.primary_country.name)
      }
      if (item.fields.title) {
        item.urlTitle = formatStringForUrl(item.fields.title)
      }
    })
    return data
  } catch (e) {
    console.log('error', e)
  }
}

export { getCountries, requestFeatured, requestHeadlines, requestUpdate, requestUpdates }
