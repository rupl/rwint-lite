import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getReports } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import PaginatedReportsList from '../components/lists/PaginatedReportsList'
import SectionHeading from '../components/SectionHeading'

export class ReportListing extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    let pageNumber = query && query.page ? query.page : 1
    const showPagination = isServer && pageNumber > 1
    const searchQuery = query.search
    await store.dispatch(getReports(pageNumber, false, showPagination, searchQuery))
    return {
      canLoadMore: store.getState().reports.canLoadMore,
      currentPage: pageNumber,
      showPagination: showPagination,
      query: searchQuery
    }
  }

  render () {
    return (
      <Layout title='Updates' url='https://reliefweb.int/updates' query={this.props.query}>
        <SectionHeading heading='Updates' level='1' />
        <PaginatedReportsList
          canLoadMore={this.props.canLoadMore}
          query={this.props.query}
          reportsType='report'
          showPagination={this.props.showPagination} />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReports: bindActionCreators(getReports, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.reports.currentPage
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ReportListing)
