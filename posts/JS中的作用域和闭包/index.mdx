---
title: JS中的作用域和闭包
date: '2019-08-10'
desc: JS中的作用域和闭包
---

> 所有内容都是在读完[You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed)上卷第一部分整理而来

## 作用域

- 作用域就是一套规则，通过这些规则 JavaScript 引擎可以很方便的找到需要的变量
- 作用域是可以嵌套的，嵌套的作用域又称为作用域链，在当前作用域无法找到某个变量时，js 引擎就会在外层嵌套的作用域中继续查找，直到找到该变量或抵达最外层的作用域（也就是全局作用域）为止
- 作用域共有两种主要的工作模型：词法作用域和动态作用域。JavaScript 采用的为词法作用域。简单地说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（排除一些欺骗词法作用域的方法是这样的）
- 除全局作用域外，JavaScript 还存在函数作用域和块作用域。两者的行为表现是一样的，任何声明在某个作用域内的变量，都将附属于这个作用域
- 变量声明和函数声明会在当前的作用域中得到提升
- 函数声明和变量声明都会被提升，但是函数会首先被提升，其次是变量。如果遇到重复声明，后出现的声明如果为变量声明则被忽略，为函数声明则覆盖前者

### 1. LHS 查询和 RHS 查询

js 引擎会为需要的变量进行`LHS`查询和`RHS`查询。当要找到某个变量并为其执行赋值操作时则进行 LHS 查询，只是简单的获取某个变量则进行 RHS 查询

```javascript
function foo(b) {
  console.log(b);
}
var a = 2;
foo(a);
```

上述代码的 LHS 查询有 2 次，RHS 查询有 4 次。

LHS 查询：

1. 执行`var a = 2`时，会对变量 a 进行赋值操作
2. 调用`foo()`时有一步隐含的赋值操作`b=2`

RHS 查询：

1. 调用`foo()`时对 foo 有一次 RHS 查询
2. 调用 foo()时要传递 a 参数，对 a 有一次 RHS 查询
3. 执行 foo 时会对`console`对象进行一次 RHS 查询
4. 执行 console.log 操作时要获取 b

### 2. 查询异常

在变量还没有声明（在任何作用域中都无法找到该变量）时，进行 LHS 查询或 RHS 查询的行为是不同的

```javascript{2}
function foo(b) {
  console.log(b + c)
}
var a = 2
foo(a)
```

执行上述代码，js 引擎会抛出`ReferenceError`异常，这是因为在对变量 c 进行 RHS 查询时是无法找到该变量的

相较之下，当 js 引擎执行 LHS 查询时，如果在顶层（全局作用域）中也无法找到目标变量，就会在全局作用域中创建一个具有该名称的变量。如果 RHS 查询找到了一个变量但为其值进行了不合理的操作，那么 js 引擎会抛出`TypeError`异常

### 3.词法作用域

词法作用域是 JavaScript 采用的作用域工作模型

词法作用域就是定义在词法阶段（编译器的第一个工作阶段）的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里决定的，因此当词法分析器处理代码时会保持词法作用域不变（排除一些欺骗词法作用域的方法是这样的）

见以下代码：

```javascript
function foo(a) {
  var b = a * 2;
  function bar(c) {
    console.log(a, b, c);
  }
  bar(b * 3);
}
foo(2);
```

这段代码有三个逐级嵌套的作用域。这里为了方便起见，我们称他们为作用域气泡，以下就是这三个气泡：

1. 包含着整个全局作用域，其中只有一个标识符：foo
2. 包含着 foo 所创建的作用域，其中有三个标识符：a、bar 和 b
3. 包含着 bar 所创建的作用域，其中只有一个标识符：c

当 js 引擎执行以上代码时，会按照作用域查询规则，由内到外查询，直到遇见第一个匹配的标识符为止。并且只会查找一级标识符。如果代码引用了 foo.bar.baz 词法作用域只会试图找到 foo 标识符，找到这个变量后，对象属性访问原则会分别接管对 bar 和 baz 属性的访问

这里注意一点：**无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定**

### 4.函数作用域和块作用域

上面介绍的是 JavaScript 的作用域工作模型，下面介绍 js 作用域的几种类型。除全局作用域外，js 中还存在函数作用域和块作用域

#### 4-1.函数作用域

函数作用域的含义指属于这个函数的全部变量都可以在整个函数的范围内使用及其复用，但无法在外部作用域中对函数内部的变量进行访问

```javascript
function foo() {
  var a = 2;
  function bar() {
    var b = 3;
    console.log(a + b);
  }
  bar();
}
foo();
```

在上面的代码片段中，函数 foo 创建了一个作用域气泡，其中包含了标识符 a 和 bar。函数 bar 也创建了一个作用域气泡，其中包含了标识符 b。全局作用域也有自己的作用域气泡，其中包含了标识符 foo

由于标识符 a、bar 属于 foo 作用域气泡，所以无法从 foo 的外部（全局作用域）对他们进行访问。标识符 b 属于 bar 作用域气泡，所以在 foo 中也无法直接进行访问。但根据作用域嵌套查询规则，bar 气泡嵌套在 foo 气泡中，所以可以在 bar 中访问 a

#### 4-2.块作用域

