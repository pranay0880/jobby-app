import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginFailure = error => {
    this.setState({errorMsg: error, showError: true})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  formSubmission = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok) {
      this.loginSuccess(jsonData.jwt_token)
    } else {
      this.loginFailure(jsonData.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showError, errorMsg} = this.state
    console.log(errorMsg)

    return (
      <div className="blackContainer">
        <form className="loginContainer" onSubmit={this.formSubmission}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
          <div className="usernameContainer">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              type="text"
              className="userInput"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="Username"
            />
          </div>
          <div className="usernameContainer">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              type="password"
              className="userInput"
              onChange={this.onChangePassword}
              value={password}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="loginButton">
            Login
          </button>
          {showError && <p className="errorPara">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
