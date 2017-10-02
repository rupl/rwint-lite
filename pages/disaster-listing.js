import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getDisasters } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import PaginatedReportsList from '../components/lists/PaginatedReportsList'
import SectionHeading from '../components/SectionHeading'

export class DisasterListing extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    let pageNumber = query && query.page ? query.page : 1
    const showPagination = isServer && pageNumber > 1
    const searchQuery = query.search
    await store.dispatch(getDisasters(pageNumber, false, showPagination, searchQuery))
    return {
      canLoadMore: store.getState().disasters.canLoadMore,
      currentPage: pageNumber,
      showPagination: showPagination,
      query: searchQuery
    }
  }

  render () {
    return (
      <Layout title='Disasters' url='https://reliefweb.int/disasters'>
        <SectionHeading heading='Disasters' level='1' />
        <PaginatedReportsList
          canLoadMore={this.props.canLoadMore}
          query={this.props.query}
          reportsType='disaster'
          showPagination={this.props.showPagination} />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDisasters: bindActionCreators(getDisasters, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.disasters.currentPage
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DisasterListing)
