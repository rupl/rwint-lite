import React from 'react'
import Layout from '../components/Layout'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getTraining } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import ArticleLayout from '../components/article/ArticleLayout'

export class Training extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    const id = query.id
    await store.dispatch(getTraining(id))
    const reports = store.getState().trainingReports
    const report = reports.filter((obj) => {
      return parseInt(obj.id, 10) === parseInt(id, 10)
    })[0]
    return {
      report: report
    }
  }

  render () {
    return (
      <Layout title={this.props.report.fields.title}>
        <ArticleLayout report={this.props.report} type='training' />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTraining: bindActionCreators(getTraining, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Training)
