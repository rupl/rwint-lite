/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../components/Headlines.js'

let reports, reportLinks, wrapper

describe('Headlines component', () => {
  beforeAll(function () {
    reports = [{id: 1, fields: {title: 'The title'}}, {id: 2}]
    wrapper = shallow(<Component reports={reports} />)
    reportLinks = wrapper.find('ReportLink')
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a report link for each report', () => {
    expect(reportLinks.length).toBe(2)
  })

  it('passes the report to the ReportLink', function () {
    const first = reportLinks.nodes[0]
    expect(first.props.report).toEqual(reports[0])
  })
})
