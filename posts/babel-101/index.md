---
title: 从零开始配置Babel
date: '2020-03-15'
desc: babel 对我来说其实一直都是黑盒，我只知道用它可以转换 js 代码以兼容低版本的浏览器，但是具体是怎么配置的，从未深入了解过，这次我就记录一下 babel 的配置过程
---

babel 对我来说其实一直都是黑盒，我只知道用它可以转换 js 代码以兼容低版本的浏览器，但是具体是怎么配置的，从未深入了解过，这次我就记录一下 babel 的配置过程

**PS：** 由于 babel 7.4 版本较之前变化很大，这里我们就以最新版为准

## 基础配置

这里我们新建一个项目，从零开始配置 babel

```bash
mkdir babel-test
cd babel-test
npm init -y
npm install --save-dev @babel/core @babel/cli
```

其中`@babel/core`是 babel 的核心包，这里必装，`@babel/cli`是 babel 提供的命令行工具，可以在终端中直接使用或配合`npm scripts`使用，用来生成转换之后的 js 文件

下面我们新建`src`目录，并添加`index.js`文件用来测试代码转换的效果：

```bash
mkdir src
cd src
touch index.js
```

在`index.js`中写入以下代码：

```js
const message = 'hello world';

const say = message => {
  console.log(message);
};

say(message);
```

这里我们直接运行是可以的，但是如果在低版本浏览器，比如`IE11`中，那么就会报错，因为`const`和`arrow function`是`ES2015`/`ES6`标准，`IE11`并不支持，所以我们需要用 babel 来进行转换

这里我们用`npm script`配置转换脚本，打开`package.json`，修改如下：

```json
...
"scripts": {
  "build": "babel src --out-dir lib"
},
...
```

其中`out-dir`用来指定转换之后的文件输出位置，这里我们将转换后的文件都放在`lib`目录下

除了上面的转换指令，我们还需要一个配置文件，在项目根目录新建`.babelrc`，修改如下：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": 11
        }
      }
    ]
  ],
  "plugins": []
}
```

这里我们使用了`@babel/preset-env`，它是 babel 官方提供的一个智能预设包，其中包含了很多常用的插件并提供了一些配置项，这里我们使用`targets`将代码最终要运行的浏览器指定为了`IE11`，那么转换后的代码就可以在`IE11`上运行。

**PS:** @babel/preset-env 这个包的更多配置项可以参考官方文档：[https://babeljs.io/docs/en/babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)

这里预设包需要手动安装

```bash
npm install --save-dev @babel/preset-env
```

然后我们执行转换脚本

```bash
npm run build
```

转换成功后，我们会在 lib 目录下看到 index.js 文件，其中代码如下：

```js
'use strict';

var message = 'hello world';

var say = function say(message) {
  console.log(message);
};

say(message);
```

可见`const`和`arrow function`语法都转换成了**ES5**语法，可以在**IE11**中运行

### 注意

如果我们将 targets 改为 chrome，并将版本指定为 80，转换后的代码还是跟原来一样的，因为 chrome 80 是支持**ES6**语法的

```json
"targets": {
 "chrome": 80
}
```

targets 是可以同时指定多个浏览器的，但是最终转换的代码还是以最低版本为准，比如配置如下：

```json
"targets": {
 "ie": 11,
 "chrome": 80
}
```

代码会转换为**ES5**语法

## Polyfill

在介绍 polyfill 之前，我们将 index.js 中的代码修改成这样:

```js
const message = 'hello world';

const say = message => {
  console.log(message);
};

function delay(time = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(new Date().getSeconds());
      resolve();
    }, time);
  });
}

console.log(new Date().getSeconds());
delay(3000).then(() => {
  say(message);
});
```

这里我们用**ES6**标准中才存在的`Promise`语法写了一个`delay`函数，`hello world`将在 3s 后输出

我们执行`npm run build`后，转换后的代码为：

```js
'use strict';

var message = 'hello world';

var say = function say(message) {
  console.log(message);
};

