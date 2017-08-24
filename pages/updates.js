import React from 'react'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getUpdates } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/Layout'
import ReportsList from '../components/ReportsList'
import SectionHeading from '../components/SectionHeading'
import LoadMoreButton from '../components/LoadMoreButton'
import PaginationButtons from '../components/PaginationButtons'
import { breakpoints, measurements } from '../theme/variables'

export class Updates extends React.Component {
  constructor (props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.state = {
      canLoadMore: props.canLoadMore,
      supportsPush: false
    }
  }

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

  componentDidMount () {
    this.setState({
      supportsPush: true
    })
  }

  updatePagination (pageNumber, query) {
    let queryString = `?`
    if (query) {
      queryString += `search=${query}&`
    }
    queryString += `page=${pageNumber}`
    Router.push(`/updates${queryString}`, `/report/listing${queryString}`, {shallow: true})
  }

  async loadMore () {
    const query = this.props.query
    const nextPage = parseInt(this.props.currentPage, 10) + 1
    await this.props.getUpdates(nextPage, true, false, query)
    this.updatePagination(nextPage, query)
  }

  async nextPage () {
    const query = this.props.query
    const pageNumber = parseInt(this.props.currentPage, 10) + 1
    await this.props.getUpdates(pageNumber, false, true, query)
    this.updatePagination(pageNumber, query)
  }

  async prevPage () {
    const query = this.props.query
    const pageNumber = parseInt(this.props.currentPage, 10) - 1
    await this.props.getUpdates(pageNumber, false, true, query)
    this.updatePagination(pageNumber, query)
  }

  render () {
    const nextPage = parseInt(this.props.currentPage, 10) + 1
    return (
      <Layout title='Updates'>
        <div>
          <SectionHeading heading='Updates' level='1' />
          <ReportsList />
          {this.props.showPagination &&
            <PaginationButtons prevClick={this.prevPage} nextClick={this.nextPage} currentPage={this.props.currentPage} supportsPush={this.state.supportsPush} />
          }
          {!this.props.showPagination &&
            <div className='btn-container'>
              <LoadMoreButton click={this.loadMore} nextPage={nextPage} supportsPush={this.state.supportsPush} />
            </div>
          }
        </div>
        <style jsx>{`
          .btn-container {
            max-width: 320px;
            margin: ${measurements.baseUnit * 2}em auto;
          }
          @media (min-width: ${breakpoints.md}) {
            .btn-container {
              margin: ${measurements.baseUnit * 5}em auto;
            }
          }
        `}</style>
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
