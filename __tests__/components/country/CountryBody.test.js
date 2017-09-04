/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import CountryBody from '../../../components/country/CountryBody.js'
import { mockCountry } from '../../../__fixtures__/data.fixture'

describe('Country Body component', () => {
  let bodyContent, wrapper

  beforeAll(() => {
    wrapper = shallow(<CountryBody report={mockCountry} />)
    bodyContent = wrapper.find('.country-report').node.props.dangerouslySetInnerHTML.__html
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the name', () => {
    expect(wrapper.find('h1').text()).toContain(mockCountry.fields.name)
  })

  it('renders the body', () => {
    expect(wrapper.find('.country-report').exists()).toBe(true)
  })

  it('changes h3 to h2 in the body', () => {
    expect(bodyContent).not.toContain('<h3>Appeals and Funding</h3>')
    expect(bodyContent).toContain('<h2>Appeals and Funding</h2>')
  })

  it('adds a class to list items the contain an image', function () {
    expect(bodyContent).toContain('<li class="has-img"><strong>document name</strong><a class="tb-img" href="#"><img alt="document name" src="#" /></a></li>')
  })

  it('adds a class to links the contain an image', function () {
    expect(bodyContent).toContain('<a class="tb-img" href="#"><img alt="document name" src="#" /></a>')
    expect(bodyContent).toContain('<a href="#">A link</a>')
  })

  it('adds the document description as the image alt text if present', function () {
    expect(bodyContent).toContain('<img alt="document name" src="#" />')
  })

  it('adds the alt text to image links to HR.info if no description', function () {
    expect(bodyContent).toContain('<a class="tb-img" href="https://www.humanitarianresponse.info/something"><img alt="HumanitarianResponse.info" src="#" /></a>')
  })

  it('adds the alt text to image links to FTS if no description', function () {
    expect(bodyContent).toContain('<a class="tb-img" href="https://fts.unocha.org/something"><img alt="Financial Tracking Service" src="#" /></a>')
  })

  it('adds the alt text to image links to UNHCR if no description', function () {
    expect(bodyContent).toContain('<a class="tb-img" href="https://unhcr.org/something"><img alt="UNHCR" src="#" /></a>')
  })
})