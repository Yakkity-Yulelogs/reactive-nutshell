import React, { Component } from 'react'
import {convertDateTimeFromISO} from '../../modules/DateTime'

export class TasksCard extends Component {

  render() {

    return (
      <div className="card">
          <div className="card-content">
              {this.props.task.isComplete
              ? <> <h2 style={{textDecorationLine: 'line-through'}} className="card-task">{this.props.task.task}</h2>
              <p style={{textDecorationLine: 'line-through'}}>Due on: {convertDateTimeFromISO(this.props.task.expectedCompletionDate).toDateString()}</p> </>
              :<> <h2 className="card-task">{this.props.task.task}</h2><p>Due on: {convertDateTimeFromISO(this.props.task.expectedCompletionDate).toDateString()}</p></>
              }
            
           
            <div>
            <input type="checkbox" checked={this.props.task.isComplete} onChange={()=> // handle checkbox
            this.props.handleCheckbox(this.props.task.id)
            }></input>
            <label>Mark as completed</label>
            </div>

            <div>
            <button type="button" className="btn btn-danger"  onClick={()=>{
              this.props.handleDelete(this.props.task.id) // handle delete
            }}>Delete</button>

            <button type="button" className="btn btn-warning"  onClick={()=>{
              this.props.history.push(`/tasks/${this.props.task.id}/edit` // Add new task routing
              )
            }}>Edit </button>
          
            </div>
            
          </div>
      </div>
    )
  }
}

export default TasksCard
