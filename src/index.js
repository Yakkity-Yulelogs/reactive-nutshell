import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Nutshell from './components/Nutshell'
import './index.css'

console.log("    _/-\\_")
console.log(" .-`-:-:-`-.")
console.log("/-:-:-:-:-:-\\")
console.log("\\:-:-:-:-:-:/")
console.log(" |`       `|")
console.log(" |         |")
console.log(" `\\       /'")
console.log("   `-._.-'")
console.log("      `")

ReactDOM.render(
  <Router>
      <Nutshell />
  </Router>
  , document.getElementById('root'))
