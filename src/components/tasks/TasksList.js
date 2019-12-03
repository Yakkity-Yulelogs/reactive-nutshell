import React, {Component} from 'react'
import ApiManager from '../../modules/ApiManager.js'
import TasksCard from './TasksCard'

const loggedInUser=1

class TaskList extends Component {
  state={
    tasks: []
  }

// Fetching the data from the Json file and setting it as state
componentDidMount() {
  ApiManager.getAll("tasks", `_sort=expectedCompletionDate&_order=asc&userId=${loggedInUser}`)
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
  return(
    <>
    {
      this.state.tasks.map(task=>
        <TasksCard 
        key={task.id} 
        task={task} 
        />
        )
    }
    </>
  ) 
}
}

export default TaskList