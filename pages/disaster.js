import React from 'react'
import Layout from '../components/Layout'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getDisaster, getUpdates } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import ArticleLayout from '../components/article/ArticleLayout'
import Error from './_error'

export class Disaster extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    const id = query.id
    await store.dispatch(getDisaster(id))
    const reports = store.getState().disasterReports
    const report = reports.filter((obj) => {
      return parseInt(obj.id, 10) === parseInt(id, 10)
    })[0]
    if (report) {
      await store.dispatch(getUpdates(1, false, false, `disaster.exact:"${report.fields.name}"`, 6))
      return { report }
    }
    return { error: 404 }
  }

  render () {
    return (
      <div>
        {!this.props.error &&
          <Layout title={this.props.report.fields.name}>
            <ArticleLayout report={this.props.report} type='disaster' />
          </Layout>
        }
        {this.props.error &&
          <Error statusCode={this.props.error} />
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDisaster: bindActionCreators(getDisaster, dispatch),
    getUpdates: bindActionCreators(getUpdates, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Disaster)
