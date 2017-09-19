import React from 'react'
import Layout from '../components/Layout'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getCountry, getUpdates } from '../actions/actions'
import withRedux from 'next-redux-wrapper'
import PaginatedReportsList from '../components/lists/PaginatedReportsList'
import { Arrow } from '../components/icons/Icons'
import { smallButton } from '../theme/buttons'
import { breakpoints, colors, fonts, fontSizes, measurements } from '../theme/variables'

export class Country extends React.Component {
  static async getInitialProps ({store, isServer, pathname, query}) {
    const id = query.id
    let pageNumber = query && query.page ? query.page : 1
    const showPagination = isServer && pageNumber > 1
    await store.dispatch(getCountry(id))
    const countries = store.getState().countryReports
    const country = countries.filter((obj) => {
      return parseInt(obj.id, 10) === parseInt(id, 10)
    })[0]
    const searchQuery = `country.exact:"${country.fields.name}"`
    await store.dispatch(getUpdates(1, false, true, searchQuery))
    return {
      canLoadMore: store.getState().updates.canLoadMore,
      currentPage: pageNumber,
      showPagination: showPagination,
      query: searchQuery,
      country: country
    }
  }

  render () {
    return (
      <Layout title={this.props.country.fields.name}>
        <div className='heading-container'>
          <h1 className='section-heading'>{this.props.country.fields.name}</h1>
          <a href={`https://reliefweb.int/country/${this.props.country.fields.iso3}`} target='_blank' className='btn-small'>
            Full country information
            <span className='icon-holder'><Arrow direction='right' /></span>
          </a>
        </div>
        <PaginatedReportsList
          canLoadMore={this.props.canLoadMore}
          query={this.props.query}
          reportsType='update'
          showPagination={this.props.showPagination} />
        <style jsx>{smallButton}</style>
        <style jsx>{`
          .heading-container {
            position: relative;
          }
          .section-heading {
            font-size: ${fontSizes.medium};
            font-family: ${fonts.heading};
            font-weight: normal;
            border-bottom: 1px solid ${colors.border.highlight};
            padding-bottom: ${measurements.baseUnit / 2}em;
            margin: ${measurements.baseUnit * 1.5}em 0 0 0;
          }
          .btn-small {
            margin: ${measurements.baseUnit * 2}em 0 ${measurements.baseUnit}em 0;
          }
          .icon-holder {
            display: inline-block;
            width: 10px;
            height: 10px;
            line-height: 10px;
            margin-left: 4px;
          }
          @media (min-width: ${breakpoints.md}) {
            .section-heading {
              font-size: ${fontSizes.large};
              margin: ${measurements.baseUnit * 2}em 0 ${measurements.baseUnit}em 0;
              padding-right: 200px;
            }
            .btn-small {
              position: absolute;
              right: 0;
              bottom: 4px;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountry: bindActionCreators(getCountry, dispatch),
    getUpdates: bindActionCreators(getUpdates, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Country)
