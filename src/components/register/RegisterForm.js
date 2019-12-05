import React, { Component } from 'react'

export class RegisterForm extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h4>It seems like you're new to Nutshell</h4>
          <p>Let sign up</p>
          <div className="card">
            <div className="card-content">
              <div>
                <input type="text" placeholder="Email"></input> <br/>
                <input type="password" placeholder="Password" id="password-a"></input><br/>                <input type="password" placeholder="Password Again" id="password-b"></input><br/>
                <button type="button" value="Submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
