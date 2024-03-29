---
title: JS中的ExecutionContext
date: '2020-07-07'
desc: 详解JS中的执行上下文
---

在之前的[JS 中的 Hoisting](../js-hoisting/index.md)博客中，我们探究了`声明提升（Hoisting）`中的一些细节，但是还是有一个很重要的细节没说，那就是`Hoisting`到底是怎么运作的，这就涉及到了本篇博客要说的内容：`执行上下文（Execcution Context）`

> PS: 这篇博客基本上是对这篇博客的翻译：[Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)，并再次基础上对照官方规范做了一定的修改

## 何为执行上下文（Execution Context）

执行上下文是一个抽象的概念，主要是用来描述代码运行的环境，你可以把它想象成一个容器，代码是在这个容器中运行的

执行上下文种类：

- 全局执行上下文（Global Execution Context）：
  这是默认的，最基础的执行上下文，一个程序中只能存在一个全局执行上下文。在此上下文中运行的代码是不包括函数的。并且它主要做两件事：1. 创建一个全局对象，在浏览器中这个全局对象就是 `window` 2. 将 `this` 指向这个全局对象
- 函数执行上下文（Functional Execution Context）：
  每当函数被调用时就会为这个函数创建一个新的执行上下文，一个程序中可以存在多个函数执行上下文
- Eval 函数执行上下文（Eval Function Execution Context）：
  在 `eval` 函数中执行的代码也具有其自己的执行上下文，但是由于 `eval` 通常不被使用，因此在此不再赘述

## 执行栈（Execution Stack）

执行栈也没称为`调用栈（Call Stack）`，具有 `LIFO` 的数据结构，主要是用来存放代码执行期间创建的所有执行上下文

当 JS 引擎首次加载代码时，它会创建一个全局执行上下文并将其推送到执行栈中

每当函数被调用时，JS 引擎会为这个函数创建一个函数执行上下文并将其推送到执行栈中，此时函数执行上下文处于栈的最顶部

当函数执行完成时，其对应的执行上下文会被 JS 引擎从执行栈中弹出

```js
let a = 'Hello World!';
function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}
function second() {
  console.log('Inside second function');
}
first();
console.log('Inside Global Execution Context');
```