function delay() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(new Date().getSeconds());
      resolve();
    }, time);
  });
}

console.log(new Date().getSeconds());
delay(3000).then(function () {
  say(message);
});
```

这里我们可以看到`const`和`arrow function`语法都正常转换为了**ES5**标准，但是`Promise`还是和之前一样，如果在 IE11 中运行会提示`Promise is not defined`

这是因为 babel 是可以直接转换基础语法的也就是`syntax`, 但是`ES6+`标准下的新特性也就是`features`，babel 是不能直接转换的，需要借助`polyfill`来实现，polyfill 翻译成中文就是**垫片**的意思，用来垫平不同浏览器环境之前差异

### syntax

syntax 是指一些基础语法，babel 是可以直接转换的，比如：

- let
- const
- arrow function
- class
- template string
- destruct
- 等等

### features

features 是指`ES6+` 标准推出的一些新特性，babel 不能直接转换，比如：

- Promise
- Set
- Map
- Array.prototype.includes
- Object.assign
- 等等

### @babel/babel-polyfill

`@babel/babel-polyfill`这个包就可以实现上面的 features，从而完整的模拟`ES2015+`环境。但是在 babel 7.4 版本中已经明确表示不推荐使用了，官方建议我们使用`core-js`来替代，其实 babel-polyfill 内部就是用`core-js`和`regenerator-runtime/runtime`来实现的。

之前我们应该是直接在入口文件顶部这样使用

```js
import '@babel/polyfill';
```

现在可以直接改成这样

```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

### core-js 和 regenerator-runtime

`core-js`是 JavaScript 的模块化标准库，它包含了 ECMAScript 所有标准的 polyfill 实现

`regenerator-runtime`主要是为了生成器函数提供运行时

### .babelrc 配置

下面我们就来实现 features 的转换，首先我们需要安装以下包

```bash
npm install --save core-js regenerator-runtime
```

修改.babelrc 如下

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": {
          "version": 3
        },
        "targets": {
          "ie": 11
        }
      }
    ]
  ],
  "plugins": []
}
```

其中`useBuildIns`是用来决定如何使用 polyfill：

- false 默认，不做任何 polyfill 处理
- entry 需要我们在入口文件手动引入 polyfill 包，babel 会自动剔除掉 targets 中已经原生支持的 polyfill，剩余的无论有没有用到，会全部引入进来
- usage 不需要我们手动引入 polyfill 包，但还是要安装，babel 会按需加载需要的 polyfill，但是对第三方依赖包无效，常用来在开发第三方库时使用

这里我们先使用`entry`，除此之外我们还指定了 corejs 的版本，然后我们在文件顶部手动引入 polyfill 也就是 core-js：

```js
import "core-js/stable";
import "regenerator-runtime/runtime";

const message = "hello world";
...
```

然后执行`npm run build`，会发现转换后的代码里面引入了所有 polyfill，包括我们需要的`Promise`：

```js
...
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.object.values");
require("core-js/modules/es.promise");
...
```

这样，我们的代码就可以在低版本浏览器中使用了。

## @babel/runtime 和 @babel/plugin-transform-runtime

这两个包是一起使用的，主要是为了解决转换之后代码重复使用而造成的包体积较大的问题，因为 babel 在转换代码时会使用一些 helpers 辅助函数，比如下面的代码：

```js
async function delay() {
  console.log(new Date().getSeconds());
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  console.log(new Date().getSeconds());
}

