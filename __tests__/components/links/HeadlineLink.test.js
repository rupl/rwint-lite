/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../../components/links/HeadlineLink.js'
import { mockReports } from '../../../__fixtures__/data.fixture'

let linkEl, report, reports, wrapper
reports = [...mockReports.data]

describe('Headline Link component', () => {
  describe('Rendering the link', () => {
    beforeAll(function () {
      report = reports[0]
      report.urlCountry = 'so-yo'
      report.urlTitle = 'report-something-words-en-uk-0'
      wrapper = shallow(<Component report={report} />)
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

    it('renders the headline', () => {
      expect(wrapper.find('h3 a').text()).toContain(report.fields.headline.title)
    })

    it('renders the InfoLinks', () => {
      expect(wrapper.find('InfoLinks').exists()).toBe(true)
    })

    it('formats and renders the created date', () => {
      report = reports[0]
      report.fields.date.created = '2017-08-03T13:20:12+00:00'
      wrapper = shallow(<Component report={report} />)
      expect(wrapper.find('.date').text()).toContain('03 Aug 2017')
    })
  })
})
