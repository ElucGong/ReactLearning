# React笔记

### 1. 规范

1. class名首字母大写，大驼峰式
2. htmlFor，onClick，类似这种小驼峰 



### 2. 事件处理

1. 普通函数的this指向运行时所在作用域指向的对象（作用域·指函数包裹或类）

2. 箭头函数的this指向定义时所在作用域指向的对象

3. react事件绑定不是绑在具体dom节点元素上，而采用事件代理模式，代理在root上，等冒泡到root上再去一层层找，因此不是class实例调用onClick的函数，函数中的this不会指向类实例

4. ```jsx
   import React, { Component } from 'react'
   
   export default class App extends Component {
       render() {
           return (
               <div>
                   <button onClick={this.handleClick1}></button>
                   <button onClick={() => this.handleClick2()}></button>
               </div>
           );
       }
       
       handleClick1 = () => {
           console.log(this.a);//成功因为箭头函数使得这里的this绑在App上了
       }
       
       handleClick2() {
           console.log(this.a);//成功因为onClick处箭头函数使onClick处this绑在App上
           					//是App实例调用handleClick2，this正确指向App实例
       }
   }
   ```

   

### 3. ref

给标签设置ref可以获取真实dom节点，给组件设置ref可以获取到组件对象

通过this.myref.current取到dom节点

```jsx
myref = React.createRef();
render(
    <div>
        <input ref={this.myref} />
        <button onClick={() => console.log(this.myref.current.value)}>click</button>
    </div>
);
```

