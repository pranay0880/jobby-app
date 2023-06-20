import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import JobItem from '../JobItem'

import './index.css'

class JobsList extends Component {
  onChangeSearch = event => {
    const {onchangeSearchInput} = this.props
    const {value} = event.target
    onchangeSearchInput(value)
  }

  searchButtonClicked = () => {
    const {enterSearchInput} = this.props
    enterSearchInput()
  }

  noJobsFound = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  render() {
    const {jobsList, searchInput} = this.props

    return (
      <div>
        <div className="searchContainer">
          <input
            type="search"
            className="searchInput"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearch}
            onKeyDown={this.onKeyDownSearch}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="searchButton"
            onClick={this.searchButtonClicked}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {jobsList.length !== 0 ? (
          <ul>
            {jobsList.map(eachItem => (
              <JobItem eachListItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          this.noJobsFound()
        )}
      </div>
    )
  }
}
export default JobsList
