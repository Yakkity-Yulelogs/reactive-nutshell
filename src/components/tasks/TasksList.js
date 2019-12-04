import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager.js'
import TasksCard from './TasksCard'

const loggedInUser = 1

class TaskList extends Component {
  state = {
    tasks: []
  }

//******************************************************************************
//Re-renderer
//******************************************************************************
tasksRerenderer = () => {
  ApiManager.getAll("tasks", `_sort=expectedCompletionDate&_order=asc&userId=${loggedInUser}`)
      .then((tasksArr) => {
        this.setState(
          {
            tasks: tasksArr
          }
        )
      })
}

//******************************************************************************
//Handle Checkbox On/Off
//******************************************************************************
  // toggling the isCompleted value based on if the checkbox is checked or not
  handleCheckbox = (id) => {
    // filtering the state array to get the relevant obj for edit
    let objToToggle = this.state.tasks.filter(obj => {
      return obj.id === id
    })
    // creating an object for the PUT call
    const editedObj = {
      id: objToToggle[0].id,
      userId: objToToggle[0].userId,
      task: objToToggle[0].task,
      expectedCompletionDate: objToToggle[0].expectedCompletionDate,
      isComplete: !objToToggle[0].isComplete // toggling
    }
    // PUT call
    ApiManager.update("tasks", editedObj)
      //re-rendering
      .then(() => this.tasksRerenderer())
  }
//******************************************************************************
// Handle Delete
//******************************************************************************
  handleDelete = (id) => {
    ApiManager.delete("tasks", id)
    .then (()=> this.tasksRerenderer())
  }
//******************************************************************************
// componentDidMount()
//******************************************************************************
  // Fetching the data from the Json file and setting it as state
  componentDidMount() {
    ApiManager.getAll("tasks", `_sort=expectedCompletionDate&_order=asc&userId=${loggedInUser}`)
      .then((tasksArr) => {
        this.setState(
          {
            tasks: tasksArr
          }
        )
      })
  }
//******************************************************************************
// render()
//******************************************************************************
  // Rendering the data from state
  render() {
    return (
      <>
        {
          this.state.tasks.map(task =>
            <TasksCard
              key={task.id}
              task={task}
              handleCheckbox={this.handleCheckbox}
              handleDelete = {this.handleDelete}
            />
          )
        }
      </>
    )
  }
}

export default TaskList