delay();
```

转换之后，我们会发现生成的代码除了一些 polyfill 和实际的代码之外，还有一些 helpers 代码：

```js
...
function asyncGeneratorStep(gen, resolve, r...
function _asyncToGenerator(fn) { retu...
...
```

如果有很多文件需要转换，那这些代码可能就会重复，为了解决这个问题，我们可以使用`plugin-transform-runtime`将这些 helpers 辅助函数的使用方式改为引用的方式，让它们都去引用`runtime`包里的代码，这样他们就是重复引用同一个代码，就不会出现重复的问题了。其中`babel-runtime`这个包里面就包含了所有的 helpers 辅助函数。

我们需要手动安装：

```bash
npm install --save @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime
```

`.babelrc`修改如下：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": {
          "version": 3
        },
        "targets": {
          "ie": 11
        }
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

这样转换之后，那些 helpers 代码就变成了 require 引入的方式：

```js
...
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
...
```

## Polyfill 按需加载

上面我们提到了我们可以使用`useBuiltIns`的`usage`选项来按需加载 polyfill，这种主要是在我们开发第三方库时使用，这里修改 index.js 中的代码如下：

```js
new Promise(resolve => {
  resolve();
});
const arr = [1, 2, 3];
console.log(arr.includes(3));
```

其中`.babelrc`改成如下配置：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3
        },
        "targets": {
          "ie": 11
        }
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

转换之后生成的文件就是这样：

```js
'use strict';

require('core-js/modules/es.array.includes');

require('core-js/modules/es.object.to-string');

require('core-js/modules/es.promise');

new Promise(function (resolve) {
  resolve();
});
var arr = [1, 2, 3];
console.log(arr.includes(3));
```

这里我们可以看到，我们只引用了部分 polyfill，但是这里又一个问题，那就是 polyfill 是注入到全局作用域中的，使用我们库的开发者不一定愿意污染全局作用域，所以说，合理的解决方案应该是注入到当前作用域中，不影响全局作用域，我们修改配置如下：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3
        },
        "targets": {
          "ie": 11
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": 3
        }
      }
    ]
  ]
}
```

转换之后，代码如下：

```js
'use strict';

var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault');

var _includes = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/instance/includes'));

var _promise = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/promise'));

new _promise.default(function (resolve) {
  resolve();
});
var arr = [1, 2, 3];
console.log((0, _includes.default)(arr).call(arr, 3));
```

这样我们就完美解决了作用域污染的问题

**PS:** `@babel/plugin-transform-runtime`这个包是不能读取`@babel/preset-env`包的`targets`选项的配置的，如果我们配置了这个包的`corejs`选项，**它会把我们代码中所有用到的 Features 都转化为对 corejs 提供的 polyfill 的引用**，比如我们把上面代码中的 targets 改为 chrome 80，转换之后的代码还是会包含 promise 这个 polyfill，关于这个问题我发了 issues: [https://github.com/babel/website/issues/2209](https://github.com/babel/website/issues/2209)，官方建议是：这个包的 corejs 选项主要是为了开发第三方库时使用，因为开发者无法控制库的浏览器运行环境。

## Proposals

在实际开发中，除了使用 ECMAScript 标准中已存在的语法，我们还可以使用一些在提案中，但是还没有正式发布的语法，比如`String.prototype.replaceAll`

index.js 代码如下：

```js
const queryString = 'q=query+string+parameters';
const withSpaces = queryString.replaceAll('+', ' ');
console.log(withSpaces);
```

转换之后的代码：

```js
'use strict';

var queryString = 'q=query+string+parameters';
var withSpaces = queryString.replaceAll('+', ' ');
console.log(withSpaces);
```

这里我们发现语法并没有转换，这里我们就需要配置`proposals`以转换这些还在提案中的语法：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "targets": {
          "ie": 11
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": 3,
          "proposals": true
        }
      }
    ]
  ]
}
```

转换之后：

```js
'use strict';

var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault');

var _replaceAll = _interopRequireDefault(require('@babel/runtime-corejs3/core-js/instance/replace-all'));

var queryString = 'q=query+string+parameters';
var withSpaces = (0, _replaceAll.default)(queryString).call(queryString, '+', ' ');
console.log(withSpaces);
```

这样我们就可以愉快的进行开发了

## 参考链接

- [https://babeljs.io/docs/en/v7-migration](https://babeljs.io/docs/en/v7-migration)
- [https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md)
- [https://jsweibo.github.io/categories/Nodejs/babel/](https://jsweibo.github.io/categories/Nodejs/babel/)
