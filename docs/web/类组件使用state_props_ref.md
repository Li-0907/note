---
title: 类组件使用state_props_ref
---

类组件的创建：

创建一个类，继承 React.component

至少包含一个 render 函数，返回 jsx，相当于函数式组件的返回值

其实在类组件中，props,state,ref 都是存在于类组件的实例中的，在 render 函数中 console.log(this)可以看到：

_List {props: {…}, context: {…}, refs: {…}, updater: {…}, \_reactInternals: FiberNode, …}_

**context**: {}

**props**: {}

**refs**: {}

**state**: null

**updater**: {isMounted: _ƒ_, enqueueSetState: _ƒ_, enqueueReplaceState: _ƒ_, enqueueForceUpdate: _ƒ_}

**\_reactInternalInstance**: {*processChildContext: *ƒ\*}

**\_reactInternals**: FiberNode {tag: 1, key: null, stateNode: List, elementType: _ƒ_, type: \*ƒ\_, …}

**isMounted**: (...)

**replaceState**: (...)

[[Prototype]]: Component

### props

所以在使用 props 时候，父组件操作不变，直接在组件上添加属性即可
子组件中：

```javascript
import React from 'react'

class List extends React.Component {
  render() {
    const { name, age, gender } = this.props // 从this.props中解构出父组件传递的值

    return (
      <>
        <ul>
          <li>姓名：{name}</li> <li>年龄：{age}</li> <li>性别：{gender}</li>   
        </ul>
      </>
    )
  }
}

export default List
```

### state

state 相当于类中的属性，所以创建方法为：

```javascript
import React from 'react'

class List extends React.Component {
  state = {
    // 创建一个state
    test: 'test',
    count: 0
  }

  render() {
    const { name, age, gender } = this.props

    return (
      <>
              <h1>{this.state.count}</h1>   
        <ul>
          <li>姓名：{name}</li>  <li>年龄：{age}</li> <li>性别：{gender}</li> 
        </ul>
      </>
    )
  }
}

export default List
```

当需要修改时候：

```javascript
import React from 'react'

class List extends React.Component {
  state = {
    test: 'test',
    count: 0
  }

  addCount = () => {
    // 修改state,因为使用了上次的state,所以使用函数形式调用
    this.setState(prevState => {
      return { count: prevState.count + 1 }
    })
  }

  render() {
    const { name, age, gender } = this.props

    return (
      <>
        <h1>
          {this.state.count} --- {this.state.test}
        </h1>
        <button onClick={this.addCount}>+</button>
        <ul>
          <li>姓名：{name}</li>
          <li>年龄：{age}</li>
          <li>性别：{gender}</li>
        </ul>
      </>
    )
  }
}

export default List
```

**在类组件中，直接赋值你需要的 state 即可，原有的 state 不会消失！**
**但是仅限于直接存储在 state 中的值，例如以下情况：**

```javascript
state = {
  test: 'test',
  count: 0,
  obj: {
    name: '张三',
    age: 18
  }
}
```

在只修改 this.state.obj.name 时，其他属性还是会消失。
所以在这种情况下，修改 state 需要:

```javascript
setState(prevState => {
  return {
    obj: { ...this.state.obj, name: '李四' }
  }
})
```

### ref

使用 ref 则需要从 React 对象中调用 React.createRef()函数来创建。创建的同样是 { current : 绑定的 dom 元素 }

```javascript
divRef = React.createRef()   // 创建ref


  render() {


    const { name, age, gender } = this.props


    console.log(this.divRef)


    return <>
      <h1>{this.state.count} --- {this.state.test}</h1>
      <button onClick={this.addCount}>+</button>
      <ul ref={divRef}>					// 绑定的元素
        <li>姓名：{name}</li>
        <li>年龄：{age}</li>
        <li>性别：{gender}</li>
      </ul>
    </>
  }
```

于函数组件相同，我们同样可以直接：

```javascript
divRef = { current: null }
```

以这种方式直接使用 ref,同样在组件重新渲染时会重新创建对象。
