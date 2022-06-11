---
title: 防止在组件unmount时继续使用setState
date: '2020-01-16'
desc: 在ReactJS中我们要防止在组件unmount时继续使用setState
---

今天在写一个组件时发现控制台出现了一个警告：

```bash
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
```

大致意思就是不要在未挂载的组件上修改`state`，否则可能会发生内存泄漏。如果要修复就需要在`componentWillUnmout`中进行做移除处理

## 定时器案例

那么具体是什么意思，我们来看一下代码：

[![Edit 定时器案例](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dingshiqianli-650us?autoresize=1&fontsize=14&hidenavigation=1&theme=dark)

这里我们在**App 组件**中控制`visible`，来实现对**Test 组件**的挂载和卸载

```jsx{11,19}
// App组件
import React, { PureComponent } from "react";
import Test from "./Test";

export default class App extends PureComponent {
  state = {
    visible: false
  };

  handleToggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <button onClick={this.handleToggle}>toggle</button>
        {visible && <Test />}
      </div>
    );
  }
}
```

我们再来看一下 Test 组件代码：

```jsx{10-12}
// Test组件
import React, { PureComponent } from "react";

export default class Test extends PureComponent {
  state = {
    message: "hello"
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ message: "world" });
    }, 2000);
  }

  render() {
    const { message } = this.state;
    return <div>{message}</div>;
  }
}
```

当 Test 组件挂载时会执行一个定时器用来修改`message`变量，当实际运行时，效果跟预期的一样，点击 toggle，显示`hello`，3s 后显示`world`；如果出现 hello 时再次点击 toggle，hello 消失，此时控制台就回报上面那个错误。

所以这里我们就明白了，当 Test 组件挂载时绑定了一个定时器，如果 3s 内，Test 组件卸载，定时器没有移除所以还会继续运行，3s 后触发定时器回调执行了`setState`方法试图修改已经不存在的组件上的 state，所以就会报错。

解决办法很简单，我们只要在 Test 组件卸载时移除定时器即可，代码如下：

```jsx{14-17}
// Test组件
import React, { PureComponent } from "react";

export default class Test extends PureComponent {
  state = {
    message: "hello"
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ message: "world" });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { message } = this.state;
    return <div>{message}</div>;
  }
}
```

这里你们可能会说，移除定时器不是正常操作吗，是你太菜了。。。

## 异步请求案例

其实上面只是触发警告的一个情况，还有一种情况就比较特殊，那就是发起异步请求，因为我们很难像定时器那样执行移除操作。

这里我们就来看一下异步请求时进行路由跳转的例子

[![Edit 异步请求案例](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yibuqingqiuanli-mzo05?fontsize=14&hidenavigation=1&theme=dark)

代码如下：

```jsx
// App组件
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';

export default function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <div>About</div>
        </Route>
      </Switch>
    </Router>
  );
}
```

在**App 组件**中我们定义了两个路由地址，根据不同的路由跳转到不同的组件，其中**Home 组件**代码如下：

```jsx{10-16}
// Home组件
import React, { PureComponent } from "react";

export default class Home extends PureComponent {
  state = {
    data: []
  };

  componentDidMount() {
    // 模拟AJAX请求
    new Promise(resolve => {
      setTimeout(() => {
        this.setState({ data: [1, 2, 3] });
        resolve();
      }, 2000);
    });
  }

  render() {
    const { data } = this.state;
    return (
      <ul>
        {data.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
}
```

这里我们用**Promise 和定时器**来模拟异步请求，运行时我们会发现 2s 后，home 路由出现`123`，当我们切换到 about 路由时一切正常；但是当我们在 2s 内直接切换到 about 路由，控制台就会出现之前说的警告信息

因为没有直接的异步请求取消方法，所以我们这里需要手动记录一下组件挂载状态，只有当组件处于挂载状态时才执行`setState`方法，代码如下：

```jsx{8,11,15,22}
// Home组件
import React, { PureComponent } from "react";

export default class Home extends PureComponent {
  state = {
    data: []
  };
  isMount = false;

  componentDidMount() {
    this.isMount = true;
    // 模拟AJAX请求
    new Promise(resolve => {
      setTimeout(() => {
        this.isMount && this.setState({ data: [1, 2, 3] });
        resolve();
      }, 2000);
    });
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  render() {
    const { data } = this.state;
    return (
      <ul>
        {data.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
}
```

至此问题解决

## 参考链接

[Prevent React setState on unmounted Component](https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component)
