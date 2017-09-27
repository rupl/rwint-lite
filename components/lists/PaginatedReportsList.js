import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReportLink from '../links/ReportLink'
import LoadMoreButton from './LoadMoreButton'
import PaginationButtons from './PaginationButtons'
import { breakpoints, measurements } from '../../theme/variables'
import { getDisasters, getJobs, getTrainings, getUpdates } from '../../actions/actions'

export class PaginatedReportsList extends React.Component {
  constructor (props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)
    this.loadPrevPage = this.loadPrevPage.bind(this)
    this.state = {
      supportsPush: false
    }
  }

  componentDidMount () {
    this.setState({
      supportsPush: true
    })
  }

  async loadPage (props, loadMore = true, pagination = false, prev = false) {
    const currentPage = parseInt(props[`${props.reportsType}s`].currentPage, 10)
    const pageNumber = prev ? currentPage - 1 : currentPage + 1
    let getFn = 'getUpdates'
    if (props.reportsType === 'disaster') {
      getFn = 'getDisasters'
    }
    if (props.reportsType === 'job') {
      getFn = 'getJobs'
    }
    if (props.reportsType === 'training') {
      getFn = 'getTrainings'
    }

    await props[getFn](pageNumber, loadMore, pagination, props.query)
    if (pagination) {
      this.updatePagination(pageNumber, props.query)
    }
  }

  loadMore () {
    this.loadPage(this.props)
  }

  updatePagination (pageNumber, query) {
    let queryString = `?`
    if (query) {
      queryString += `search=${query}&`
    }
    queryString += `page=${pageNumber}`
    Router.push(`/updates${queryString}`, `/report/listing${queryString}`, {shallow: true})
  }

  loadNextPage () {
    this.loadPage(this.props, false, true)
  }

  loadPrevPage () {
    this.loadPage(this.props, false, true, true)
  }

  render () {
    const reports = this.props[`${this.props.reportsType}s`]
    const nextPage = parseInt(reports.currentPage, 10) + 1
    const path = this.props.reportsType === 'update' ? 'report' : this.props.reportsType
    const canLoadMore = this.props[`${this.props.reportsType}s`].canLoadMore
    const online = typeof navigator !== 'undefined' && navigator.onLine
    return (
      <div>
        <div className='reports-wrapper'>
          {!reports.items.length && online &&
            <p>No results found.</p>
          }
          {!reports.items.length && !online &&
            <p><em>Unable to fetch data while offline.</em></p>
          }
          {reports.items && reports.items.length > 0 &&
            reports.items.map((report, i) =>
              <ReportLink
                key={report.id}
                report={report}
                focusId={reports.focusId}
                reportsType={this.props.reportsType} />
            )
          }
        </div>
        {canLoadMore && this.props.showPagination &&
          <PaginationButtons
            prevClick={this.loadPrevPage}
            nextClick={this.loadNextPage}
            currentPage={reports.currentPage}
            path={path}
            supportsPush={this.state.supportsPush} />
        }
        {canLoadMore && !this.props.showPagination &&
          <div className='btn-container'>
            <LoadMoreButton
              click={this.loadMore}
              nextPage={nextPage}
              path={path}
              supportsPush={this.state.supportsPush} />
          </div>
        }
        <style jsx>{`
          .btn-container {
            max-width: 320px;
            margin: ${measurements.baseUnit * 2}em auto;
          }
          @media (min-width: ${breakpoints.md}) {
           .reports-wrapper {
             overflow: auto;
             display: flex;
             flex-wrap: wrap;
           }
           .btn-container {
            margin: ${measurements.baseUnit * 5}em auto;
          }
         }
       `}</style>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDisasters: bindActionCreators(getDisasters, dispatch),
    getJobs: bindActionCreators(getJobs, dispatch),
    getTrainings: bindActionCreators(getTrainings, dispatch),
    getUpdates: bindActionCreators(getUpdates, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(PaginatedReportsList)
