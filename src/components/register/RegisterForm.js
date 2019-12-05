import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager';

export class RegisterForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    passwordA: '',
    passwordB: '',
    buttonDisabled: true
  };

  handleFieldChange = e => {
    // this.validatePasswordMatch()
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
    // this.validatePasswordMatch()
  };

  // handleEmailChange = (evt) => this.setState({ email: evt.target.value });
  // handlePasswordAChange = (evt) => this.setState({ passwordA: evt.target.value });
  // handlePasswordBChange = (evt) => this.setState({ passwordB: evt.target.value });



  handleLogin = e => {
    e.preventDefault()
    const { passwordA, passwordB } = this.state
    if (passwordA === passwordB && passwordA !== "") {
      const newUser = {
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.passwordA,
      }
      this.props.setUser({
        email: this.state.email,
        password: this.state.passwordA,
      })
      ApiManager.post("users", newUser)
      .then(() => {
        this.props.history.push("/")
      })
    }
    else {
      window.alert("Please make sure your passwords match")
    }
  }

  render() {

    const { email, passwordA, passwordB } = this.state;
    const isEnabled = email.length > 0 && passwordA.length > 0 && passwordB.length > 0 && passwordA === passwordB;

    return (
      <div>
        <div className="jumbotron text-center">
          <h4>It seems like you're new to Nutshell</h4>
          <p>Let sign up</p>
          <div className="card">
            <div className="card-content">
              <form onSubmit={this.handleLogin}>
                <input type="text" placeholder="Full Name" id="fullName" onChange={this.handleFieldChange} required></input> <br />
                <input type="text" placeholder="Email" id="email" onChange={this.handleFieldChange} required></input> <br />
                <input type="password" placeholder="Password" id="passwordA" onChange={this.handleFieldChange} required></input><br />
                <input type="password" placeholder="Password Again" id="passwordB" onChange={this.handleFieldChange} required></input><br />
                <button type="submit" value="Submit" className="btn btn-primary" disabled={!isEnabled}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
