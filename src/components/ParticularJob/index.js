import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {HiMail} from 'react-icons/hi'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'

import './index.css'

const loadingConstants = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ParticularJob extends Component {
  state = {jobDetails: [], similarJobs: [], isLoading: loadingConstants.initial}

  componentDidMount() {
    this.getParticularJob()
  }

  getParticularJob = async () => {
    this.setState({isLoading: loadingConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, options)
    console.log(response)
    if (response.ok) {
      const jsonData = await response.json()
      console.log(jsonData)
      const similarjobs = jsonData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const lifeatcompany = {
        description: jsonData.job_details.life_at_company.description,
        imageUrl: jsonData.job_details.life_at_company.image_url,
      }
      const jsonSkills = jsonData.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const Jobdetails = {
        companyLogoUrl: jsonData.job_details.company_logo_url,
        companyWebsiteUrl: jsonData.job_details.company_website_url,
        employmentType: jsonData.job_details.employment_type,
        id: jsonData.job_details.id,
        jobDescription: jsonData.job_details.job_description,
        lifeAtCompany: lifeatcompany,
        location: jsonData.job_details.location,
        packagePerAnnum: jsonData.job_details.package_per_annum,
        rating: jsonData.job_details.rating,
        skills: jsonSkills,
        title: jsonData.job_details.title,
      }
      this.setState({
        jobDetails: Jobdetails,
        similarJobs: similarjobs,
        isLoading: loadingConstants.success,
      })
    } else {
      this.setState({isLoading: loadingConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <>
        <div className="descriptionContainer">
          <div className="logoHeading">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="companyImage"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="starContainer">
                <AiFillStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="locationSalary">
            <div className="locationContainer">
              <FaMapMarkerAlt className="locationIcon" />
              <p>{location}</p>
              <HiMail className="locationIcon" />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <div className="descriptionVisit">
            <h1 className="title">Description</h1>
            <a href={companyWebsiteUrl} className="visit">
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p>{jobDescription}</p>
          <div>
            <h1 className="title">Skills</h1>
            <ul className="unOrder">
              {skills.map(each => (
                <li key={each.name} className="skillList">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skillImage"
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="title">Life at Company</h1>
            <div className="lifeAtCompany">
              <p>{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="lifeAtCompanyImage"
              />
            </div>
          </div>
        </div>
        <div className="similarJobsContainer">
          <h1>Similar Jobs</h1>
          <ul className="unOrder">
            {similarJobs.map(each => (
              <li key={each.id} className="similarList">
                <div className="logoHeading">
                  <img
                    src={each.companyLogoUrl}
                    alt="similar job company logo"
                    className="companyImage"
                  />
                  <div>
                    <h1 className="title">{each.title}</h1>
                    <div className="starContainer">
                      <AiFillStar className="star" />
                      <p>{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="title">Description</h1>
                <p>{each.jobDescription}</p>
                <div className="locationContainer">
                  <FaMapMarkerAlt className="locationIcon" />
                  <p>{location}</p>
                  <HiMail className="locationIcon" />
                  <p>{employmentType}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  onClickCompany = () => {
    this.getParticularJob()
  }

  renderFailure = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry" onClick={this.onClickCompany}>
        Retry
      </button>
    </div>
  )

  renderAllDetails = () => {
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
      <div className="itemContainer">
        <Header />
        {this.renderAllDetails()}
      </div>
    )
  }
}
export default ParticularJob
