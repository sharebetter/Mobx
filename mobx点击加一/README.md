#### 安装依赖：npm install
#### 运行： npm start

### 主要代码
```javascript
import React, { Component } from 'react';
//observable设定需要观测的值，action用于改变观测的值
import {observable, action} from 'mobx';
//porp-types用于校验组件传值类型
import {PropTypes} from "prop-types";
//mobx-react有提供专门使用与mobx的PropTypes，observer放在需要检测的组件上
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
  //判断父组件传值的类型
    // queue: PropTypes.array
    queue: ObservablePropTypes.observableArray
  };
  render () {
  //获取父组件传递的值
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
	  //通过this.props.action 执行父组件传递的方法
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
	  //往Foo组件传值和action
        <Foo cache = {store.cache} add = {store.add}></Foo>
      </div>
    );
  }
}

export default App;

```