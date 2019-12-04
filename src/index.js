import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Nutshell from './components/Nutshell'
import './index.css'

ReactDOM.render(
  <Router forceRefresh={true}>
      <Nutshell />
  </Router>
  , document.getElementById('root'))
