import React, { Component } from 'react'

export class TasksNewForm extends Component {
  state = {
    task: "",
    expectedCompletionDate: "",
    loadingStatus: false,
};




  render() {
    return (
      <div className="card">
        <h1> Add New Task</h1>
          <form>
                <fieldset>
                    <div className="card-content">
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="task"
                        placeholder="Task Name"
                        />
                      </div>
                      <div>
                        <input
                        type="date"
                        required
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
                        onClick={this.constructNewAnimal}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
      </div>
    )
  }
}

export default TasksNewForm
