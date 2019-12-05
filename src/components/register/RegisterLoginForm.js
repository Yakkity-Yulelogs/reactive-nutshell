import React, { Component } from 'react';

export class RegisterLoginForm extends Component {
	state = {
		email: '',
		password: '',
	};

	handleFieldChange = e => {
		const stateToChange = {}
		stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  };
  
  handleLogin = e => {
    e.preventDefault()
    this.props.setUser({
      email: this.state.email,
      password: this.state.password,
    })
    this.props.history.push("/")
  }

	render() {
		return (
			<div>
				<div>
					<div className="jumbotron text-center">
						<h4>Welcome back!</h4>
						<p>Let's make sure that you is you</p>
						<div className="card">
							<div className="card-content">
								<form onSubmit={this.handleLogin}>
                  <input id="email" type="text" placeholder="Email" onChange={this.handleFieldChange} required/> <br />
                  <input type="password" placeholder="Password" id="password" onChange={this.handleFieldChange} required/>
                  <br />
                  <button type="button" value="Submit" className="btn btn-primary">
                    Submit
                  </button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterLoginForm;
