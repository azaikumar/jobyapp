import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    jobDescription,
    location,
    employmentType,
    packagePerAnnum,
    rating,
    id,
  } = jobDetails

  //   console.log('ajay sagar', jobDetails)
  return (
    <div className="job-item-container">
      <Link to={`/jobs/${id}`} className="each-item-btn">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="star-rating">
            <p className="title-name">{title}</p>
            <div className="rating">
              <AiFillStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location">
          <IoLocationSharp className="location-icon" />
          <p className="place">{location}</p>
          <BsFillBriefcaseFill className="job-icon" />
          <p className="job-type">{employmentType}</p>

          <p className="ctc">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line3" />
        <div>
          <p className="description-heading">Description</p>
          <p className="job-details">{jobDescription}</p>
        </div>
      </Link>
    </div>
  )
}

export default JobItem
