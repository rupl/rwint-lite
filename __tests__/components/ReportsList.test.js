/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import { mockReports } from '../../__fixtures__/data.fixture'
import Component from '../../components/ReportsList.js'
import {getUpdates} from '../../services/requests'
jest.mock('../../services/requests')

let reports, reportLinks, wrapper

describe('ReportsList component', () => {
  beforeAll(function () {
    reports = mockReports.data
    wrapper = shallow(<Component reports={reports} currentPage='1' />)
    reportLinks = wrapper.find('ReportLink')
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a report link for each report', () => {
    expect(reportLinks.length).toBe(10)
  })

  it('passes the report to the ReportLink', function () {
    const first = reportLinks.nodes[0]
    expect(first.props.report).toEqual(reports[0])
  })

  describe('Loading more reports', () => {
    beforeAll(async () => {
      wrapper.instance().loadMore()
    })
    it('should call getUpdates with the page number', () => {
      expect(getUpdates.mock.calls[0]).toEqual(['1'])
    })
    it('should remove duplicate ids from the reports', () => {
      expect(wrapper.state().reports.length).toBe(12)
    })
    it('should add the loaded reports to the state', () => {
      expect(wrapper.state().reports[10].id).toBe('40')
      expect(wrapper.state().reports[11].id).toBe('41')
    })
    it('should render the loaded reports', () => {
      reportLinks = wrapper.find('ReportLink')
      expect(reportLinks.length).toBe(12)
    })
    it('should update the current page number', () => {
      expect(wrapper.state().currentPage).toBe(2)
    })
    it('should update if can load more reports', () => {
      expect(wrapper.state().canLoadMore).toBe(true)
    })
    it('should set the focus id', () => {
      expect(wrapper.state().focusId).toBe('39')
    })
  })

  describe('Reset reports', () => {
    beforeAll(async () => {
      wrapper.instance().reset()
    })
    it('should call getUpdates with no params', () => {
      expect(getUpdates.mock.calls[1]).toEqual([])
    })
    it('should add the loaded reports to the state', () => {
      expect(wrapper.state().reports.length).toBe(10)
      expect(wrapper.state().reports[0].id).toBe('30')
    })
    it('should render the loaded reports', () => {
      reportLinks = wrapper.find('ReportLink')
      expect(reportLinks.length).toBe(10)
    })
    it('should reset the current page number', () => {
      expect(wrapper.state().currentPage).toBe(1)
    })
    it('should set the focus id', () => {
      expect(wrapper.state().focusId).toBe('30')
    })
  })
})
