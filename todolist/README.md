# Mobx
Mobx todolist小案例

#### 安装依赖： npm install

#### 运行： npm start

![image](http://pexpn9gr1.bkt.clouddn.com/mobx-todoList.jpg)

#### 部分代码
```javasxript
import React, { Component, Fragment } from 'react';
import {observable, action, computed} from 'mobx';
import {PropTypes} from "prop-types";
import {observer, PropTypes as ObservablePropTypes } from 'mobx-react'
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

```

![image](http://pexpn9gr1.bkt.clouddn.com/thanks-star.jpg) 
