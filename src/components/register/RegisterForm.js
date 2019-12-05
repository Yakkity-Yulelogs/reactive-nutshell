import React, { Component } from 'react'

export class RegisterForm extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h4>It Seems like you're new to Nutshell</h4>
          <p>Let sign up</p>
          <div className="card">
            <div className="card-content">
              <div>
                <input type="text" placeholder="Email"></input>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div>
                <input type="password" placeholder="Password"></input>
              </div>
              <div className="card">
                <div className="card-content">
                  <button type="button" value="Submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
