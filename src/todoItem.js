import React, { Component } from 'react';

export default class TodoItem extends Component {
  constructor(props) {
    super()

    this.state = {
      done: props.item.done,
    }
  }

  toggleDone = () => {
    fetch(
      `http://jel-flask-todo-api.herokuapp.com/todo/${this.props.item.id}`,
      {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          done: !this.state.done,
        }),
      }
    ).then((res) => {
      this.setState({
        done: !this.state.done,
      })
    })

  }

  render() {

    return (
      <div className='todo-item'>
        <input
          type='checkbox'
          defualtChecked={this.state.done}
          onClick={this.toggleDone}
        />
        <p className={this.state.done ? 'done' : null}>
          {this.props.item.title}
        </p>
        <button>X</button>
      </div>
    )
  }
}