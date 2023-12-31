import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <Header />
        <div className="homeImageContainer">
          <div className="homeContent">
            <h1>Find The Job That Fits Your Life</h1>
            <p>
              Millions of people are searching for jobs, salary, information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs" className="link">
              <button type="button" className="jobsButton">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
