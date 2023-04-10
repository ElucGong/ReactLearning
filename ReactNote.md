# React笔记

## 一、基础部分

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



### 4. setState

异步更新，第二个参数为回调函数，状态和dom更新完后被触发



### 5. betterScroll库

第三方库，管理长列表滑动，好用



### 6. props

属性检查，默认属性，属性名一样可以用扩展运算符

```jsx
import xxx from 'prop-types'

class ...{
    //属性类型检查，传进来的不一致会报错
    static propTypes = {
    	propA: xxx.string,	//要求是string类型
    	propB: xxx.bool		//要求是bool类型
	};

	//默认属性
	static defaultProps = {
        propB: true
    };
}
```



### 7. input的受控vs非受控

非受控：用ref获取值，用defaultValue设置默认值，但value变化了传不到其他组件也不会重新render

受控：把state赋值给value，使得value和state绑定了，用onChange控制变化（react的input的onChange和onInput行为一样，要用前者）



### 8. 表单域的受控vs非受控

受控：父传子，子传父

非受控：把ref绑在组件上，获取到组件对象后，可以读取组件的state，并调取组件的setState方法（最好包一下，做成组件的成员函数）



### 9. 插槽

子组件中留好this.props.children（数组）空位，父组件中可以在子组件标签之间写jsx，作用：

1. 提高复用，想插什么插什么
2. 一定程度上减少父子通信，父组件中在子组件标签之间写的jsx可以拿到父状态



### 10. 旧生命周期

1. componentDidMount

   把axios数据请求、调用订阅函数、setInterval和基于创建完的dom的初始化放在这里

2. componentDidUpdate(prevProps, prevState)

   可以用this直接拿到新属性、状态，旧的用参数prevProps和prevState

3. shouldComponentUpdate(nextProps, nextState)，用于性能优化

   可以直接拿到旧属性、状态，新的用参数nextProps和nextState

4. 2和3state的比较可以用JSON.stringfy(this.state) !== JSON.stringfy(nextState)比较



### 11. 新生命周期

1. getDerivedStateFromProps(nextProps, nextState) 

   **根据props设置state，要加static关键字，为类方法，所以用不了this，获取不到之前的状态**
   
   第一次的初始化组件以及后续的更新过程中(包括自身状态更新以及父重新渲染子、给子传属性) ，返回一个对象作为新的state，返回null则说明不需要在这里更新state，但axios请求不放在这里，因为return立即执行而axios需要等数据返回，所以axios放在componentDidUpdate里 
   
2. getSnapshotBeforeUpdate

   在真正update前的一瞬间，return value可以在componentDidUpdate(prevProps, prevState, value)中获取

