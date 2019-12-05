import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager.js'

const loggedInUser = 1 // REPLACE WITH LOCALSTORAGE


export class TasksNewForm extends Component {
//******************************************************************************
//STATE
//******************************************************************************
  state = {
    task: "",
    expectedCompletionDate: "",
    loadingStatus: false,
};

//******************************************************************************
//Handle form FIELD CHANGE and UPDATE the STATE accordingly 
//******************************************************************************
handleFieldChange = evt => {
  const stateToChange = {};
  stateToChange[evt.target.id] = evt.target.value;
  this.setState(stateToChange);
};
//******************************************************************************
//CONSTRUCT a new TASK
//******************************************************************************
constructNewTask = evt => {
  evt.preventDefault();
  if (this.state.task === "" || this.state.expectedCompletionDate === "") {
      window.alert("Please input a task name and due date");
  } else {
      this.setState({ loadingStatus: true });
      const task = {
          task: this.state.task,
          userId: loggedInUser,
          expectedCompletionDate: this.state.expectedCompletionDate,
          isComplete: false

      };
      console.log (task)


      // Create the task and redirect user to task list
      ApiManager.post("tasks",task)
      .then(() => this.props.history.push("/tasks"));
  }
};


//******************************************************************************
//render()
//******************************************************************************
  render() {
    return (
      <div>
        
          <form className="card-body">
                <fieldset>
                <h1> Add New Task</h1>
                    <div className="card-content">
                        <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="task"
                        placeholder="Task Name"
                        />
                      </div><br />
                      <div>
                        <input
                        type="date"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="expectedCompletionDate"
                        placeholder="Due On"
                        />
                    </div>
                    <br></br>
                    <div className="alignRight">    
                        <button
                        type="button" className="btn btn-primary"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewTask}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
      </div>
    )
  }
}

export default TasksNewForm
