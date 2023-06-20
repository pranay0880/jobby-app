import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import CheckboxFilter from '../CheckboxFilter'
import SalaryRangesFilter from '../SalaryRangesFilter'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const loadingConstants = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class FilterItems extends Component {
  state = {profile: [], isLoading: loadingConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  successProfile = jsonProfile => {
    const profileDetails = {
      name: jsonProfile.profile_details.name,
      shortBio: jsonProfile.profile_details.short_bio,
      profileImageUrl: jsonProfile.profile_details.profile_image_url,
    }
    this.setState({
      profile: profileDetails,
      isLoading: loadingConstants.success,
    })
  }

  getProfile = async () => {
    this.setState({isLoading: loadingConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    const jsonProfile = await response.json()
    if (response.ok) {
      this.successProfile(jsonProfile)
    } else {
      this.setState({isLoading: loadingConstants.failure})
    }
  }

  onClickCheckbox = employmentTypeId => {
    const {onclickCheckbox} = this.props
    onclickCheckbox(employmentTypeId)
  }

  onchangeRadio = salaryRangeId => {
    const {onchangeRadio} = this.props
    onchangeRadio(salaryRangeId)
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {profile} = this.state
    const {name, shortBio, profileImageUrl} = profile
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" className="bioImage" />
        <h1 className="profileName">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  retryButton = () => {
    this.getProfile()
  }

  renderFailure = () => (
    <div>
      <button
        data-testid="button"
        type="button"
        className="retry"
        onClick={this.retryButton}
      >
        Retry
      </button>
    </div>
  )

  renderAll = () => {
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
      <div className="Width30">
        {this.renderAll()}
        <div className="employContainer">
          <h1 className="heading2">Type of Employment</h1>
          {employmentTypesList.map(eachItem => (
            <CheckboxFilter
              eachListItem={eachItem}
              key={eachItem.employmentTypeId}
              onClickCheckbox={this.onClickCheckbox}
            />
          ))}
        </div>
        <div className="employContainer">
          <h1 className="heading2">Salary Range</h1>
          <ul className="salaryUnOrder">
            {salaryRangesList.map(eachItem => (
              <SalaryRangesFilter
                eachListItem={eachItem}
                key={eachItem.salaryRangeId}
                onchangeRadio={this.onchangeRadio}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default FilterItems
