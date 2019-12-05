import React, { Component } from 'react'
import ApiManager from '../modules/ApiManager'

function loggedInUserId() {return parseInt(localStorage.getItem("userId"))}

export class TasksEditForm extends Component {
//******************************************************************************
//STATE
//******************************************************************************
  state = {
    task: "",
    expectedCompletionDate: "",
    loadingStatus: true,
  };
//******************************************************************************
//Handle form FIELD CHANGE and UPDATE the STATE accordingly 
//******************************************************************************
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

//******************************************************************************
//UPDATE existing task
//******************************************************************************
updateExistingTask = evt => {
  evt.preventDefault()
  this.setState({ loadingStatus: true });
  const editedTask = {
    id: this.props.match.params.taskId,
    userId: loggedInUserId(),
    task: this.state.task,
    expectedCompletionDate: this.state.expectedCompletionDate,
    isComplete: this.state.isComplete
  };

  ApiManager.update("tasks", (editedTask)) // API PUT call
  .then(() => this.props.history.push("/tasks"))  // re-routing
}

//******************************************************************************
//componentDidMount()
//******************************************************************************
  componentDidMount() {
    ApiManager.get("tasks", this.props.match.params.taskId)
      .then(task => {
        this.setState({
          task: task.task,
          expectedCompletionDate: task.expectedCompletionDate,
          loadingStatus: false,
        })
      })}

//******************************************************************************
//render()
//******************************************************************************
  render() {
    return (
      <>
        <form>
          <fieldset>
            <div className="card">
            <label htmlFor="task">Task</label>
              <input
                type="text"
                required
                className="card-content"
                onChange={this.handleFieldChange}
                id="task"
                value={this.state.task}
              />
              <label htmlFor="expectedCompletionDate">Due on</label>

              <input
                type="date"
                required
                className="card-content"
                onChange={this.handleFieldChange}
                id="expectedCompletionDate"
                value={this.state.expectedCompletionDate}
              />
            </div>

            <div className="alignRight">
              <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingTask}
                className="btn btn-primary"
              >Submit</button>
            </div>
          </fieldset>
        </form>
      </>
    )
  }
}

export default TasksEditForm
