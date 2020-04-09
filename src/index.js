import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';
import TodoItem from './todoItem'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todo: '',
      todos: []
    }
  }

  addTodo = (e) => {
    e.preventDefault()
    console.log('added Todo')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderTodos = () => {
    return this.state.todos.map(item => {
      return (
        <TodoItem key={item.id} item={item} />
      )
    })
  }

  componentDidMount() {
    axios
      .get('https://jel-flask-todo-api.herokuapp.com/todos')
      .then(res => {
        this.setState({
          todos: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className='app'>
        <h1>Hello From App</h1>
        <form className='add-todo' onSubmit={this.addTodo}>
          <input
            type='text'
            placeholder=' Add Todo Item'
            name='todo'
            onChange={(e) => this.handleChange(e)}
            value={this.state.todo} />
          <button type='submit'>Add</button>
        </form>
        {this.renderTodos()}
      </div>
    )
  }
}


ReactDOM.render(
  <App />, document.getElementById("root")
);

