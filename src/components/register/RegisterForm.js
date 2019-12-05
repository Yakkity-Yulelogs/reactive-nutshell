import React, { Component } from 'react'

export class RegisterForm extends Component {
  state = {
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
  
  handleLogin = e => {
    e.preventDefault()
    const { passwordA, passwordB } = this.state
    if (passwordA === passwordB && passwordA !== ""){
      this.props.setUser({
        email: this.state.email,
        password: this.state.passwordA,
      })
      this.props.history.push("/")
    }
    else {
      window.alert("Please make sure your passwords match")
    }
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h4>It seems like you're new to Nutshell</h4>
          <p>Let sign up</p>
          <div className="card">
            <div className="card-content">
              <form onSubmit={this.handleLogin}>
                <input type="text" placeholder="Email" id="email" onChange={this.handleFieldChange} required></input> <br/>
                <input type="password" placeholder="Password" id="passwordA" onChange={this.handleFieldChange} required></input><br/>                
                <input type="password" placeholder="Password Again" id="passwordB" onChange={this.handleFieldChange} required></input><br/>
                <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
