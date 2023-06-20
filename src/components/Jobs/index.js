import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FilterItems from '../FilterItems'
import JobsList from '../JobsList'
import './index.css'

const loadingConstants = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    employment: '',
    salaryPackage: '',
    searchInput: '',
    jobsList: [],
    isLoading: loadingConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({isLoading: loadingConstants.in_progress})
    const {employment, salaryPackage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salaryPackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok) {
      const jsonData = await response.json()
      const updatedData = jsonData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        isLoading: loadingConstants.success,
      })
    } else {
      this.setState({isLoading: loadingConstants.failure})
    }
  }

  onclickCheckbox = employmentTypeId => {
    const {employment} = this.state
    if (employment === '') {
      this.setState({employment: employmentTypeId}, this.getJobs)
    } else {
      const employList = [employment, employmentTypeId]
      const newEmploy = employList.join(',')
      this.setState({employment: newEmploy}, this.getJobs)
    }
  }

  onchangeRadio = salaryRangeId => {
    this.setState({salaryPackage: salaryRangeId}, this.getJobs)
  }

  onchangeSearchInput = value => {
    this.setState({searchInput: value})
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobsList, searchInput} = this.state
    return (
      <ul className="salaryUnOrder">
        <JobsList
          jobsList={jobsList}
          searchInput={searchInput}
          onchangeSearchInput={this.onchangeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
      </ul>
    )
  }

  retryButton = () => {
    this.getJobs()
  }

  renderFailure = () => (
    <ul className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry" onClick={this.retryButton}>
        Retry
      </button>
    </ul>
  )

  renderAllJobs = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case loadingConstants.in_progress:
        return this.renderLoading()
      case loadingConstants.success:
        return this.renderSuccess()
      case loadingConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="homeContainerjobs">
        <Header />
        <div className="jobsContainer">
          <FilterItems
            onclickCheckbox={this.onclickCheckbox}
            onchangeRadio={this.onchangeRadio}
          />
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}
export default Jobs
