/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../../components/links/ReportLink.js'
import { mockReports } from '../../../__fixtures__/data.fixture'

let linkEl, report, reports, wrapper
reports = [...mockReports.data]

describe('Report Link component', () => {
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
      linkEl = wrapper.find('h2').find('Link')
      expect(linkEl.exists()).toBe(true)
      expect(linkEl.prop('href')).toBe('/report?id=30')
      expect(linkEl.prop('as')).toBe('/report/30/so-yo/report-something-words-en-uk-0')
    })

    it('renders the title', () => {
      expect(wrapper.find('h2 a').text()).toContain(report.fields.title)
    })

    it('renders the InfoLinks', () => {
      expect(wrapper.find('InfoLinks').exists()).toBe(true)
    })
  })

  describe('Rendering the date', () => {
    it('formats and renders the created date', () => {
      report = reports[0]
      report.fields.date.created = '2017-08-03T13:20:12+00:00'
      wrapper = shallow(<Component report={report} reportsType='job' />)
      expect(wrapper.find('.date').text()).toContain('03 Aug 2017')
    })

    it('formats and renders the closing date', () => {
      report = reports[0]
      report.fields.date = {
        closing: '2017-08-03T13:20:12+00:00'
      }
      wrapper = shallow(<Component report={report} reportsType='job' />)
      expect(wrapper.find('.date').text()).toContain('Valid until 03 Aug 2017')
    })

    it('formats and renders the training dates', () => {
      report = reports[0]
      report.fields.date = {
        end: '2017-08-05T13:20:12+00:00',
        registration: '2017-07-30T13:20:12+00:00',
        start: '2017-08-03T13:20:12+00:00'
      }
      wrapper = shallow(<Component report={report} reportsType='training' />)
      expect(wrapper.find('.date').text()).toContain('From 03 Aug 2017 to 05 Aug 2017 - Registration before 30 Jul 2017')
    })

    it('formats and renders the training dates for a single day course', () => {
      report = reports[0]
      report.fields.date = {
        end: '2017-08-03T13:20:12+00:00',
        registration: '2017-07-30T13:20:12+00:00',
        start: '2017-08-03T13:20:12+00:00'
      }
      wrapper = shallow(<Component report={report} reportsType='training' />)
      expect(wrapper.find('.date').text()).toContain('On 03 Aug 2017 - Registration before 30 Jul 2017')
    })
    it('formats and renders the training dates for an ongoing course', () => {
      report = reports[0]
      delete report.fields.date
      wrapper = shallow(<Component report={report} reportsType='training' />)
      expect(wrapper.find('.date').text()).toContain('Ongoing course')
    })
  })

  describe('Rendering the heading level', () => {
    it('renders a h2 for the heading', () => {
      report = reports[0]
      wrapper = shallow(<Component report={report} headingLevel='2' />)
      expect(wrapper.find('h2 a').text()).toContain(report.fields.title)
    })

    it('renders a h3 for the heading', () => {
      report = reports[0]
      wrapper = shallow(<Component report={report} headingLevel='3' />)
      expect(wrapper.find('h3 a').text()).toContain(report.fields.title)
    })
  })

  describe('Rendering the link title', () => {
    it('renders the title', () => {
      report = reports[0]
      wrapper = shallow(<Component report={report} />)
      expect(wrapper.find('h2 a').text()).toContain(report.fields.title)
    })

    it('renders the name', () => {
      report = reports[0]
      report.fields = {
        name: 'Hiya'
      }
      wrapper = shallow(<Component report={report} />)
      expect(wrapper.find('h2 a').text()).toContain(report.fields.name)
    })
  })

  describe('Rendering the link paths', () => {
    beforeEach(() => {
      report = reports[0]
      report.urlCountry = 'so-yo'
      report.urlTitle = 'report-something-words-en-uk-0'
    })
    it('renders the correct links paths for updates', () => {
      wrapper = shallow(<Component report={report} reportsType='update' />)
      linkEl = wrapper.find('h2').find('Link')
      expect(linkEl.prop('href')).toBe('/report?id=30')
      expect(linkEl.prop('as')).toBe('/report/30/so-yo/report-something-words-en-uk-0')
    })

    it('renders the correct links paths for disasters', () => {
      wrapper = shallow(<Component report={report} reportsType='disaster' />)
      linkEl = wrapper.find('h2').find('Link')
      expect(linkEl.prop('href')).toBe('/disaster?id=30')
      expect(linkEl.prop('as')).toBe('/disaster/30/report-something-words-en-uk-0')
    })

    it('renders the correct links paths for jobs with a country', () => {
      wrapper = shallow(<Component report={report} reportsType='job' />)
      linkEl = wrapper.find('h2').find('Link')
      expect(linkEl.prop('href')).toBe('/job?id=30')
      expect(linkEl.prop('as')).toBe('/job/30/so-yo/report-something-words-en-uk-0')
    })

    it('renders the correct links paths for jobs without a country', () => {
      delete report.urlCountry
      wrapper = shallow(<Component report={report} reportsType='job' />)
      linkEl = wrapper.find('h2').find('Link')
      expect(linkEl.prop('href')).toBe('/job?id=30')
      expect(linkEl.prop('as')).toBe('/job/30/report-something-words-en-uk-0')
    })

    it('renders the correct links paths for trainings with a country', () => {
      wrapper = shallow(<Component report={report} reportsType='training' />)
      linkEl = wrapper.find('h2').find('Link')
      expect(linkEl.prop('href')).toBe('/training?id=30')
      expect(linkEl.prop('as')).toBe('/training/30/so-yo/report-something-words-en-uk-0')
    })

    it('renders the correct links paths for trainings without a country', () => {
      delete report.urlCountry
      wrapper = shallow(<Component report={report} reportsType='training' />)
      linkEl = wrapper.find('h2').find('Link')
      expect(linkEl.prop('href')).toBe('/training?id=30')
      expect(linkEl.prop('as')).toBe('/training/30/report-something-words-en-uk-0')
    })
  })
})
