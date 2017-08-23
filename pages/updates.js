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

class Updates extends React.Component {
  constructor (props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.state = {
      currentPage: props.currentPage,
      supportsPush: false
    }
  }

  static async getInitialProps ({store, isServer, pathname, query}) {
    let pageNumber = query.page ? query.page : 1
    const showPagination = isServer && pageNumber > 1

    await store.dispatch(getUpdates(pageNumber, false, showPagination))

    return {
      canLoadMore: store.getState().updates.canLoadMore,
      currentPage: store.getState().updates.currentPage,
      showPagination: showPagination
    }
  }

  componentDidMount () {
    this.setState({
      supportsPush: true
    })
  }

  async loadMore () {
    const nextPage = parseInt(this.state.currentPage, 10) + 1
    await this.props.getUpdates(nextPage, true)
    this.setState({
      currentPage: nextPage
    })
    Router.push(`/updates?page=${nextPage}`, `/report/listing?page=${nextPage}`, {shallow: true})
  }

  async nextPage () {
    const pageNumber = parseInt(this.state.currentPage, 10) + 1
    await this.props.getUpdates(pageNumber, false, true)
    this.setState({
      currentPage: pageNumber
    })
    Router.push(`/updates?page=${pageNumber}`, `/report/listing?page=${pageNumber}`, {shallow: true})
  }

  async prevPage () {
    const pageNumber = parseInt(this.state.currentPage, 10) - 1
    await this.props.getUpdates(pageNumber, false, true)
    this.setState({
      currentPage: pageNumber
    })
    Router.push(`/updates?page=${pageNumber}`, `/report/listing?page=${pageNumber}`, {shallow: true})
  }

  render () {
    const nextPage = parseInt(this.state.currentPage, 10) + 1
    return (
      <Layout title='Updates'>
        <div>
          <SectionHeading heading='Updates' level='1' />
          <ReportsList />
          {this.props.showPagination &&
            <PaginationButtons prevClick={this.prevPage} nextClick={this.nextPage} currentPage={this.state.currentPage} supportsPush={this.state.supportsPush} />
          }
          {!this.props.showPagination && this.props.canLoadMore &&
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

export default withRedux(initStore, null, mapDispatchToProps)(Updates)
