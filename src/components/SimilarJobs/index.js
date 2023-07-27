import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrlSimilarJob,
    titleSimilarJob,
    ratingSimilarJob,
    locationSimilarJob,
    jobDescriptionSimilarJob,
    employmentTypeSimilarJob,
  } = similarJobsDetails
  return (
    <li className="similar-jobs-container">
      <div className="logo-container">
        <img
          src={companyLogoUrlSimilarJob}
          alt="company logo"
          className="company-logo"
        />
        <div className="star-rating">
          <p className="title-name">{titleSimilarJob}</p>
          <div className="rating">
            <AiFillStar className="star" />
            <p>{ratingSimilarJob}</p>
          </div>
        </div>
      </div>
      <p className="description-heading">Description</p>
      <p className="description-text">{jobDescriptionSimilarJob}</p>
      <div className="location-employment-type-container">
        <IoLocationSharp className="location-icon" />
        <p className="city">{locationSimilarJob}</p>
        <BsFillBriefcaseFill className="job-icon" />
        <p>{employmentTypeSimilarJob}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
