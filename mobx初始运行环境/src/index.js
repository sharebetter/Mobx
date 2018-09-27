import {observable, isArray, computed} from 'mobx';

class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;
}

var store = new Store();
var foo = computed(()=>{ return store.string + '/' + store.number })

console.log(foo)

// const arr = observable(['a','b','c']);
// console.log(arr)
// document.write('hello')
