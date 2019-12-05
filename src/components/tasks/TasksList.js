import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager.js'
import TasksCard from './TasksCard'

function loggedInUserId() {return parseInt(localStorage.getItem("userId"))}

class TaskList extends Component {
  state = {
    tasks: []
  }

  //******************************************************************************
  //Re-renderer
  //******************************************************************************
  tasksRerenderer = () => {
    ApiManager.getAll("tasks", `_sort=expectedCompletionDate&_order=asc&userId=${loggedInUserId()}`)
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
  // Handle DELETE
  //******************************************************************************
  handleDelete = (id) => {
    ApiManager.delete("tasks", id)
      .then(() => this.tasksRerenderer())
  }

  //******************************************************************************
  //Handle EDIT
  //******************************************************************************
  handleEdit = (id) => {
    console.log("EDIT key", id)
  }



  //******************************************************************************
  // componentDidMount()
  //******************************************************************************
  // Fetching the data from the Json file and setting it as state
  componentDidMount() {
    ApiManager.getAll("tasks", `_sort=expectedCompletionDate&_order=asc&userId=${loggedInUserId()}`)
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
        <h1>Tasks</h1>

        <button type="button" className="btn btn-primary"
          onClick={() => {
            this.props.history.push("/tasks/new" // Add new task routing
            )
          }}>Add New</button>

        {
          this.state.tasks.map(task =>
            <TasksCard
              key={task.id}
              task={task}
              handleCheckbox={this.handleCheckbox}
              handleDelete={this.handleDelete}
              handleEdit = {this.handleEdit}
              {...this.props}
            />
          )
        }
      </>
    )
  }
}

export default TaskList