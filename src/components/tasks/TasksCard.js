import React, { Component } from 'react'
import {convertDateTimeFromISO} from '../../modules/DateTime'
import ApiManager from '../../modules/ApiManager.js'


export class TasksCard extends Component {

  handleCheckbox = () => {
    console.log("checkbox", this.props.task.id)
    ApiManager.update("tasks", )
  }

  render() {
    return (
      <div className="card">
          <div className="card-content">
            <h2 className="card-task">{this.props.task.task}</h2>
            <p>{convertDateTimeFromISO(this.props.task.expectedCompletionDate).toDateString()}</p>
            <input type="checkbox" onChange={this.handleCheckbox}></input>
            <label>Mark as completed</label>
            
          </div>
      </div>
    )
  }
}

export default TasksCard
