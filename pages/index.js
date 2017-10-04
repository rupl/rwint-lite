import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getFeatured, getHeadlines } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import Headlines from '../components/Headlines'
import Featured from '../components/Featured'

export class Index extends React.Component {
  static async getInitialProps ({store}) {
    await store.dispatch(getFeatured())
    await store.dispatch(getHeadlines())
  }

  componentDidMount () {
    const dev = process.env.NODE_ENV !== 'production'
    const staging = window.location && window.location.origin && window.location.origin.indexOf('dev.m.rwdev.org') !== -1
    if (!dev && !staging && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.error('Service worker registration failed', err))
    }
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
