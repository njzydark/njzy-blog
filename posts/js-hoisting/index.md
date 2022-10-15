---
title: JS中的Hoisting
date: '2020-05-30'
desc: 详解JS中的声明提升
---

之前写过一篇博客 [JS 中的作用域和闭包](../js-scope-closure/index.md)，里面简单的介绍过 JS 中的声明提升（Hoisting），但是最近发现 Hoisting 并没有表面看起来那么简单，有很多细节当时也没有介绍清楚，所以这里准备从以下几个问题入手，重新梳理一遍：

1. 何为 Hoisting
2. 为什么需要 Hoisting
3. 变量声明和函数声明提升的区别
4. 同名的变量声明和函数声明谁的优先级高
5. 函数参数会得到声明提升吗
6. let 和 const 存不存在 Hosting
7. 什么是 TDZ
8. 在块内进行函数声明有什么异常表现

## 何为 Hoisting

我们先从以下代码开始：

```js
console.log(a);
```

执行结果为 `ReferenceError: a is not defined`，这里很好理解，因为变量 a 并不存在

```js
var a = 1;
console.log(a);
```

执行结果为：`1`，因为打印 a 时，变量 a 已存在并且值为 1

```js
console.log(a);
var a = 1;
```

执行结果为：`undefined`，这里可能会有疑问，打印 a 时 a 并不存在啊，不应该报错吗，为啥会显示`undefined`

其实上面的代码可以等价于这个：

```js
var a;
console.log(a);
a = 1;
```

可见，变量的声明被提升了，这就是我们要说的 Hoisting

除了变量声明会被提升，函数声明也会

```js
foo();
function foo() {
  console.log('foo');
}
```

执行结果为：`foo`

## 为什么需要 Hoisting

至于为啥需要 Hoisting，详细内容看下这篇文章 [Two words about “hoisting”.](http://dmitrysoshnikov.com/notes/note-4-two-words-about-hoisting/)

文章的结论是，使用 Hoisting 主要是为了使函数可以相互递归调用 mutual recursion

这里我们看一下相互递归的例子：

```js
function loop(n) {
  if (n < 10) {
    logEvenOrOdd(++n);
  }
}

loop(0);

function logEvenOrOdd(n) {
  console.log(n, n % 2 ? 'Odd' : 'Even');
  loop(n);
}
```

可见这里 `loop` 和 `logEvenOrOdd` 进行了相互递归调用，如果不存在 Hoisting，它们之前的相互调用是根本没办法实现的

## 变量声明和函数声明提升的区别

看以下代码：

```js
console.log(a);
var a = 3;
foo();
bar();
function foo() {
  console.log('foo');
}
var bar = function () {
  console.log('bar');
};
```

输出结果为：

```bash
undefined
foo
TypeError: bar is not a function
```

由输出结果我们可以得出以下结论：

- 变量和函数声明都会得到提升
- 变量声明提升时不包括赋值
- 函数表达式不存在函数声明提升，仅仅是变量声明提升

## 同名的变量声明和函数声明谁的优先级高

那如果变量名和函数明同名会怎么样，看这个例子：

```js
a();
var a = 1;
console.log(a);
function a() {
  console.log('a1');
}
function a() {
  console.log('a2');
}
```

输出结果为：

```bash
a2
1
```

由输出结果我们可以得出以下结论：

- 函数声明的优先级比变量声明高
- 同名的函数声明会被覆盖

## 函数参数会得到声明提升吗

```js
foo(1);
function foo(a) {
  console.log(a);
  var a = 10;
}
```

输出结果为：`1`

在 foo(1)执行时，foo 内部等价于这个：

```js
function foo() {
  var a = 1;
  var a;
  console.log(a);
  a = 10;
}
```

那么这里不是重复声明了 a 吗，不应该是 undefined 吗，我们单独来看一个例子：

```js
var a = 1;
var a;
console.log(a);
```

输出结果为：`1`，代码等价于这个：

```js
var a;
var a;
a = 1;
console.log(a);
```

## let 和 const 存不存在 Hosting

之前我一直认为用 let 和 const 是不存在 Hoisting 的，直到看到这段代码：

```js
var a = 1;
function foo() {
  console.log(a);
  let a = 10;
}
foo();
```

这段代码的实际执行结果不是 `1`，而是执行报错了：`ReferenceError: Cannot access 'a' before initialization`

可见`let`声明的变量实际上是得到了提升，只不过表现跟`var`不同，这也就是接下来要说到的概念: `TDZ`

## 什么是 TDZ

TDZ 全称为：Temporal Dead Zone，一句话概括就是：在提升之后和赋值之前这段时间就被成为 TDZ，在这段时间内是无法访问变量的

```js
var a = 1;
function foo() {
  console.log(a); // a的TDZ开始
  let a = 10; // a的TDZ结束
}
foo();
```

我们再看一个例子：

```js
foo();
let b = 10;
function foo() {
  console.log(b);
}
```

这里我们要注意一个点，TDZ 跟时间有关，跟空间无关，也就是说虽然`b`在`foo`之前被赋值了，但是时间上，`foo`实际执行时，`b`还没有被赋值，也就是还处于 TDZ 时间范围内，所以上面代码执行时会报错：

```bash
ReferenceError: Cannot access 'b' before initialization
```

## 在块内进行函数声明有什么异常表现

根据 [MDN 块级函数定义](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)，我们可以得出以下结论：

- 在严格模式下，从 ES2015 开始，在块内进行的函数声明属于这个块，也就是具备块级作用域
- 在 ES2015 之前，在块内进行的函数声明是没有块级作用域的
- 在非严格模式下是不推荐在块内进行函数声明的，因为表现很诡异

---

下面我们就来看下非严格模式下到底是什么情况：

示例代码：

```js
console.log(foo);
if (true) {
  function foo() {
    console.log('foo');
  }
}
```

执行结果：

```bash
undefined
```

可见，`foo`被提升了，并且值为`undefined`

---

示例代码：

```js
console.log(foo);
if (true) {
  console.log(foo);
  foo = 10;
  function foo() {
    console.log('foo');
  }
  console.log(foo);
}
console.log(foo);
```

执行结果：

```bash
undefined
[Function: foo]
10
10
```

上面的代码可以等价于这个：

```js
var foo;
console.log(foo);
if (true) {
  let foo_1;
  foo_1 = function () {
    console.log('foo');
  };
  console.log(foo_1);
  foo_1 = 10;
  foo = foo_1;
  console.log(foo_1);
}
console.log(foo);
```

---

```js
console.log(foo);
if (true) {
  console.log(foo);
  function foo() {
    console.log('foo');
  }
  foo = 10;
  console.log(foo);
}
console.log(foo);
```

执行结果：

```bash
undefined
[Function: foo]
10
[Function: foo]
```

上面的代码可以等价于这个：

```js
var foo;
console.log(foo);
if (true) {
  let foo_1;
  foo_1 = function () {
    console.log('foo');
  };
  console.log(foo_1);
  foo = foo_1;
  foo_1 = 10;
  console.log(foo_1);
}
console.log(foo);
```

所以说表现是很诡异的，具体可以看 stackoverflow 上这个提问： [What are the precise semantics of block-level functions in ES6?](https://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)

## 参考链接

[我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)

[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
