import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getTrainings } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import PaginatedReportsList from '../components/lists/PaginatedReportsList'
import SectionHeading from '../components/SectionHeading'

export class TrainingListing extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    let pageNumber = query && query.page ? query.page : 1
    const showPagination = isServer && pageNumber > 1
    const searchQuery = query.search
    await store.dispatch(getTrainings(pageNumber, false, showPagination, searchQuery))
    return {
      canLoadMore: store.getState().trainings.canLoadMore,
      currentPage: pageNumber,
      showPagination: showPagination,
      query: searchQuery
    }
  }

  render () {
    return (
      <Layout title='Training' url='https://reliefweb.int/training' query={this.props.query}>
        <SectionHeading heading='Training' level='1' />
        <PaginatedReportsList
          canLoadMore={this.props.canLoadMore}
          query={this.props.query}
          reportsType='training'
          showPagination={this.props.showPagination} />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTrainings: bindActionCreators(getTrainings, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.trainings.currentPage
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(TrainingListing)
