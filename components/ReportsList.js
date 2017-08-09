import React from 'react'
import Router from 'next/router'
import ReportLink from '../components/links/ReportLink'
import { getUpdates } from '../services/requests'
import { breakpoints, measurements } from '../theme/variables'
import { primaryButton } from '../theme/buttons'

function removeDuplicates (myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

const ResetButton = ({click, supportsPush}) => {
  if (supportsPush) {
    return (
      <button type='button' onClick={click}>
        Show recent updates
        <style jsx>{`
          button {
            ${primaryButton}
        `}</style>
      </button>)
  }
  return (
    <a href='/report/listing'>
      Show recent updates
      <style jsx>{`
        a {
          ${primaryButton}
      `}</style>
    </a>
  )
}

const LoadMoreButton = ({click, nextPage, supportsPush}) => {
  if (supportsPush) {
    return (
      <button type='button' onClick={click}>
        Show more
        <style jsx>{`
          button {
            ${primaryButton}
        `}</style>
      </button>
    )
  }
  return (
    <a className='load-more-link' href={`/report/listing?page=${nextPage}`}>
      Show more
      <style jsx>{`
        a {
          ${primaryButton}
      `}</style>
    </a>
  )
}

class ReportsList extends React.Component {
  constructor (props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.reset = this.reset.bind(this)
    this.state = {
      aboveMax: props.aboveMax,
      canLoadMore: props.canLoadMore,
      currentPage: props.currentPage,
      focusId: '',
      reports: props.reports,
      supportsPush: false
    }
  }

  async reset () {
    let reports = await getUpdates()
    this.setState({
      aboveMax: false,
      currentPage: 1,
      focusId: reports.data[0].id,
      reports: reports.data
    })
    Router.push(`/updates`, `/report/listing`, {shallow: true})
  }

  async loadMore () {
    let reports = await getUpdates(this.state.currentPage)
    let newReports = [...this.state.reports, ...reports.data]
    newReports = removeDuplicates(newReports, 'id')
    const newPageNumber = parseInt(this.state.currentPage, 10) + 1
    const canLoadMore = reports.totalCount > newPageNumber * 10
    this.setState({
      canLoadMore: canLoadMore,
      currentPage: newPageNumber,
      focusId: reports.data[0].id,
      reports: newReports
    })
    Router.push(`/updates?page=${this.state.currentPage}`, `/report/listing?page=${this.state.currentPage}`, {shallow: true})
  }

  componentDidMount () {
    this.setState({
      supportsPush: true
    })
  }

  render () {
    const { aboveMax, canLoadMore, focusId, reports, supportsPush } = this.state
    const nextPage = parseInt(this.state.currentPage, 10) + 1
    return (
      <div>
        {aboveMax &&
          <div className='btn-container'>
            <ResetButton click={this.reset} supportsPush={supportsPush} />
          </div>
        }
        <div className='reports-wrapper'>
          {reports && reports.length > 0 &&
            reports.map((report, i) => <ReportLink key={report.id} report={report} focusId={focusId} />)
          }
        </div>
        {canLoadMore &&
          <div className='btn-container'>
            <LoadMoreButton click={this.loadMore} nextPage={nextPage} supportsPush={supportsPush} />
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
              max-width: 320px;
              margin: ${measurements.baseUnit * 5}em auto;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ReportsList
