/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../components/Featured.js'

let featured, wrapper

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
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toEqual(true)
  })

  it('renders a link for each featured item', () => {
    const links = wrapper.find('Link')
    expect(links.length).toBe(2)
  })
})
