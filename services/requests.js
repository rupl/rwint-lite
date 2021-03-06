/**
 * Performs fetch requests to get data from the API
 */

/* global fetch */
import 'isomorphic-unfetch'
import shuffleArray from '../helpers/shuffleArray'

const apiEndpoint = 'https://api.reliefweb.int/v1/'
const appName = 'rwlite'

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

const getSingleItem = async (type, id, fields = []) => {
  let endpoint = `${apiEndpoint}${type}/${id}?appname=${appName}`
  for (let fieldValue of fields) {
    endpoint += `&fields[include][]=${fieldValue}`
  }
  let res, data
  try {
    res = await fetch(endpoint)
    if (res.ok) {
      data = await res.json()
      return data.data
    }
    return res
  } catch (e) {
    console.log('error', e)
  }
}

const getItems = async (type, limit, offset, sort, fields, transformFn, filter, preset, query) => {
  const requestBody = constructRequestBody(limit, offset, sort, fields, filter, preset, query)
  let res, data
  try {
    res = await fetch(`${apiEndpoint}${type}?appname=${appName}`, {
      method: 'post',
      body: JSON.stringify(requestBody)
    })
    if (res && res.ok) {
      data = await res.json()
      if (transformFn) {
        transformFn(data)
      }
      return data
    }
    return res
  } catch (e) {
    console.log('error', e)
  }
}

const transformCountries = (data) => {
  return data.data.map(item => {
    item.type = 'country'
    item.urlName = formatStringForUrl(item.fields.name)
  })
}

const transformItems = (data) => {
  return data.data.map(item => {
    if (item.fields.primary_country) {
      item.urlCountry = item.fields.primary_country.shortname ? formatStringForUrl(item.fields.primary_country.shortname) : formatStringForUrl(item.fields.primary_country.name)
    }
    if (!item.fields.primary_country && item.fields.country && item.fields.country.length === 1) {
      item.urlCountry = item.fields.country[0].shortname ? formatStringForUrl(item.fields.country[0].shortname) : formatStringForUrl(item.fields.country[0].name)
    }
    if (item.fields.name) {
      item.urlTitle = formatStringForUrl(item.fields.name)
    }
    if (item.fields.title) {
      item.urlTitle = formatStringForUrl(item.fields.title)
    }
  })
}

export const requestCountry = async function (id) {
  return getSingleItem('countries', id, ['name', 'iso3', 'url_alias'])
}

export const requestCountries = async function () {
  return getItems('countries', 300, 0, ['name:asc'], ['name', 'featured'], transformCountries)
}

export const requestFeatured = async function () {
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
    if (res1.ok && res2.ok) {
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
    }
    return {ok: false}
  } catch (e) {
    console.log('error', e)
  }
}

export const requestDisaster = async function (id) {
  return getSingleItem('disasters', id)
}

export const requestDisasters = async function (offset, limit = 10, query) {
  const sort = []
  const fields = ['name', 'country.id', 'country.name', 'country.shortname', 'type', 'status']
  return getItems('disasters', limit, offset, sort, fields, transformItems, '', 'latest', query)
}

export const requestHeadlines = async function () {
  const sort = ['date:desc']
  const fields = ['headline.title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
  return getItems('reports', 16, 0, sort, fields, transformItems, 'headline')
}

export const requestJob = async function (id) {
  return getSingleItem('jobs', id)
}

export const requestJobs = async function (offset, limit = 10, query) {
  const sort = ['date.created:desc']
  const fields = ['title', 'date.closing', 'country.name', 'country.shortname', 'source.name', 'source.shortname']
  return getItems('jobs', limit, offset, sort, fields, transformItems, '', 'latest', query)
}

export const requestTraining = async function (id) {
  return getSingleItem('training', id)
}

export const requestTrainings = async function (offset, limit = 10, query) {
  const sort = ['date.created:desc']
  const fields = ['title', 'date.registration', 'date.start', 'date.end', 'country.name', 'country.shortname', 'source.name', 'source.shortname']
  return getItems('training', limit, offset, sort, fields, transformItems, '', 'latest', query)
}

export const requestUpdate = async function (id) {
  return getSingleItem('reports', id)
}

export const requestReports = async function (offset, limit = 10, query) {
  const sort = ['date:desc']
  const fields = ['title', 'date.created', 'primary_country.name', 'primary_country.shortname', 'source.name', 'source.shortname']
  return getItems('reports', limit, offset, sort, fields, transformItems, '', 'latest', query)
}
