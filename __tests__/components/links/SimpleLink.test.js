/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../../components/links/SimpleLink.js'

let link, linkEl, wrapper

describe('Simple Link component', () => {
  beforeAll(function () {
    link = {
      id: 1,
      type: 'country',
      urlName: 'the-name',
      fields: {
        name: 'the name'
      }
    }
    wrapper = shallow(<Component link={link} />)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a link with the correct href and as properties', () => {
    linkEl = wrapper.find('Link')
    expect(linkEl.exists()).toBe(true)
    expect(linkEl.prop('href')).toBe('/country?id=1&name=the-name')
    expect(linkEl.prop('as')).toBe('/country/1/the-name')
  })

  it('renders the link name', () => {
    expect(linkEl.find('a').text()).toContain('the name')
  })
})
