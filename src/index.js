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

  deleteItem = id => {
    fetch(`https://jel-flask-todo-api.herokuapp.com/todo/${id}`, {
      method: 'DELETE'
    })
      .then(
        this.setState({
          todos: this.state.todos.filter(item => {
            return item.id !== id
          })
        })
      )
  }

  addTodo = (e) => {
    e.preventDefault()
    axios.post('https://jel-flask-todo-api.herokuapp.com/todo', {
      title: this.state.todo,
      done: false,
    })
      .then(res => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          todo: "",
        })
      })
      .catch((err) => console.log("add todo error: ", err));

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderTodos = () => {
    return this.state.todos.map(item => {
      return (
        <TodoItem key={item.id} item={item} deleteItem={this.deleteItem} />
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

