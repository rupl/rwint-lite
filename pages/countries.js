import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getCountries } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import CountriesList from '../components/CountriesList'
import SectionHeading from '../components/SectionHeading'

export class Countries extends React.Component {
  static async getInitialProps ({store}) {
    await store.dispatch(getCountries())
  }

  render () {
    return (
      <Layout title='Countries'>
        <div>
          <SectionHeading heading='Countries' level='1' />
          <CountriesList />
        </div>
        <style>{`

        `}</style>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: bindActionCreators(getCountries, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Countries)
