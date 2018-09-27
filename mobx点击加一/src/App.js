import React, { Component } from 'react';
import {observable, action} from 'mobx';
import {PropTypes} from "prop-types";
import {observer, PropTypes as ObservablePropTypes } from 'mobx-react'

class Store {
   @observable cache = {queue:[]};
   @action add () {
     this.cache.queue.push(1);
   }
}

const store = new Store();

@observer
class Bar extends Component {
  static propTypes = {
    // queue: PropTypes.array
    queue: ObservablePropTypes.observableArray
  };
  render () {
    const queue = this.props.queue;
    return (
    <div>
      {queue.length}
    </div> )
  }
}

class Foo extends Component {
  static propTypes = {
    // cache: PropTypes.object
    cache: ObservablePropTypes.observableObject
  }
  render () {
    const cache = this.props.cache;
    return (
      <div>
         <button onClick = {()=> this.props.add() }>加一</button>
          <Bar queue = {cache.queue} />
      </div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Foo cache = {store.cache} add = {store.add}></Foo>
      </div>
    );
  }
}

export default App;
