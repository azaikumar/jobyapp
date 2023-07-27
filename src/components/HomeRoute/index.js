import Header from '../Header'
import './index.css'

const HomeRoute = props => {
  const handleClick = () => {
    const {history} = props
    history.push('/jobs')
    // You can also use this.props.history.replace('/jobs') if you don't want to keep the current Home route in the history stack.
  }
  return (
    <>
      <div className="home-container">
        <Header />
        <div className="find-jobs-home-container">
          <h1>
            Find the Job That <br /> Fits Your Life
          </h1>
          <p className="description">
            Millions of people are searching for jobs, salary <br />{' '}
            Information, company reviews. Find the job that fits your
            <br />
            abilities and potential.
          </p>
          <button type="button" className="find-jobs-btn" onClick={handleClick}>
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}
export default HomeRoute
