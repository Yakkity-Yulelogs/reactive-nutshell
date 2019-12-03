import React, { Component } from 'react'
import {convertDateTimeFromISO} from '../../modules/DateTime'

export class TasksCard extends Component {

  render() {
    return (
      <div className="card">
          <div className="card-content">
            <h2 className="card-task">{this.props.task.task}</h2>
            <p>{convertDateTimeFromISO(this.props.task.expectedCompletionDate).toDateString()}</p>
            <input type="checkbox" onChange={()=>this.props.handleCheckbox(this.props.task.id)}></input>
            <label>Mark as completed</label>
            
          </div>
      </div>
    )
  }
}

export default TasksCard
