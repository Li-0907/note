---
title: start
---

## 创建 react 项目

### react 脚手架

```javascript
npx create-react-app demo 【推荐】

npm init create-react-app demo

yarn create react-app demo
```

### npx

npx 是 npm5.2 以后引入的指令，代表所有的包都临时下载，不会在环境中找，避免污染本地环境

## 类组件

以类的形式声明组件，只要继承 React 中的 Component 类，就可以调用它里面的方法，包括 state，rander 等方法。

```javascript
import React from 'react'

export default class App extends React.Component {}
```

### staue

类似 vue 中的数据，在 state 中定义数据。

```javascript
import React from 'react'

export default class App extends React.Component {
  state = {
    num: 1
  }
}
```

### rander

rander 的 return 值即为你想要渲染在页面上的内容，在 react 中也需要将所有的节点写到一个根节点中，如果不想多生成一个 html 标签，可以使用 **<></>** 空标签包裹所有的 html 标签。
**在 rander 中，需要使用一对花括号包裹你想执行的 js 和 state 数据。**

```javascript
import React from 'react'

const msg = '123456789'

export default class App extends React.Component {
  state = {
    num: 1
  }
  render() {
    return (
      <>
        <p>{this.state.num}</p>
        <button
          onClick={() => {
            this.setState({ num: this.state.num + 1 })
          }}>
          累加
        </button>
        <button onClick={() => this.addNum()}>累加1</button>
      </>
    )
  }
  addNum() {
    this.setState({ num: this.state.num + 1 })
  }
}
```

### 调用

在 react 工程中的 index.js 中

```javascript
import ReactDom from 'react-dom/client'

import App from './App1'

// 调用ReactDom中的createRoot方法指定dom元素渲染的元素
const root = ReactDom.createRoot(document.getElementById('root'))

// 渲染
root.render(<App />)
```

### 改变 state

类似 vuex，state 数据需要修改时，推荐使用类中的 **this.setState()** 方法。(注意 this 指向问题)

## 函数式组件

函数式组件式用函数的方式定义 react 组件。函数式组件没有生命周期，而是以 hooks 模拟。**hooks 函数只能在函数式组件的顶端申明和调用。**

```javascript
import React, { useEffect, useState } from 'react'

export default function App1() {
  return (
    <>
      <div> 函数式组件 </div>
      <button>累加</button>

      <div>函数式组件</div>
      <button>累加</button>
    </>
  )
}
```

在函数式组件中 return 的值即为组件的 html 元素，用 **{ }** 代表要执行的 js 或者渲染的 state 数据

### hooks : useState()

这个 hook 为设置 state 状态的函数，此函式的返回值为一个长度为 2 的数字

- 返回值 1 为这个 state 数据
- 返回值 2 为需要改变这和 state 时我们要调用的函数

```javascript
import React, { useState } from 'react'

export default function App1() {
  const [num1, setNum1] = useState(1)
  const [num2, setNum2] = useState(1)

  return (
    <>
      <div>{num1}</div>
      <button onClick={() => setNum1(num1 + 1)}>累加</button>

      <div>{num2}</div>
      <button onClick={() => setNum2(num2 + 1)}>累加</button>
    </>
  )
}
```

### 默认事件和事件冒泡

```javascript
const Test = () => {
  const clickMe = event => {
    alert('a标签')
  }

  const clickDiv = event => {
    alert('div')
  }

  return (
    <div>
      Test组件
      <div onClick={clickDiv} style={{ backgroundColor: 'red' }}>
        <a href="https://www.baidu.com" onClick={clickMe}>
          点击
        </a>
      </div>
    </div>
  )
}

export default Test
```

- 在以上这个组件被渲染后，点击 a 标签，他会触发 a 标签的点击事件，但是由于事件冒泡，他上层的 div 上的相同事件名的事件也会触发，即会触发 div 的点击事件
- 同样因为他是一个 a 标签，他会默认触发他的跳转事件

想要阻止这些事件，可以：

```javascript
const Test = () => {
  const clickMe = event => {
    // 取消默认事件
    event.preventDefault()
    // 阻止事件冒泡
    event.stopPropagation()
    alert('a标签')
  }

  const clickDiv = event => {
    alert('div')
  }

  return (
    <div>
      Test组件
      <div onClick={clickDiv} style={{ backgroundColor: 'red' }}>
        <a href="https://www.baidu.com" onClick={clickMe}>
          点击
        </a>
      </div>
    </div>
  )
}

export default Test
```

### hooks : useEffect()

在函数式组件中没有生命周期，但 useEffect()函数 会在组件创建，更新时执行，也可以设置监听在哪个数据更新时执行这个 useEffect()函数。

```javascript
import React, { useEffect, useState } from 'react'

export default function App1() {
  const [num1, setNum1] = useState(1)
  const [num2, setNum2] = useState(1)

  // 第二个参数不传，代表监听所有的state
  useEffect(() => {
    console.log('useEffect执行了')
  })

  return (
    <>
      <div>{num1}</div>
      <button onClick={() => setNum1(num1 + 1)}>累加</button>

      <div>{num2}</div>
      <button onClick={() => setNum2(num2 + 1)}>累加</button>
    </>
  )
}
```

```javascript
import React, { useEffect, useState } from 'react'

export default function App1() {
  const [num1, setNum1] = useState(1)
  const [num2, setNum2] = useState(1)

  // 第二个参数传递一个数组，数组的值为state，代表在这个数据更新后去执行对应的useState函数
  useEffect(() => {
    console.log('useEffect执行了')
  }, [num1])

  return (
    <>
      <div>{num1}</div>
      <button onClick={() => setNum1(num1 + 1)}>累加</button>

      <div>{num2}</div>
      <button onClick={() => setNum2(num2 + 1)}>累加</button>
    </>
  )
}
```

## props

函数式组件的函数参数位置可以接收一个参数，代表从父组件传递的值，与 vue 类似，父组件可以直接以自定义属性的方式为子组件提供数据。
**父组件**

```javascript
import Logs from './components/Logs/Logs'
import './App.css'
import Add from './components/Add/Add'

function App() {
  return (
    <>
      <Add />
      <div className="App">
        <Logs date={new Date()} learnName="学习React" learnTime="150" />
        <Logs date={new Date()} learnName="学习Vue" learnTime="80" />
      </div>
    </>
  )
}

export default App
```

**子组件**

```javascript
import MyDate from './MyDate/MyDate'
import './Logs.css'

const Logs = props => {
  return (
    <div className="Logs">
      <MyDate date={props.date} />
      <div className="task">
        <div>{props.learnName ? props.learnName : '未知'}</div>
        <div className="time">{props.learnTime ? props.learnTime : '0'}min</div>
      </div>
    </div>
  )
}

export default Logs
```
