/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import DescriptionBody from '../../../components/article/DescriptionBody.js'
import { mockCountry } from '../../../__fixtures__/data.fixture'

describe('Description Body component', () => {
  let bodyContent, wrapper

  beforeAll(() => {
    wrapper = shallow(<DescriptionBody report={mockCountry} />)
    bodyContent = wrapper.find('.description-body').node.props.dangerouslySetInnerHTML.__html
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the body', () => {
    expect(wrapper.find('.description-body').exists()).toBe(true)
  })

  it('changes h3 to h2 in the body', () => {
    expect(bodyContent).not.toContain('<h3>Appeals and Funding</h3>')
    expect(bodyContent).toContain('<h2>Appeals and Funding</h2>')
  })

  it('adds the document description as the image alt text if present', () => {
    expect(bodyContent).toContain('<img alt="document name" src="#" />')
  })

  it('adds the url as alt text to image links with no description', () => {
    expect(bodyContent).toContain('<a href="https://www.humanitarianresponse.info/something"><img alt="Link to https://www.humanitarianresponse.info/something" src="#" /></a>')
  })

  it('adds a class to the Useful Links list', () => {
    expect(bodyContent).toContain('<ul class="links-list">')
  })
})
