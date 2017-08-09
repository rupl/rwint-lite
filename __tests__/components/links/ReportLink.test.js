/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../../components/links/ReportLink.js'
import { mockReports } from '../../../__fixtures__/data.fixture'

let linkEl, report, reports, wrapper

describe('Report Link component', () => {
  beforeAll(function () {
    reports = [...mockReports.data]
    report = reports[0]
    report.urlCountry = 'so-yo'
    report.urlTitle = 'report-something-words-en-uk-0'
    wrapper = shallow(<Component report={report} headingLevel='3' />)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the link to the report with the correct href and as properties', () => {
    linkEl = wrapper.find('h3').find('Link')
    expect(linkEl.exists()).toBe(true)
    expect(linkEl.prop('href')).toBe('/report?id=30')
    expect(linkEl.prop('as')).toBe('/report/30/so-yo/report-something-words-en-uk-0')
  })

  it('renders the title', () => {
    expect(wrapper.find('h3 a').text()).toContain(report.fields.title)
  })

  it('formats and renders the date', () => {
    expect(wrapper.find('.date').text()).toContain('03 Aug 2017')
  })

  it('renders the country', () => {
    expect(wrapper.find('.country').text()).toContain('So Yo')
  })

  it('renders the sources', () => {
    expect(wrapper.find('.sources').first().find('a').text()).toContain('Now Then')
    expect(wrapper.find('.sources').at(1).find('a').text()).toContain('Exposed')
  })
})
