---
title: JS Module 发展回顾
date: '2020-09-29'
desc: 回顾 JS Module 发展历程，加深对 JS Module 的理解
---

`JS` 模块的发展可以分为以下几个阶段:

1. VanillaWay
2. CommonJS
3. AMD
4. CMD
5. UMD
6. ES Module

## VanillaWay

在最开始的阶段，`JS` 其实是没有成熟的模块体系的，代码如果需要按模块划分，基本都是单独放到一个文件里，比如下面这个 `utils` 文件：

```js
// utils.js
var PI = 3.14;
function area(radius) {
  return PI * radius * radius;
}
```

如果需要使用 `utils` 中的方法，就需要在 `script` 标签中引入，但是这种使用方式有一个很明显的问题就是 `PI` 被暴露到了全局作用域中，所以为了隐藏它，当时很流行使用 `Immediately Invoked Function Expression (IIFE)` 来解决这个问题：

```js
// utils.js
var utils = (function () {
  var PI = 3.14;
  function area(radius) {
    return PI * radius * radius;
  }
  return { area };
})();
```

但是这还是没有解决作用域会被污染的问题，`utils` 还是存在全局作用域中，这可能会和其他模块或库产生命名冲突

## CommonJS

随着 `NodeJS` 的出现，它实现了 `CommonJS` 规范，提供了 `module.exports` 和 `require` 等语法来实现模块化，比如下面这两个文件：

```js
// utils.js
var PI = 3.14;
function area(radius) {
  return PI * radius * radius;
}
module.exports = area;
```

```js
// index.js
var newArea = require('./utils.js');
console.log(newArea(2));
```

除了用 `module.exports` 来导出模块，`exports` 也是可以的，它实际上是对 `module.exports` 的引用，`module.exports` 的初始值为一个空对象：

```js
var PI = 3.14;
function area(radius) {
  return PI * radius * radius;
}
// module.exports = {area:area};
exports.area = area;
```

```js
// index.js
var utils = require('./utils.js');
console.log(utils.area(2));
```

这里其实还有一个问题就是从模块导入的值是可变的吗，我们来看一个例子：

```js
// utils.js
var a = 0;
function change() {
  setTimeout(function () {
    a = 1;
    console.log('in utils, a is change to ', a);
  }, 300);
}
change();
module.exports = a;
```

```js
// index.js
var a = require('./utils');
console.log(a);
setTimeout(function () {
  console.log(a);
}, 500);
```

执行结果为：

```bash
0
in utils, a is change to  1
0
```

可见，虽然 `a` 在 `utils` 中发生了变化，但是此时在 `index` 中打印 `a` 还是为一开始的值，这其实也验证了 `CommonJS` 的一个特点，那就是模块输出的是一个 **值的拷贝**

这里要注意，这个 **值的拷贝是浅拷贝**，我们来看这个例子：

```js
// utils.js
var testObj = { count: 0 };
function change() {
  setTimeout(function () {
    testObj.count = 1;
    console.log('in utils, testObj.count is change to ', testObj.count);
  }, 300);
}
change();
module.exports = testObj;
```

```js
// index.js
var obj = require('./utils');
console.log(obj.count);
setTimeout(function () {
  console.log(obj.count);
}, 500);
```

执行结果为：

```bash
0
in utils, testObj.count is change to  1
1
```

此时你也许会想，`CommonJS` 在 `NodeJS` 中已经这么成熟了，那是不是也可以在浏览器端使用，答案其实是不行，因为 `CommonJS` 的导入是同步的，因为 `NodeJS` 主要是在服务端运行，JS 文件都是存储在磁盘上直接读取的，而在浏览器端，我们需要利用网络来加载，显然我们只能使用异步的方式，不可能使用同步的方式来导入模块

## AMD

`AMD` 全称 `Asynchronous Module Definition`，是一种异步模块规范，它的出现解决了浏览器端的模块加载问题

