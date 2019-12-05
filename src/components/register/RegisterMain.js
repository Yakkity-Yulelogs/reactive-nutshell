import React, { Component } from 'react'
import RegisterForm from "./RegisterForm"
// import RegisterLoginForm from "./RegisterLoginForm"



// const loggedInUser =  localStorage.getItem("credentials")

export class RegisterMain extends Component {
  render() {
    return (
      <div className="card" style={{ backgroundColor: "#696969" }}>
        <div className="container">
          <div className="card border-0 shadow my-5 ">
            <div className="card-body p-5 ">
              <h1 className="font-weight-light text-center">WELCOME TO NUTSHELL</h1>
              <h3 className="font-weight-light text-center">We're all nuts here</h3>
            </div>
          </div>
        </div>
        <RegisterForm {...this.props}/>
      </div>



    )
  }
}

export default RegisterMain
