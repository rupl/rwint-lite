import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getUpdates } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import PaginatedReportsList from '../components/lists/PaginatedReportsList'
import SectionHeading from '../components/SectionHeading'

export class Updates extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    let pageNumber = query && query.page ? query.page : 1
    const showPagination = isServer && pageNumber > 1
    const searchQuery = query.search
    await store.dispatch(getUpdates(pageNumber, false, showPagination, searchQuery))
    return {
      canLoadMore: store.getState().updates.canLoadMore,
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
          reportsType='update'
          showPagination={this.props.showPagination} />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUpdates: bindActionCreators(getUpdates, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.updates.currentPage
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Updates)
