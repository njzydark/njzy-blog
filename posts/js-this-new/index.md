---
title: JS中的this指向和new的作用
date: '2020-01-12'
desc: 在函数调用时，this到底指向谁，new具体是啥作用
---

今天重新回顾了`<< You Don't Know JS >>`上卷第二章关于 this 指向的问题，这里就重新总结梳理以下。

**在不考虑箭头函数的情况下，this 具体指向谁是由函数实际调用时的位置决定的，跟 this 在代码中的位置无关。**

其中 this 的绑定总共存在四种规则，按优先级从低到高依此为：

1. 默认绑定
2. 隐示绑定
3. 显示绑定
4. new 绑定

## 默认绑定

```js
function foo() {
  console.log(this.a);
}

foo.a = 2;

foo();
```

执行结果为：`undefined`

因为 foo 函数在调用时没有任何修饰或者说被某个对象包含，调用位置是在全局对象（注意宿主环境）中，即使 foo.a 给 foo 对象定义了一个属性 a，并将值赋值为 2，但实际调用时 this 无法使用其他绑定规则，只能使用默认绑定，this 指向的是全局对象，因为全局对象中不存在 a，所以结果为 undefined

```js
function foo() {
  console.log(this.a);
}

a = 3;

foo.a = 2;

foo();
```

执行结果为：3

因为此时全局对象中存在变量 a

### 严格模式

如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此 this 会绑定到 undefined：

```js
function foo() {
  'use strict';
  console.log(this.a);
}

a = 3;

foo.a = 2;

foo();
```

## 隐示绑定

```js
function foo() {
  console.log(this.a);
}

let obj = {
  a: 2,
  foo: foo,
};

obj.foo();
```

执行结果为：2

foo 函数在实际调用时，是依托于 obj 这个对象的或者说是被 obj 这个对象包含，所以会采用隐示绑定的规则，this 将指向 obj

但是隐示绑定会存在一种情况：**this 指向丢失**

### 隐示绑定 this 丢失

```js
function foo() {
  console.log(this.a);
}

let obj = {
  a: 2,
  foo: foo,
};

const bar = obj.foo;

a = 3;

bar();
```

执行结果为：3

首先我们要明白一点，obj.foo 只是对 foo 函数的引用，实际的值只是一个引用地址，当将这个值赋值给 bar 时还是一个引用地址，当调用 bar()时，由于不属于任何对象，所以会使用默认绑定规则，将 this 绑定到全局对象中

## 显示绑定

```js
function foo() {
  console.log(this.a);
}

const obj = {
  a: 2,
};

foo.call(obj);
```

执行结果：2

foo 在调用时使用了`call`方法，这个方法的会强制改变 this 指向并立即执行，其中第一个参数就是 this 要绑定到的对象，第二个参数为函数参数

以下方法都可以强制改变 this 指向：

- call
- apply
- bind

其中 bind 调用后不会立即执行函数，而是会返回一个函数，返回的函数中已经明确表示了 this 的指向，call 和 apply 在调用后都会立即执行函数，主要区别是 call 可以给函数传递多个参数`foo.call(obj,arg1,arg2,arg3)`，而 apply 只能传递一个参数数组`foo.call(obj,[arg1,arg2,arg3])`

## new 绑定

```js
function Foo() {
  this.a = 2;
  console.log(this.a);
}

const f1 = new Foo();
```

执行结果：2

在不考虑 new 操作符的情况下，Foo 的调用其实就是一个普通函数调用，但加了 new 之后，这就变成了一个构造函数调用，会自动执行以下步骤：

1. 创建或者说构造一个全新的对象象
2. 这个新对象会被执行 [[原型]] 连接
3. 这个新对象会绑定到函数调用的 this
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

所以上面的代码实际等同于：

```js
function Foo() {
  this.a = 2;
  console.log(this.a);
}

function FakeNew(func, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, func.prototype);
  const result = func.apply(obj, args);
  return result instanceof Object ? result : obj;
}

const f1 = FakeNew(Foo);
```

## 总结

- 由 new 调用？绑定到新创建的对象
- 由 call 或者 apply （或者 bind ）调用？绑定到指定的对象
- 由上下文对象调用？绑定到那个上下文对象
- 默认：在严格模式下绑定到 undefined ，否则绑定到全局对象