![An Execution Context Stack for the above code](https://miro.medium.com/max/2000/1*ACtBy8CIepVTOSYcVwZ34Q.png)

## 执行上下文是如何创建的

执行上下文的创建主要有两个阶段：

1. 创建阶段
2. 执行阶段

### 创建阶段

在代码实际执行前创建执行上下文，此阶段会发生以下事情：

1. 创建词法环境（LexicalEnvironment）组件
2. 创建变量环境（VariableEnvironment）组件

此时的执行上下文在概念上可以用以下形式表现：

```js
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>,
}
```

#### 词法环境（Lexical Environment）

[ES6 规范](http://www.ecma-international.org/ecma-262/#sec-lexical-environments)将词法环境定义为：

> 词法环境是一种规范类型，基于 ECMAScript 代码的词法嵌套结构来定义标识符与特定变量和函数的关联关系。词法环境由环境记录（environment record）和可能为空引用（null）的外部词法环境组成。

简而言之，**词法环境是保存 标识符-变量 映射的结构（此处的标识符是指变量/函数的名称，而变量是实际对象【包括函数对象和数组对象】或原始值的引用）**

```js
var a = 20;
var b = 40;
function foo() {
  console.log('bar');
}
```

上述代码的词法环境可以表示如下：

```js
lexicalEnvironment = {
  a: 20,
  b: 40,
  foo: <ref. to foo function>
}
```

词法环境主要有三种类型：

- 全局环境（global environment）：
  全局环境的词法环境的对外部词法环境的引用是为空的。全局环境的环境记录会预填充标识符绑定，并且会包含一个关联的全局对象。该对象的属性提供了某些全局环境的标识符绑定。当代码实际执行时，可以将其他属性添加到全局对象，并且可以修改初始属性
- 函数环境（function environmen）：
  函数环境的词法环境对应着函数的调用。此词法环境会建立新的 `this` 绑定。此环境还捕获支持用 `super` 方法调用所需的状态
- 模块环境（module environment）：
  模块环境的词法环境包含模块顶级声明的绑定。它还包括模块显示导入的绑定。模块环境的外部环境是全局环境

**PS：**词法环境和环境记录的值纯粹是规范机制，程序无法直接访问或操纵这些值

##### 环境记录（Environment Record）

环境记录主要是记录着在其关联词法环境内创建的标识符绑定，它也被称为词法环境的环境记录

环境记录主要有两种类型：

1. 声明性环境记录（Declarative environment record）：
   顾名思义，它存储变量和函数声明。函数的词法环境会包含一个新的声明性环境记录
2. 对象环境记录（Object environment record）：
   全局代码的词法环境包含客观的环境记录。除了变量和函数声明外，对象环境记录还存储全局绑定对象（浏览器中的 `window` ）。因此，对于每个绑定对象的属性（对于浏览器，它包含浏览器提供给窗口对象的属性和方法），将在记录中创建一个新条目。

**PS：**对于函数代码，环境记录还包含一个 `arguments` 对象，该对象包含传递给函数的索引和参数之间的映射及传递给函数的参数的长度

```js
function foo(a, b) {
  var c = a + b;
}
foo(2, 3);

// argument object
Arguments: {0: 2, 1: 3, length: 2}
```

环境记录除了上面两个抽象类型，还存在以下类型：

1. 函数环境记录（Function Environment Records）：
   函数环境记录是声明性环境记录，用于表示函数的顶级范围，如果该函数不是 ArrowFunction，则提供此绑定。如果一个函数不是 ArrowFunction 函数，并且引用了 super，则其函数 Environment Record 也包含用于从函数内部执行 super 方法调用的状态
2. 全局环境记录（Global Environment Records）：
   逻辑上，全局环境记录是单个记录，但它被指定为封装对象环境记录和声明性环境记录的复合记录
3. 模块环境记录（Module Environment Records）：
   模块环境记录是声明性环境记录，用于表示 ECMAScript 模块的外部范围

**PS：**`this` 是在环境记录中进行确定和绑定的

在全局执行上下文中，`this` 执行全局对象

在函数执行上下文中，`this` 取决于函数的调用方式。详细可以看之前写的博客：[JS 中的 this 指向和 new 的作用](/JS中的this指向和new的作用)

```js
const person = {
  name: 'peter',
  birthYear: 1994,
  calcAge: function () {
    console.log(2018 - this.birthYear);
  },
};

person.calcAge();
// 'this' refers to 'person', because 'calcAge' was called with //'person' object reference

const calculateAge = person.calcAge;
calculateAge();
// 'this' refers to the global window object, because no object reference was given
```

上面的代码在词法环境中可以用以下伪代码表示：

```js
GlobalExectionContext = {
  LexicalEnvironment: {
    GlobalEnvironmentRecord: {
      Type: "Object",
      this: <global object>,
      // Identifier bindings go here
    }
    outer: <null>
  }
}

FunctionExectionContext = {
  LexicalEnvironment: {
    FunctionEnvironmentRecord: {
      Type: "Declarative",
      this: <depends on how function is called>,
      // Identifier bindings go here
    }
    outer: <Global or outer function environment reference>
  }
}
```

##### 对外部环境的引用

对外部环境的引用意味着它可以访问其外部词汇环境，如果在当前词法环境中找不到变量，那么 JS 引擎可以在外部环境中查找变量

#### 变量环境（Variable Environment）

变量环境其实也是一个词法环境，其环境记录包含在此上下文中有 `var` 创建的绑定

如上所述，变量环境也是词法环境，因此它具有如上定义的词法环境的所有属性和组成部分

在 ES6 中，词法环境组件和变量环境组件之间的区别是前者用于存储函数声明和变量（`let` 和 `const`）绑定，而后者仅用于存储变量（`var`）绑定

### 执行阶段

在此阶段，将完成对所有这些变量的分配，并最终执行代码

```js
let a = 20;
const b = 30;
var c;
function multiply(e, f) {
  var g = 20;
  return e * f * g;
}
c = multiply(20, 30);
```

执行上述代码后，JS 引擎将创建全局执行上下文以执行全局代码。因此，在创建阶段，全局执行上下文将如下所示：

```js
GlobalExectionContext = {
  LexicalEnvironment: {
    GlobalEnvironmentRecord: {
      Type: "Object",
      ThisBinding: <Global Object>,
      // Identifier bindings go here
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>
  },
  VariableEnvironment: {
    GlobalEnvironmentRecord: {
      Type: "Object",
      ThisBinding: <Global Object>,
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>
  }
}
```

在执行阶段，将完成变量分配。因此，在执行阶段，全局执行上下文将看起来像这样：

```js
GlobalExectionContext = {
  LexicalEnvironment: {
      GlobalEnvironmentRecord: {
        Type: "Object",
        ThisBinding: <Global Object>,
        // Identifier bindings go here
        a: 20,
        b: 30,
        multiply: < func >
      }
      outer: <null>
    },
  VariableEnvironment: {
      GlobalEnvironmentRecord: {
        Type: "Object",
        ThisBinding: <Global Object>,
        // Identifier bindings go here
        c: undefined,
      }
      outer: <null>
    }
}
```

当遇到对函数 `multiple(20，30)` 的调用时，将创建一个新的函数执行上下文以执行函数内代码。因此，函数执行上下文在创建阶段将如下所示：

```js
FunctionExectionContext = {
  LexicalEnvironment: {
      FunctionEnvironmentRecord: {
        Type: "Declarative",
        ThisBinding: <Global Object or undefined>,
        // Identifier bindings go here
        Arguments: {0: 20, 1: 30, length: 2},
      },
      outer: <GlobalLexicalEnvironment>
    },
  VariableEnvironment: {
      FunctionEnvironmentRecord: {
        Type: "Declarative",
        ThisBinding: <Global Object or undefined>,
        // Identifier bindings go here
        g: undefined
      },
      outer: <GlobalLexicalEnvironment>
    }
}
```

此后，执行上下文将进入执行阶段，这意味着已完成对函数内部变量的分配。因此，函数执行上下文在执行阶段将如下所示：

```js
FunctionExectionContext = {
  LexicalEnvironment: {
      FunctionEnvironmentRecord: {
        Type: "Declarative",
        ThisBinding: <Global Object or undefined>,
        // Identifier bindings go here
        Arguments: {0: 20, 1: 30, length: 2},
      },
      outer: <GlobalLexicalEnvironment>
    },
  VariableEnvironment: {
      FunctionEnvironmentRecord: {
        Type: "Declarative",
        ThisBinding: <Global Object or undefined>,
        // Identifier bindings go here
        g: 20
      },
      outer: <GlobalLexicalEnvironment>
    }
}
```

函数完成后，返回值存储在 `c` 中。因此，全局词法环境已更新。之后，全局代码完成，程序完成。

**PS：** `let` 和 `const` 定义的变量在创建阶段没有任何关联的值，但是 `var` 定义的变量设置为 `undefined`

这是因为，在创建阶段，将在代码中扫描变量和函数声明，而将函数声明完整存储在环境中，则变量最初会设置为 `undefined`（对于 `var` ）或保持未初始化（在 `let` 和 `const`）

这就是为什么可以在声明 `var` 定义变量之前访问它们（尽管未定义），但是在访问 `let` 和 `const` 变量之前声明它们时获得引用错误的原因

这就是我们之前说的声明提升 `Hoisting`

**PS：**在**执行阶段**，如果 JS 引擎在源代码中声明的实际位置找不到 `let` 变量的值，则它的值会分配为 `undefined`

## 参考链接

[Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

[ES6 规范](http://www.ecma-international.org/ecma-262/#sec-executable-code-and-execution-contexts)