[requirejs](https://requirejs.org/) 就是此规范的实现，它用 `define` 来定义模块，用 `require` 来引用模块

我们先来定义一个 `utils` 模块：

```js
// utils.js
define(function () {
  var basicNum = 0;
  var add = function (x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum: basicNum,
  };
});
```

再来定义一个 `other` 模块：

```js
// other.js
define(function () {
  var obj = {
    count: 0,
  };
  setTimeout(function () {
    obj.count = 1;
  }, 300);
  return obj;
});
```

然后我们定义一个 `main` 模块，并且此模块依赖上面两个模块：

```js
define(['utils', 'other'], function (utils, other) {
  var res = utils.add(3, 2);
  console.log(res);
  console.log(other.count);
  setTimeout(function () {
    console.log(other.count);
  }, 500);
});
```

要使用这些模块，首先要在 `index.html` 中引入，然后在使用 `require` 语法来引入我们的 `main` 模块即可：

```html
<script src="require.js"></script>
<script>
  require(['main']);
</script>
```

或者利用 `data-main` 属性来设置：

```html
<script data-main="main" src="require.js"></script>
```

在浏览器中打开，控制台会得到以下结果：

```bash
5
0
1
```

`define` 除了上面的模块定义方式，还支持使用 `CommonJS` 的模块语法，这样就很方便移植 `CommonJS` 模块代码到 `AMD`：

```js
// common.js
define(function (require, exports, module) {
  var other = require('other');
  var utils = require('utils');
  exports.commonTest = function () {
    console.log('from common: ', other.count);
    console.log('from common: ', utils.add(4, 6));
  };
});
```

这里大家可能会产生疑问，`define` 的第一个数组参数可以定义依赖项，这样 `requirejs` 就可以很明确的知道要加载哪些模块，可是上面这种并没有显示的定义依赖项，`requirejs` 是如何知道需要依赖哪些模块，很简单，通过 `Function.prototype.toString` 方法即可获取到函数体，然后通过正则匹配等方法，即可拿到 `require` 的模块名

## CMD

`CMD` 规范其实跟 `AMD` 很类似，主要区别就是：**AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行**

依赖前置主要是指在定义模块时，把该模块会用到的所有依赖全部放到 `define` 的第一个参数中

依赖就近主要是指需要此模块时再引入，不需要显式声明，但这里需要注意虽然是需要时才引入，但模块被加载时，此模块所有用到的依赖还是会全部加载

至于提前执行和延迟执行我们来看下面的例子

首先在 `AMD` 中我们把 `common` 模块改成这样：

```js
// common.js
define(['other', 'utils'], function (other, utils) {
  console.log('from common: ', other.count);
  if (other.count > 999) {
    console.log(utils.add(other.count * 2));
  }
});
```

可见只有 `other.count > 999` 是我们才去调用 `utils` 模块中的方法，为了调试我们改下 `utils` ：

```js
// utils.js
define(function () {
  var basicNum = 0;
  console.log('basicNum in utils is: ', basicNum);
  var add = function (x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum: basicNum,
  };
});
```

然后加载 `common` 模块：

```html
<script data-main="common" src="require.js"></script>
```

打开浏览器 `network` 面板观察网络请求，我们会发现虽然 `other.count < 999` 但是 `utils` 模块还是运行了，控制台输出：

```js
basicNum in utils is:  0
from common:  0
```

同样的例子，我们来用 [seajs](https://github.com/seajs/seajs) 来试一下，`seajs` 是 `CMD` 规范的实现

`utils` 模块与 `AMD` 一致，我们来改下 `common` 模块：

```js
// common.js
define(function (require, exports, module) {
  var other = require('other');
  console.log('from common: ', other.count);
  if (other.count > 999) {
    var utils = require('utils');
    console.log(utils.add(other.count * 2));
  }
});
```

然后引入 `sea.js` 并加载 `common` 模块：

```html
<script src="sea.js"></script>
<script>
  seajs.use('common');
</script>
```

打开浏览器 `network` 面板观察网络请求，我们会发现 `utils` 模块同样会被加载，但是没有运行，控制台输出：

```js
from common:  0
```

以上就证明了 **AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行**

## UMD

[UMD](https://github.com/umdjs/umd) (Universal Module Definition) 通用模块规范

由于当前在浏览器端和服务器端各有一套模块规范，为了能够更方便的使用他们，`UMD` 试图提供一种更通用的模块定义方式，让我们可以跨平台使用

下面我们来看下规范是如何实现的，详细代码在这：[https://github.com/umdjs/umd/blob/master/templates/returnExports.js](https://github.com/umdjs/umd/blob/master/templates/returnExports.js)

```js
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
});
```

通过上面的代码我们可以很明显的看出 `UMD` 主要就是先判断当前环境是否支持 `AMD` , 然后是否支持 `CommonJS`，如果都不支持，就将模块绑定到全局作用域中

## ES Module

到目前为止，浏览器端的模块规范都是社区提供的，直到 `ES2015` 也就是大家熟知的 `ES6` 规范出现，官方正式提供了对 `Module` 的支持

`ES module` 语法非常简单，`import` 用来导入模块，`export` 用来导出模块，我们来测试一下：

由于 `chrome` 从 60 版本开始就提供了对 `ES Module` 的支持，这里我们不使用 `Webpack` 等工具，直接在浏览器端测试：

```js
// test.js
export let a = 1;

setTimeout(() => {
  a = 10;
}, 200);

export function b() {
  console.log('b');
}

export default function c() {
  console.log('c');
}
```

```js
// main.js
import c, { a, b } from './test.js';

console.log(a);
b();
c();

setTimeout(() => {
  console.log(a);
}, 500);
```

我们在 `script` 标签中引入，注意这里的 `type` 属性，必须设置成 `module`：

```html
<script type="module" src="main.js"></script>
```

控制台输出：

```bash
1
b
c
10
```

这里大家可能会注意到，从 `test` 模块导入的变量 `a` 即使不是对象，但是当原始模块中的 `a` 发生变化时，导入进来的 `a` 也发生了变化，这是因为 `ES Module` 与 `CommonJS` 不同：

1. `CommonJS` 模块输出的是一个值的拷贝，`ES Module` 模块输出的是值的引用

   `CommonJS` 输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值，根据之前的 `CommonJS` 介绍，这里实际是指原始值

   `ES Module` 的运行机制与 `CommonJS` 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 `import`，就会生成一个**只读引用**。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，`ES Module` 的 `import` 有点像 Unix 系统的“符号连接”，原始值变了，`import` 加载的值也会跟着变。因此，`ES Module` 是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块

2. `CommonJS` 模块是运行时加载，`ES Module` 模块是编译时输出接口

   - 运行时加载

     `CommonJS` 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”

   - 编译时加载

     `ES Module` 模块不是对象，而是通过 `export` 命令显式指定输出的代码，`import` 时采用静态命令的形式。即在 `import` 时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。模块内部引用的变化，会反应在外部

## 循环依赖

介绍完了目前所有的模块规范，我们来看一下循环依赖，循环依赖在项目中其实是很常见的，a 模块依赖 b 模块，b 模块同时又依赖 a 模块，这就产生了循环依赖，但是不同的模块规范在处理循环依赖时是不同的，这里我们就主要看 `CommonJS` 和 `ES Module` 是如何处理循环依赖的

### CommonJS 模块循环依赖

```js
// a.js
exports.done = false;
var b = require('./b');
console.log('in a module, b.done is ', b.done);
exports.done = true;
console.log('a module is load done');
```

```js
//b.js
exports.done = false;
var a = require('./a');
console.log('in b module, a.done is ', a.done);
exports.done = true;
console.log('b module is load done');
```

```js
// main.js
var a = require('./a');
var b = require('./b');
console.log('in main module, a is load ', a.done);
console.log('in main module, b is load ', b.done);
```

执行 `mian.js` , 我们会得到以下输出结果：

```bash
in b module, a.done is false
b module is load done
in a module, b.done is true
a module is load done
in main module, a is load true
in main module, b is load true
```

下面我们来一步步分析：

1. 程序运行，读取到 `main.js` 第一行，开始加载 `a` 模块
2. 进入 `a` 模块，执行第一行，导出 `done=false`
3. 执行到第二行，开始加载 `b` 模块
4. 进入 `b` 模块，执行第一行，导出 `dome=false`
5. 执行到第二行，开始加载 `a` 模块，但是因为此时 `a` 模块已被加载，所以会直接返回 `a` 模块当前已加载的内容，也就是 `a.done = false`
6. 执行到第三行，输出 `in b module, a.done is false`
7. 执行到第四行，导出 `done=true`
8. 执行到最后一行，模块彻底加载完毕，输出 `b module is load done`
9. 由于 `b` 模块加载结束，所以此时返回到 `a` 模块，也就是第二行执行结束
10. z 执行到第三行，输出 `in a module, b.done is true`
11. 接下来后面都是顺序输出，没有什么可说的了

### ES Module 模块循环依赖

```js
// a.js
import { bar } from './b.js';
export function foo() {
  bar();
  console.log('a is done');
}
```

```js
// b.js
import { foo } from './a.js';
export function bar() {
  if (Math.random() > 0.5) {
    foo();
  }
}
```

直接加载 `a` 并运行：

```html
<script type="module" src="a.js"></script>
```

控制台输入:

```bash
a is done
```

上面这段代码在 `CommonJS` 中是无法执行的，因为在 `b` 模块加载 `a` 模块得到的是 `foo = null` , 最后调用 `foo` 方法显然会报错，但是在 `ES Module` 中是可以的，这就是因为 `ES Module` 本身导出的是值的引用，所以在实际代码执行时获取到的 `foo` 是完整的内容

## 参考链接

- [History of Web Development: JavaScript Modules](https://lihautan.com/javascript-modules/)
- [UMD](https://github.com/umdjs/umd)
- [requirejs](https://requirejs.org/)
- [seajs](https://github.com/seajs/seajs)
- [前端模块化——彻底搞懂 AMD、CMD、ESM 和 CommonJS](https://www.cnblogs.com/chenwenhao/p/12153332.html)
- [JS 模块化——CommonJS AMD CMD UMD ES6 Module 比较](https://juejin.im/post/6844903961128861704)
- [JavaScript 模块的循环加载](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)
