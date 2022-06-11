---
title: JS中的Mutable与Immuatable
date: '2020-05-22'
desc: 详解JS中的Mutable与Immuatable
---

在 React 中，我们可能会遇到一个问题：在组件是`PureComponent`时更新`state`或更新`props`后发现页面并没有发生变化，也就是没有重新 render。针对这个问题，我学习到了之前没有接触过的两个概念：

- Mutable 数据是可变的
- Immutable 数据是不可变的

在详细介绍之前，我们先回顾一下 JS 中的数据类型

## JS 数据类型

js 中的值**value**的类型（数据类型）总共有**8 种**，按照类别我们可以分为**原始类型**和**其他类型**

### 原始类型

- Null
- Undefined
- String
- Boolean
- Number
- Symbol
- Bigint

这些类型的值都成为**原始值(primitive value)**，它们都是**不可变的(Immutable)**

### 其他类型

- Object

除了常见的 object 对象以下都属于 Object 类型：

- Function
- Array
- Date
- RegExp
- Map
- Set

其中**object 和 array 就是可变的(Mutable)**

### 类型判断

我们可以使用`typeof`来进行类型判断

```js
typeof 'hello'; // string
typeof true; // boolean
typeof 1; // number
typeof Symbol(); // symbol
typeof BigInt(1); // bigint
typeof function () {}; // function
typeof undefined; // undefined

typeof null; // object
typeof {}; // object
typeof []; // object
```

这里我们发现以下类型可以直接通过`typeof`进行判断：

- string
- boolean
- number
- undefined
- bigint
- symbol
- function

但是 array、null 和普通的 object 用 typeof 返回的都是 object，这里我们可以这样判断：

```js
Object.prototype.toString.call([]); // [object Array]
Array.isArray([]); // true
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call({}); // [object Object]
```

## Immutable

通过上面我们已经知道原始值是不可变的，这里我们用实际代码测试一下：

```js
let a = 123;
let b = a;
a = 234;
console.log(a, b); // 234 123
```

这个简单的例子具体流程如下：

1. 声明一个变量，名字叫 a
2. 把值 123 分配给变量 a，此时 a 的值为 123
3. 声明一个变量，名字叫 b
4. 把变量 a 的值分配给变量 b，此时 b 的值是 123
5. 把 234 赋值给变量 a，此时变量 a 的值是 234

我们可以看到，把变量 a 的值赋值给变量 b 后，修改变量 a 的值，变量 b 并没有发生变化

## Mutable

为什么会说 object 和 array 是 mutable，我们可以看以下代码：

```js
let arr = [1, 2, 3];
let a1 = arr;
a1.shift();
console.log(arr, a1); // [ 2, 3 ] [ 2, 3 ]
console.log(arr === a1); // true

let obj = {
  age: 80,
};
let o1 = obj;
o1.name = 'test';
console.log(obj, o1); // { age: 80, name: 'test' } { age: 80, name: 'test' }
console.log(obj === o1); // true
```

这里我们可以看出两个问题：

1. 在修改 a1 和 o1 后，arr 和 obj 的值也发生了改变
2. 虽然 arr 和 obj 的值发生了改变，但是两者在进行值判断时还是相等的

问题 1 就说明了 arr 和 obj 是 mutable，可变的
问题 2 是因为在进行值判断时，判断的是他们的引用值，因为引用值没有发生改变，所以它们相等

### 引用值

其实这里的引用值指的就是内存地址，接着上面的例子，我们把数组[1,2,3]赋值给变量 arr，这里 arr 实际上获得了数组在内存中的地址，也就是引用值，通过这个引用值我们可以访问到数组，在把变量 arr 的值赋值给 a1 时，a1 也就获得了一份内存地址的拷贝，也就能指向同一个数组，所以通过 a1 修改数组时，数组发生了改变，但是内存地址并没有改变，所以在做比较时，两者是相等的

这里我们还要注意一点，我们可以通过引用值修改数组，但是不能进行覆盖，覆盖的话会开辟新的内存区域并指向它，我们可以看这个例子：

```js
let arr = [1, 2, 3];
let a1 = arr;
a1 = [2, 3, 4];
console.log(arr, a1); // [ 1, 2, 3 ] [ 2, 3, 4 ]
console.log(arr === a1); // false

let obj = {
  age: 80,
};
let o1 = obj;
o1 = {
  name: 'test',
};
console.log(obj, o1); // { age: 80 } { name: 'test' }
console.log(obj === o1); // false
```