虽然函数作用域是最常见的作用域单元，但其他类型的作用域单元也是存在的，并且通过其他类型的作用域单元甚至可以实现维护起来更加优秀、简洁的代码

```javascript
for (var i = 0; i < 6; i++) {
  console.log(i);
}
console.log(i);
```

如果我们想让上述代码片段中的变量 i 只存在于 for 循环中，也就是说在全局作用域中无法对 i 进行访问，那么就需要块作用域

块作用域最常见的创建方式就是 ES6 中新引入的`let`关键字。出了 let，我们还可以使用`const、with、try/catch`来创建，这里不做讨论

上述代码可以用 let 来改写：

```javascript
for (let i = 0; i < 6; i++) {
  console.log(i);
}
```

这里注意一点：**for 循环头部的 let 不仅将变量 i 绑定到了 for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值**

下面是一段经典的代码片段：

```javascript{1}
for(var i = 0;i<6;i++) {
  setTimeout(function(){console.log(i)},1000)
}
```

结果打印 6 个 6

```javascript{1}
for(let i = 0;i<6;i++) {
  setTimeout(function(){console.log(i)},1000)
}
```

结果打印 0 1 2 3 4 5

### 5.声明提升

作用域同其中的变量声明出现的位置是存在某种联系的。看下面代码片段：

```javascript
console.log(a);
var a = 2;
```

打印 undefined 并不会由于对 a 进行 RHS 查询发现不存在报 ReferenceError 异常

上面的代码其实等同于下面：

```javascript{1}
var a = undefined
console.log(a)
a = 2
```

由此可见**声明本身会被提升，而赋值或其他运行逻辑会保留在原地**

再看下面一段代码：

```javascript
foo();
function foo() {
  console.log(a);
  var a = 2;
}
```

打印`undefined` 由此可见 foo 函数的声明被提升了。另外要注意的是，**每个作用域都会进行提升操作**。上述代码中的变量 a 的声明就是在所属作用域 foo 函数中进行提升的

**函数声明会被提升，但函数表达式（区分函数声明和表达式最简单的方法就是看 function 关键字出现在整个声明中的位置，如果是第一个词就是函数声明，否则就是一个函数表达式）不会**。代码如下：

```javascript
foo();
var foo = function bar() {
  console.log(a);
  var a = 2;
};
```

报`TypeError`异常和`ReferenceError`异常

报 TypeError 异常是因为变量 foo 声明会被提升 此时 foo 为 undefined 当对 foo()进行 RHS 查询时会导致非法操作，所以报 TypeError 异常而不是 ReferenceError

报 ReferenceError 异常是因为**函数表达式不会被提升，即使是具名的函数表达式**。所以对 bar()进行 RHS 查询时是找不到标识符 bar 的，所以报 ReferenceError

还有一点需要注意的是：**函数声明和变量声明都会被提升，但是函数会首先被提升，其次是变量。如果遇到重复声明，后出现的声明如果为变量声明则被忽略，为函数声明则覆盖前者**。可见下面代码：

```javascript
foo();
var foo = 2;
function foo() {
  var a = 1;
  console.log(a);
}
function foo() {
  var a = 100;
  console.log(a);
}
```

打印 100 var foo 会被忽略 第二个 foo 的函数声明会覆盖第一个

---

## 闭包

- 闭包是基于词法作用域书写代码时所产生的自然结果
- 当函数可以记住并访问所在的词法作用域时就产生了闭包，即使函数是在当前词法作用域之外执行

以下代码清晰的展示了闭包：

```javascript
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz();
```

打印 2 当 foo 执行以后并没有被垃圾回收机制处理，这是因为闭包阻止了。因为 bar 声明的位置，它拥有 foo 内部作用域的闭包，使得该作用域能够一直存活，以供 bar 在之后任何时间进行引用

无论以何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到闭包：

```javascript
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  baz(bar);
}
function baz(fn) {
  fn();
}
foo();
```

把内部函数 bar 传递给 baz，当调用这个内部函数时（现在叫 fn），它涵盖的 foo 内部作用域的闭包就可以观察到了，因为它能够访问 a

接下来我们看一段常见的代码：

```javascript
function foo(message) {
  setTimeout(function () {
    console.log(message);
  }, 1000);
}
foo('Hello World!');
```

打印 Hello World！

下面来解释为什么能打印 Hello World：

1. foo 函数创建了一个函数作用域
2. foo 作用域内部存在一个传递给`setTimout`的函数，我们称他为回调函数
3. 因为回调函数声明在 foo 内部作用域中，所以它能狗访问 foo 内部的标识符 message，拥有了对 foo 内部作用域的闭包
4. 当执行 foo 后，闭包阻止了 foo 被垃圾回收机制处理，所以回调函数可以正常运行并访问标识符 message

闭包在循环中也很常见，见以下代码：

```javascript
for (var i = 0; i < 6; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

前面说过会打印 6 个 6，并介绍了可以利用 let 来创建块作用域让它打印 0 1 2 3 4 5。这里我们使用函数作用域和闭包来解决此问题：

```javascript
for (var i = 0; i < 6; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i);
}
```

我们在回过头看用 let 创建块作用域的代码：

```javascript
for (let i = 0; i < 6; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

在仔细看一下，其实这就是利用块作用域和闭包共同解决的
