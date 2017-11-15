import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getJobs } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import PaginatedReportsList from '../components/lists/PaginatedReportsList'
import SectionHeading from '../components/SectionHeading'
import registerServiceWorker from '../helpers/registerServiceWorker'

export class JobListing extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    let pageNumber = query && query.page ? query.page : 1
    const showPagination = isServer && pageNumber > 1
    let searchQuery = query.search
    // Handle searching for 10+ years experience
    if (searchQuery && searchQuery.indexOf('experience.exact') !== -1 && searchQuery.indexOf('plus years') !== -1) {
      searchQuery = searchQuery.replace('plus years', '+ years')
    }
    await store.dispatch(getJobs(pageNumber, false, showPagination, searchQuery))
    return {
      canLoadMore: store.getState().jobs.canLoadMore,
      currentPage: pageNumber,
      showPagination: showPagination,
      query: searchQuery
    }
  }

  componentDidMount () {
    registerServiceWorker()
  }

  render () {
    return (
      <Layout title='Jobs' url='https://reliefweb.int/jobs' query={this.props.query}>
        <SectionHeading heading='Jobs' level='1' />
        <PaginatedReportsList
          canLoadMore={this.props.canLoadMore}
          query={this.props.query}
          reportsType='job'
          showPagination={this.props.showPagination} />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getJobs: bindActionCreators(getJobs, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.jobs.currentPage
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(JobListing)
