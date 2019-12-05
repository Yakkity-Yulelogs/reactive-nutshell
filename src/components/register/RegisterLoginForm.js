import React, { Component } from 'react'

export class RegisterLoginForm extends Component {
  render() {
    return (
      <div>
        <div>
        <div className="jumbotron text-center">
          <h4>Welcome back!</h4>
          <p>Let's make sure that you is you</p>
          <div className="card">
            <div className="card-content">
              <div>
                <input type="text" placeholder="Email"></input> <br/>
                <input type="password" placeholder="Password" id="password"></input><br/>                
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

export default RegisterLoginForm
