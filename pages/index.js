import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, getFeatured, getHeadlines } from '../store'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import Headlines from '../components/Headlines'
import Featured from '../components/Featured'

class Index extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    await store.dispatch(getFeatured())
    await store.dispatch(getHeadlines())
  }

  render () {
    return (
      <Layout home='true'>
        <Featured />
        <Headlines />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFeatured: bindActionCreators(getFeatured, dispatch),
    getHeadlines: bindActionCreators(getHeadlines, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Index)
