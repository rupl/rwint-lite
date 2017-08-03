/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../components/Featured.js'

let featured, simpleLinks, wrapper

describe('Featured component', () => {
  beforeAll(function () {
    featured = [
      {
        id: 1,
        fields: {
          names: 'the name'
        }
      },
      {
        id: 2,
        fields: {
          names: 'the name 2'
        }
      }
    ]
    wrapper = shallow(<Component featured={featured} />)
    simpleLinks = wrapper.find('SimpleLink')
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a link for each featured item', () => {
    expect(simpleLinks.length).toBe(2)
  })

  it('passes the link to the SimpleLink', function () {
    const first = simpleLinks.nodes[0]
    expect(first.props.link).toEqual(featured[0])
  })
})
