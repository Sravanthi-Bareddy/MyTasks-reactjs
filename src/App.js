import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    tasks: [],
    taskInput: '',
    selectedTag: tagsList[0].optionId,
    activeTag: '',
  }

  handleTaskInputChange = event => {
    this.setState({taskInput: event.target.value})
  }

  handleTagChange = event => {
    this.setState({selectedTag: event.target.value})
  }

  handleAddTask = event => {
    event.preventDefault()
    const {taskInput, selectedTag} = this.state
    if (taskInput.trim() !== '') {
      const newTask = {
        id: uuidv4(),
        task: taskInput,
        tag: selectedTag,
      }
      this.setState(prevState => ({
        tasks: [...prevState.tasks, newTask],
        taskInput: '',
        selectedTag: tagsList[0].optionId,
      }))
    }
  }

  handleTagClick = tagId => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === tagId ? '' : tagId,
    }))
  }

  getFilteredTasks = () => {
    const {tasks, activeTag} = this.state
    if (activeTag === '') {
      return tasks
    }
    return tasks.filter(task => task.tag === activeTag)
  }

  render() {
    const {taskInput, selectedTag, activeTag} = this.state
    const filteredTasks = this.getFilteredTasks()

    return (
      <div className="app-container">
        <h1 className="main-heading">Create a task!</h1>
        <div className="form-container">
          <form onSubmit={this.handleAddTask}>
            <label className="task-label" htmlFor="task">
              Task
            </label>
            <input
              type="text"
              id="task"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.handleTaskInputChange}
            />
            <label className="tags-label" htmlFor="tags">
              Tags
            </label>
            <select
              id="tags"
              value={selectedTag}
              onChange={this.handleTagChange}
            >
              {tagsList.map(tag => (
                <option key={tag.optionId} value={tag.optionId}>
                  {tag.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <h1 className="main-heading">Tags</h1>
        <ul className="tags-list">
          {tagsList.map(tag => (
            <li key={tag.optionId}>
              <button
                type="button"
                className={`tag-button ${
                  activeTag === tag.optionId ? 'active' : ''
                }`}
                onClick={() => this.handleTagClick(tag.optionId)}
              >
                {tag.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="main-heading">Tasks</h1>
        {filteredTasks.length > 0 ? (
          <ul className="tasks-list">
            {filteredTasks.map(task => (
              <li key={task.id} className="task-item">
                <p className="task-text">{task.task}</p>
                <p className="task-tag">
                  {tagsList.find(tag => tag.optionId === task.tag).displayText}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks-text">No Tasks Added Yet</p>
        )}
      </div>
    )
  }
}

export default App
