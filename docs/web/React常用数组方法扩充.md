---
title: React常用数组方法扩充
---

# array.map( ( value, index, array ) => {} )
将回调函数的return值返回成一个新数组
```javascript
let arr = [1, 2, 3, 4, 5, 6]


let newArr = arr.map((value, index, array) => {
  return 10
})


console.log(newArr);    // [ 10, 10, 10, 10, 10, 10 ]
```

# array.filter( (value, index, array) => {} )
根据回调函数的返回值确定是否保留此项
```javascript
let arr = [1, 2, 3, 4, 5, 6]

let newArr = arr.filter((value, index, array) => {
  return value % 2 == 0 ? true : false
})

// 简写
// let newArr = arr.filter((value, index, array) => value % 2 == 0)

console.log(newArr);
```

# array.find( (value, index, array) => {} )
返回数组中符合条件的第一个元素
```javascript
let arr = [1, 2, 3, 4, 5, 6]


let newArr = arr.find((value, index, array) => value % 2 == 0)


console.log(newArr); // 2
```

# array.reduce( (previousValue, currentValue, currentIndex, array) => {} , initialValue)
对数组进行合并或者自定义运算
initialValue代表初始值，即函数第一次执行时的previousValue
```javascript
let arr = [1, 2, 3, 4, 5, 6]

// 累加
let newArr = arr.reduce( (pre, curr, index, array) => pre + curr , 10)

console.log(newArr); // 21

// 累乘
let newArr1 = arr.reduce( (pre, curr, index, array) => pre * curr , 10)

console.log(newArr1); // 720
```




















