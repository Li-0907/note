---
title: state & ref 使用注意事项
---

### state 注意事项

react 中的 state 是异步的，如果要执行一些耗时较长的代码，会出现点击不生效的问题
eg:

```javascript
import { useState } from 'react'

const App = () => {
  const [num, setNum] = useState(0)

  const addHandler = () => {
    setTimeout(() => {
      setNum(num + 1)
    }, 1000)
  }

  const subHandler = () => {
    setNum(num - 1)
  }

  return (
    <>
      <div className="container">
        <div>{num}</div>
        // 点击 + 多次，但是一秒内只执行一次
        <button onClick={addHandler}>+</button>
        <button onClick={subHandler}>-</button>
      </div>
    </>
  )
}

export default App
```

所以在 react 中的 setXxx 中，我们可以使用回调函数的形式执行修改操作，回调函数中包含一个参数，代表上一次的 state
eg: 上面的例子可以修改为：

```javascript
import { useState } from 'react'

const App = () => {
  const [num, setNum] = useState(0)

  const addHandler = () => {
    setTimeout(() => {
      setNum(value => value + 1) // 以回调函数形式调用，保证数据是最新的状态。
    }, 1000)
  }

  const subHandler = () => {
    setNum(num - 1)
  }

  return (
    <>
         {' '}
      <div className="container">
              <div>{num}</div>      <button onClick={addHandler}>+</button>      <button onClick={subHandler}>-</button>   {' '}
      </div>
       {' '}
    </>
  )
}

export default App
```

**结论： 我们在使用 state 时，只要用到上一次 state 的值，就使用回调函数的方式**

### useRef()注意事项

在 react 中获取 dom 对象的钩子函数
usage:

```javascript
import { useRef } from 'react'

const App = () => {
  // react中的钩子函数只能在组件作用域下使用，不能在组件中的其他函数中使用
  const button = useRef()

  return (
    <>
            <button ref={button}>button</button> {' '}
    </>
  )
}

export default App
```

此时 button 的值是一个对象： { current: button 原生 dom 对象 }，访问时使用 button.current

useRef 的返回值就是一个普通的 js 对象，甚至我们可以手动创建一个：

```javascript
const App = () => {
  const button = { current: undefined }

  const changeButtonText = () => {
    button.current.innerText = 'test'
  }

  return (
    <>
      <button ref={button}>button1</button>
      <button onClick={changeButtonText}>button2</button>
    </>
  )
}

export default App
```

此时我们点击 button2 去修改 button1 的 innerText 时，也是生效的。

但是二者也有区别，因为对象处于函数作用域内，我们在重新渲染组件时（数据更新或刷新页面），函数都会重新渲染一个新对象。
