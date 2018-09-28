import React, { Component, Fragment } from 'react';
import {observable, action, computed} from 'mobx';
import {PropTypes} from "prop-types";
import {observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import { finished } from 'stream';
import { link } from 'fs';
import './App.css';


class Todo {
  @observable id = Math.random();
  @observable title = "";
  @observable finished =  false ;

  constructor (title) {
    this.title =  title;
  }

  @action finishedToggle () {
    this.finished = !this.finished;
  }
}

class Store {
  @observable todos = [] ;
  @action createTodo (title) {
    this.todos.unshift(new Todo(title));
  }
  @action delTodo (todo) {
    //remove非数组自带方法，是mobx-react提供的
    this.todos.remove(todo);
  }
  //计算属性
  @computed get unfinished () {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

let store =  new Store();

@observer
class TodoItem extends Component {

  static propTypes = {
    //传入todo
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired,
      finishedToggle: PropTypes.func
    }).isRequired,
    //传入store
    store: PropTypes.shape({
      todos: PropTypes.array.isRequired,
      delTodo: PropTypes.func.isRequired
    }).isRequired,
  }
  render () {
    let todo = this.props.todo;
    let store = this.props.store
    return (
     <Fragment>
        <input type="checkbox" onChange={()=>todo.finishedToggle()} className="toggle" checked={todo.finished}></input>
        {/* 动态添加class */}
        <span className={['title',todo.finished && 'finished'].join(' ')}>{todo.title}</span>
        <span className="cross" onClick = {()=>store.delTodo(todo)}>X</span>
     </Fragment>
    )
  }
}

@observer
class ToDoList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      // 对store内的数据进行类型校验
      //todos为observableArray，其内数据为observableObject，isRequired表示store，todos必须存在，
      createTodo: ObservablePropTypes.func,
      todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
    }).isRequired
  }
  constructor (props) {
    super(props);
    this.state = {
      inputValue:''
    }
  }
  handlerChange (e) {
    let inputValue = e.target.value;
    this.setState({
      inputValue
    })
  }
  handlerSubmit (e) {
    e.preventDefault();
    let store = this.props.store;
    store.createTodo(this.state.inputValue);
    this.setState({
      inputValue:''
    })
  }
  render () {
    let store = this.props.store;
    return (
    <div className = "todo-list">
      <header>
        <form onSubmit = {(e)=>this.handlerSubmit(e)}>
          <input type="text" className="input" placeholder="what needs to be finished" value={this.state.inputValue}  onChange={e=>this.handlerChange(e) } />
        </form>
      </header>
      <ul>
        {store.todos.map((todo)=>{
          return <li key={todo.id} className='todo-item'>
            <TodoItem todo={todo} store = {store}/>
          </li>
        })}
      </ul>
      <footer>
        {store.unfinished} item(s) unfinished
      </footer>
    </div>)
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoList store = {store} />
      </div>
    );
  }
}

export default App;
