/**
 * Paginated Reports List component
 * List of reports, plus pagination.
 */

import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReportLink from '../links/ReportLink'
import LoadMoreButton from './LoadMoreButton'
import PaginationButtons from './PaginationButtons'
import { breakpoints, measurements } from '../../theme/variables'
import { getDisasters, getJobs, getTrainings, getReports } from '../../actions/actions'

export class PaginatedReportsList extends React.Component {
  constructor (props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)
    this.loadPrevPage = this.loadPrevPage.bind(this)
    this.state = {
      online: true,
      supportsPush: false
    }
  }

  componentDidMount () {
    this.setState({
      online: typeof navigator !== 'undefined' && navigator.onLine,
      supportsPush: true
    })
  }

  /**
    * Get list content from the Redux store based on page type
    */
  async loadPage (props, loadMore = true, pagination = false, prev = false) {
    const currentPage = parseInt(props[`${props.reportsType}s`].currentPage, 10)
    const pageNumber = prev ? currentPage - 1 : currentPage + 1
    let getFn = 'getReports'
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
      this.updatePagination(pageNumber, props.query, props.reportsType)
    }
  }

  /*
   * Load more content using push state
   */
  loadMore () {
    this.loadPage(this.props)
  }

  /**
    * Update the page in the url if using server-side pagination
    */
  updatePagination (pageNumber, query, reportsType) {
    let queryString = `?`
    if (query) {
      queryString += `search=${query}&`
    }
    queryString += `page=${pageNumber}`
    Router.push(`/${reportsType}-listing${queryString}`, `/${reportsType}/listing${queryString}`, {shallow: true})
  }

  /*
   * Load next and previous pages using server-side pagination
   */
  loadNextPage () {
    this.loadPage(this.props, false, true)
  }

  loadPrevPage () {
    this.loadPage(this.props, false, true, true)
  }

  render () {
    const reports = this.props[`${this.props.reportsType}s`]
    const nextPage = parseInt(reports.currentPage, 10) + 1
    const path = this.props.reportsType
    const canLoadMore = this.props[`${this.props.reportsType}s`].canLoadMore
    return (
      <div>
        <div className='reports-wrapper'>
          {!reports.items.length && this.state.online &&
            <p>No results found.</p>
          }
          {!reports.items.length && !this.state.online &&
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
    getReports: bindActionCreators(getReports, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(PaginatedReportsList)
