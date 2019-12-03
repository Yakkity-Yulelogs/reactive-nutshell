import React, {Component} from 'react'
import ApiManager from '../../modules/ApiManager.js'

class TaskList extends Component {
  state={
    tasks: []
  }

// Fetching the data from the Json file and setting it as state
componentDidMount() {
  console.log ("componentDidMount")
  ApiManager.getAll("tasks")
  .then ((tasksArr)=>{
    this.setState(
      {
        tasks: tasksArr
      }
    )
  })
}

// Rendering the data from state
render(){
  console.log ("RENDER")
  console.log ("state:", this.state)
  return(
    <>
    {
      this.state.tasks.map(task=>
        <div className='card'>
        <div className="card-content">
        <h2 className="card-tasks">{
        
        task.task}</h2>
        </div>
        </div>
        )
    }
    </>
  ) 
}
}






export default TaskList