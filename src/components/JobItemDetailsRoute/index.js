import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

class JobItemDetailsRoute extends Component {
  state = {
    eachCompanyData: {},
    skillsList: [],
    lifeAtCompanyDetails: {},
    similarJobsDataList: [],
  }

  componentDidMount() {
    this.getCompanyData()
  }

  getCompanyData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const apiUrlCompanyData = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrlCompanyData, options)
    if (token !== undefined && response.ok === true) {
      const fetchedCompanyData = await response.json()
      //   console.log('padhu', fetchedCompanyData)
      const jobDetails = {
        companyLogoUrl: fetchedCompanyData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedCompanyData.job_details.company_website_url,
        employmentType: fetchedCompanyData.job_details.employment_type,
        id: fetchedCompanyData.job_details.id,
        jobDescription: fetchedCompanyData.job_details.job_description,
        lifeAtCompany: fetchedCompanyData.job_details.life_at_company,
        rating: fetchedCompanyData.job_details.rating,
        packagePerAnnum: fetchedCompanyData.job_details.package_per_annum,
        location: fetchedCompanyData.job_details.location,
      }

      const skillsData = fetchedCompanyData.job_details.skills.map(
        eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        }),
      )

      const lifeAtCompanyData = {
        description: fetchedCompanyData.job_details.life_at_company.description,
        imageUrl: fetchedCompanyData.job_details.life_at_company.image_url,
      }

      const similarJobsData = fetchedCompanyData.similar_jobs.map(eachItem => ({
        companyLogoUrlSimilarJob: eachItem.company_logo_url,
        employmentTypeSimilarJob: eachItem.employment_type,
        idSimilarJob: eachItem.id,
        jobDescriptionSimilarJob: eachItem.job_description,
        locationSimilarJob: eachItem.location,
        ratingSimilarJob: eachItem.rating,
        titleSimilarJob: eachItem.title,
      }))

      this.setState({
        eachCompanyData: jobDetails,
        skillsList: skillsData,
        lifeAtCompanyDetails: lifeAtCompanyData,
        similarJobsDataList: similarJobsData,
      })
    }
  }

  render() {
    const {
      skillsList,
      eachCompanyData,
      lifeAtCompanyDetails,
      similarJobsDataList,
    } = this.state
    const {
      jobDescription,
      companyLogoUrl,
      packagePerAnnum,
      rating,
      location,
      employmentType,
    } = eachCompanyData
    const {description, imageUrl} = lifeAtCompanyDetails

    return (
      <div className="each-job-details-container">
        <Header />
        <div className="inner-container-each-job-item">
          <div className="job-item-container-each">
            <div className="logo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="star-rating">
                <p className="title-name">Frontend Developer</p>
                <div className="rating">
                  <AiFillStar className="star" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-each-job-item">
              <IoLocationSharp className="location-icon" />
              <p className="place">{location}</p>
              <BsFillBriefcaseFill className="each-job-icon" />
              <p className="job-type">{employmentType}</p>
              <p className="ctc-each-item">{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line3-each" />
            <div>
              <div className="visit-link">
                <p className="description-heading-each">Description</p>
                <div className="link">
                  <p className="visit">visit</p>
                  <BiLinkExternal className="visit-icon" />
                </div>
              </div>
              <p className="job-details">{jobDescription}</p>
            </div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skillsList.map(eachItem => (
                <Skills skillsListDetails={eachItem} key={eachItem.name} />
              ))}
            </ul>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p>{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-cards-list-container">
          {similarJobsDataList.map(eachItem => (
            <SimilarJobs
              similarJobsDetails={eachItem}
              key={eachItem.idSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default JobItemDetailsRoute
