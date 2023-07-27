import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'

import Header from '../Header'

import './index.css'

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

const apiStatus = {
  inprogress: 'inprogress',
  success: 'success',
  failure: 'failure',
}

class JobsRoute extends Component {
  state = {
    selectedSalaryOptionId: salaryRangesList[0].salaryRangeId,
    profileData: {},
    jobsData: [],
    apiState: apiStatus.success,
    searchInput: '',
    jobTypes: [],
  }

  componentDidMount = () => {
    this.getUsersAndJobsData()
    this.getJobDetailsData()
  }

  getUsersAndJobsData = async () => {
    const apiUrlProfiles = 'https://apis.ccbp.in/profile'

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrlProfiles, options)
    if (token !== undefined && response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.profile_details
      this.setState({
        profileData: updatedData,
      })
    }
  }

  getJobDetailsData = async () => {
    this.setState({
      apiState: apiStatus.inprogress,
    })
    const {searchInput, selectedSalaryOptionId, jobTypes} = this.state
    const jobTypeFilterId = jobTypes.join(',')
    const apiUrlJobs = `https://apis.ccbp.in/jobs?employment_type=${jobTypeFilterId}&minimum_package=${selectedSalaryOptionId}&search=${searchInput}`

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrlJobs, options)
    if (token !== undefined && response.ok === true) {
      const fetchedData = await response.json()
      const updatedJobsData = fetchedData.jobs.map(eachItem => ({
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
        jobsData: updatedJobsData,
        apiState: apiStatus.success,
      })
    } else {
      this.setState({
        apiState: apiStatus.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEntered = () => {
    this.getJobDetailsData()
  }

  onClickJobType = e => {
    const {jobTypes} = this.state
    const id = e.target.value
    let filterJobTypes
    if (jobTypes.includes(id)) {
      filterJobTypes = jobTypes.filter(each => each !== id)
    } else {
      filterJobTypes = [...jobTypes, id]
    }
    this.setState(
      {
        jobTypes: filterJobTypes,
      },
      this.getJobDetailsData,
    )
  }

  handleOptionChange = event => {
    this.setState(
      {selectedSalaryOptionId: event.target.value},
      this.getJobDetailsData,
    )
  }

  //   onClickLpaRange = id => {
  //     this.setState(
  //       {
  //         selectedSalaryOptionId: id,
  //       },
  //       this.getJobDetailsData,
  //     )
  //   }

  renderJobsList = () => {
    const {apiState, jobsData} = this.state
    return (
      <div className="data-container">
        {apiState === apiStatus.inprogress ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <ul className="each-job-item-container">
            {jobsData.length > 0 ? (
              jobsData.map(eachItem => <JobItem jobDetails={eachItem} />)
            ) : (
              <div className="no-jobs-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="no-jobs-img"
                />
                <h1 className="text-no-jobs">No Jobs found</h1>
                <p className="text-no-jobs">
                  We could not find any jobs. Try other filters.
                </p>
              </div>
            )}
          </ul>
        )}
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobDetailsData()
  }

  failureView = () => (
    <div className="failure-img-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find page you looking for.</p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobsData = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiStatus.success:
        return this.renderJobsList()
      case apiStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {
      selectedSalaryOptionId,
      searchInput,
      profileData,
      jobTypes,
    } = this.state

    return (
      <div className="jobs-container-root">
        <Header />
        <div className="jobs-container">
          <div className="left-container">
            <div className="profile-container">
              <img
                src={profileData.profile_image_url}
                alt="avatar"
                className="profile-logo"
              />
              <p className="name">{profileData.name}</p>
              <div className="description">
                <p>{profileData.short_bio}</p>
              </div>
            </div>
            <hr className="horizontal-line" />
            <p>Type of Employment</p>
            <div className="label">
              {employmentTypesList.map(eachType => (
                <label
                  htmlFor={eachType.employmentTypeId}
                  key={eachType.employmentTypeId}
                >
                  <input
                    type="checkbox"
                    value={eachType.employmentTypeId}
                    className="check-box"
                    checked={jobTypes.includes(eachType.employmentTypeId)}
                    onChange={e => this.onClickJobType(e)}
                  />
                  {eachType.label}
                </label>
              ))}
            </div>

            <hr className="horizontal-line2" />
            <p>Type of Employment</p>
            <div className="radio-btns-filter-container">
              {salaryRangesList.map(option => (
                <label key={option.salaryRangeId}>
                  <input
                    type="radio"
                    value={option.salaryRangeId}
                    checked={selectedSalaryOptionId === option.salaryRangeId}
                    onChange={e => this.handleOptionChange(e)}
                    className="radio-btn"
                    // onChange={this.onClickLpaRange}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <div className="right-container">
            <div className="search-bar-container">
              <input
                type="search"
                className="search-bar"
                value={searchInput}
                onChange={e => this.onChangeSearchInput(e)}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onEntered}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderJobsData()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobsRoute
