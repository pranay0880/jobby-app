import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {HiMail} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {eachListItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachListItem
  return (
    <li className="listContainer">
      <Link to={`/jobs/${id}`} className="link">
        <div className="logoHeading">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
            <div className="locationContainer">
              <FaMapMarkerAlt className="locationIcon" />
              <p>{location}</p>
            </div>
            <div className="locationContainer">
              <HiMail className="locationIcon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <h1 className="title">Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
