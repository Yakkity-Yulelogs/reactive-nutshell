import React, { Component } from 'react';
import ApiManager from '../../modules/ApiManager';

export class RegisterLoginForm extends Component {
	state = {
		email: '',
		password: ''
	};

	handleFieldChange = (e) => {
		const stateToChange = {};
		stateToChange[e.target.id] = e.target.value;
		this.setState(stateToChange);
	};

	handleLogin = (e) => {
		e.preventDefault();
		const { email, password } = this.state
		ApiManager.getAll("users", `email=${email}&password=${password}`)
		.then((user) => {
			// console.log('user login test', user)
			if (user.length > 0){
				this.props.setUser({
					email: email,
					password: password,
					userId: user[0].id
				});
				const userId = user[0].id
				localStorage.setItem("userId", parseInt(userId))
				this.props.history.push('/');
			} else {
				window.alert("Email and password not valid. Please try again")
			}
		});
	};

	render() {
		return (
			<div>
				<div>
							<div className="card" style={{ backgroundColor: "#696969" }}>
					<div className="container">
					<div className="card border-0 shadow my-5 ">
						<div className="card-body p-5 ">
						<h1 className="font-weight-light text-center">WELCOME TO NUTSHELL</h1>
						<h3 className="font-weight-light text-center">We're all nuts here</h3>
						</div>
					</div>
					</div>
				</div>
					<div className="jumbotron text-center">
						<h4>Welcome back!</h4>
						<p>Let's make sure that you is you</p>
						<div className="card">
							<div className="card-content">
								<form onSubmit={this.handleLogin}>
									<input
										id="email"
										type="text"
										placeholder="Email"
										onChange={this.handleFieldChange}
										required
									/>{' '}
									<br />
									<input
										type="password"
										placeholder="Password"
										id="password"
										onChange={this.handleFieldChange}
										required
									/>
									<br />
									<button type="submit" value="Submit" className="btn btn-primary" >
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
