import React from 'react'
import Layout from '../components/Layout'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getCountry, getUpdates } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import CountryBody from '../components/country/CountryBody'

export class Country extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    const id = query.id
    await store.dispatch(getCountry(id))
    const reports = store.getState().countryReports
    const report = reports.filter((obj) => {
      return parseInt(obj.id, 10) === parseInt(id, 10)
    })[0]

    await store.dispatch(getUpdates(1, false, false, `country.exact:"${report.fields.name}"`, 6))
    // const updates = store.getState().updates
    return {
      report: report
    }
  }

  render () {
    return (
      <Layout title={this.props.report.fields.name}>
        <CountryBody report={this.props.report} />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountry: bindActionCreators(getCountry, dispatch),
    getUpdates: bindActionCreators(getUpdates, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Country)
