import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getCountries } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import CountriesList from '../components/lists/CountriesList'
import SectionHeading from '../components/SectionHeading'

export class Countries extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    await store.dispatch(getCountries())
    return {
      searchQuery: query.search
    }
  }

  render () {
    return (
      <Layout title='Countries' url='https://reliefweb.int/countries'>
        <SectionHeading heading='Countries' level='1' />
        <CountriesList searchQuery={this.props.searchQuery} />
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