我们在看一个例子：

```js
let name = 'test';
function changeName(name) {
  name = 123;
}
changeName(name);
console.log(name); // test

let obj = {
  name: 'test',
};
function changeObj(obj) {
  obj.name = 123;
}
changeObj(obj);
console.log(obj); // { name: 123' }
```

这里我们可以看到，将对象传递给函数的值也是引用值

### 深浅拷贝

既然说到了引用值，这里我们就来说下深浅拷贝，我们首先来看一个例子：

```js
const arr = [
  {
    name: '123',
  },
  {
    name: 'sad',
  },
  {
    name: 'op',
  },
];

const a1 = [...arr];
a1.shift();
a1[0].age = 80;

console.log(arr, a1); // [ { name: '123' }, { name: 'sad', age: 80 }, { name: 'op' } ] [ { name: 'sad', age: 80 }, { name: 'op' } ]
console.log(arr === a1); // false
```

具体流程如下：

1. 声明一个变量 arr，指向数组
2. 声明一个变量 a1，利用扩展运算符对 arr 做了一次**浅拷贝**开辟了新的内存区域，获取到了一个新数组，并让 a1 指向新数组
3. 利用数组的 shift 方法，对 a1 指向的数组做了一次修改操作，移除了数组中的第一项
4. 再次对 a1 指向的数组做了一次修改操作，把当前数组的第一项的值改为了 80
5. 打印 arr 和 a1
6. 比较 arr 和 a1 的引用值是否相等

通过输出结果我们可以看出：

1. 通过扩展运算符得到的新数组只是对原数组的一次浅拷贝
2. 在 a1 删除一项之后，当前数组的第一项指向的对象其实就是原数组 arr 的第二项中的对象，所以修改 a1[0].age 会改变原数组第二项中对象 age 的值

上面都是浅拷贝，这里我们看下深拷贝：

```js
const arr = [
  {
    name: '123',
  },
  {
    name: 'sad',
  },
  {
    name: 'op',
  },
];

const a1 = JSON.parse(JSON.stringify(arr));
a1.shift();
a1[0].age = 80;

console.log(arr, a1); // [ { name: '123' }, { name: 'sad' }, { name: 'op' } ] [ { name: 'sad', age: 80 }, { name: 'op' } ]
console.log(arr === 1); // false
```

这里简单的利用 JSON 方法进行了一次深拷贝，可以看到对 a1 进行操作，完全不会影响到原数组。

## PureComponent 与 React.memo

PureComponent 与 React.memo 都是为了防止组件重复渲染，前者通过对 props 和 state 进行浅比较，用于 class 组件；后者只比较 props 用于函数组件

既然都是浅比较，那么开头说到的 props 或者 state 发生变化，没有重新 render 的问题就找到根本原因了，因为如果传递的是可突变的数据（Mutable），只要引用值没有发生修改，就不会重新 render

```jsx
import React, { PureComponent } from 'react';

export default class App extends PureComponent {
  state = {
    data: [
      {
        name: '123',
      },
      {
        name: 'test',
      },
    ],
  };

  handleAdd = () => {
    const { data } = this.state;
    data.push({
      name: 999,
    });
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <button onClick={this.handleAdd}>Add</button>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
```

当点击 add 按钮时，页面并没有发生变化，看下 handleAdd 方法就会发现问题所在，因为这里我们没有改变 data 的引用值，换成这种写法即可解决：

```jsx
handleAdd = () => {
  const { data } = this.state;
  const newData = [...data, { name: '999' }];
  this.setState({ data: newData });
};
```

这里介绍一个库，[immer](https://immerjs.github.io/immer/docs/introduction)，可以正常操作突变类型的值，但是最终会返回一个全新的不可变（Immutable）的值

```jsx
import React, { PureComponent } from 'react';
import produce from 'immer';

export default class App extends PureComponent {
  state = {
    data: [
      {
        name: '123',
      },
      {
        name: 'test',
      },
    ],
  };

  handleAdd = () => {
    this.setState(
      produce(draft => {
        draft.data.push({
          name: '999',
        });
      })
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <button onClick={this.handleAdd}>Add</button>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
```
