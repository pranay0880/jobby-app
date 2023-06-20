import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  logoutClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav>
        <ul className="unOrder navContainer">
          <li>
            <Link to="/" className="link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="websiteLogo"
              />
            </Link>
          </li>
          <li className="homeJobs">
            <Link to="/" className="link">
              <h1 className="heading1">Home</h1>
            </Link>
            <Link to="/jobs" className="link">
              <h1 className="heading1">Jobs</h1>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout"
              onClick={this.logoutClicked}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}
export default withRouter(Header)
