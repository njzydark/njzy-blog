---
title: React中的状态派生
date: '2020-05-16'
desc: 详解如何正确在React中进行状态派生
---

在详解如何在 React 中进行状态派生之前，建议大家先看一下官方的这篇博客：[You Probably Don't Need Derived State](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

## 何为状态派生

状态派生主要发生在类组件中，因为组件状态的初始值来自 props，当 props 更新时我们就需要正确处理 props 的变更，不然页面状态可能就不会发生变化或者产生一些我们意想不到的效果

下面我们就从这段代码开始，详解如何正确处理 React 中的状态派生：

**PS:** 这是一个刻意写的状态派生例子，WordsList 组件其实根本不需要从 props 中进行 state 初始化

```jsx
import React, { Component, createRef, Component } from 'react';

const inputEl = createRef();

export default class App extends Component {
  state = {
    wordsList: [],
  };

  handleWordAdd = () => {
    const value = inputEl.current.value;
    if (value) {
      this.state.wordsList.push(value);
      this.setState({
        wordsList: this.state.wordsList,
      });
    }
  };

  render() {
    const { wordsList } = this.state;
    return (
      <div>
        <h3>React App</h3>
        <input type="text" ref={inputEl} />
        <button onClick={this.handleWordAdd}>Add</button>
        <WordsList wordsList={wordsList} />
      </div>
    );
  }
}

class WordsList extends Component {
  state = {
    wordsList: this.props.wordsList || [],
  };

  render() {
    const { wordsList } = this.state;
    return (
      <>
        <h3>Words Count: {wordsList.length}</h3>
        <ul>
          {wordsList.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </>
    );
  }
}
```

代码很简单，主要流程就是当我们点击 add 按钮，就会把 input 输入框中的内容添加到 wordsList 中，然后更新 WordsList 组件，并将 wordsList 数组中所有内容显示出来

代码运行之后，效果符合预期，但是其实是有几个问题的，我们可以把 WordsList 组件继承自 PureComponent 试一下：

```jsx
class WordsList extends PureComponent {
  state = {
    wordsList: this.props.wordsList || [],
  };

  render() {
    const { wordsList } = this.state;
    return (
      <>
        <h3>Words Count: {wordsList.length}</h3>
        <ul>
          {wordsList.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </>
    );
  }
}
```

再次运行代码，发现没有任何效果。其实这里主要原因是 PureComponent 在 props 更新时做了一次浅比较来确认是否要重新 render，我们可以看一下父组件是如何更新 wordsList 的：

```jsx
handleWordAdd = () => {
  const value = inputEl.current.value;
  if (value) {
    this.state.wordsList.push(value);
    this.setState({
      wordsList: this.state.wordsList,
    });
  }
};
```

这里用了 push 方法，然后把 push 之后的数组重新赋值给了 state 中的 wordsList，这里就是问题所在，**因为 wordsList 是引用类型的值，它存储的只是数组的引用地址，在 setState 时其实并没有改变引用地址，所以当 WordsList 组件进行 prpos 的浅比较时发现 props 没有变化，所以没有进行 render，页面也就没有任何效果**

那么如何改变引用地址，很简单，我们可以使用 concat 返回一个新数组或者使用扩展运算符，这里我们试一下扩展运算符：

```jsx
handleWordAdd = () => {
  const value = inputEl.current.value;
  if (value) {
    this.setState({
      wordsList: [...this.state.wordsList, value],
    });
  }
};
```

再次运行，发现还是没有任何效果，其实这里 props 已经发生变化了，只是由于组件的状态是派生自 props，所以我们这里需要正确处理 props 的变更

## 正确处理状态派生

还是以上面的代码为例，由于 props 发生变化，我们需要正确处理 props 的变更，常见的做法是利用 componentWillReceiveProps 这个声明周期方法，这里我们只需要在 props 发生变化时重置一下 state 即可

### componentWillReceiveProps

```jsx
class WordsList extends PureComponent {
  state = {
    wordsList: this.props.wordsList || [],
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      wordsList: nextProps.wordsList,
    });
  }

  render() {
    const { wordsList } = this.state;
    return (
      <>
        <h3>Words Count: {wordsList.length}</h3>
        <ul>
          {wordsList.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </>
    );
  }
}
```

再次运行，效果符合预期，但是这里存在一个 bug，如果父组件重新 render，即使 props 没有发生变化，state 也会被重置，这里我们改下一下代码：

```jsx
import React, { Component, createRef, PureComponent } from 'react';

const inputEl = createRef();

export default class App extends Component {
  state = {
    wordsList: [],
  };

  handleWordAdd = () => {
    const value = inputEl.current.value;
    if (value) {
      this.setState({
        wordsList: [...this.state.wordsList, value],
      });
    }
  };

  handleRender = () => {
    this.setState({});
  };

  render() {
    const { wordsList } = this.state;
    return (
      <div>
        <h3>React App</h3>
        <button onClick={this.handleRender}>render</button>
        <hr />
        <input type="text" ref={inputEl} />
        <button onClick={this.handleWordAdd}>Add</button>
        <WordsList wordsList={wordsList} />
      </div>
    );
  }
}

const wordsListInputEl = createRef();

class WordsList extends PureComponent {
  state = {
    wordsList: this.props.wordsList || [],
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      wordsList: nextProps.wordsList,
    });
  }

  handleAdd = () => {
    const value = wordsListInputEl.current.value;
    if (value) {
      this.setState({
        wordsList: [...this.state.wordsList, value],
      });
    }
  };

  render() {
    const { wordsList } = this.state;
    return (
      <>
        <h3>Words Count: {wordsList.length}</h3>
        <ul>
          {wordsList.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
        <input type="text" ref={wordsListInputEl} />
        <button onClick={this.handleAdd}>add</button>
      </>
    );
  }
}
```

跟之前不同的是，我们在父组件加了一个 render 按钮，用来重新渲染父组件，同时在 WordsList 组件中加了一个 add 按钮，逻辑同父组件，当我们点击 wordsList 组件中的按钮添加一个 word 时，在点击父组件的 render，会发现状态被重置了，这里其实不应该重置的，因为 props 中的 wordsList 其实并没有发生变化，这也是我们进行状态派生时经常忽略的一个点，就是我们要判断一下 props 是否真的发生了更改：

```jsx
componentWillReceiveProps(nextProps) {
  if (nextProps.wordsList !== this.props.wordsList) {
    this.setState({
      wordsList: nextProps.wordsList,
    });
  }
}
```

这样就一切正常了，但是 componentWillReceiveProps 这个方法已经被 React 标记为不安全的声明周期方法，我们可以使用静态方法 getDerivedStateFromProps 来替代

### getDerivedStateFromProps

此方法与 componentWillReceiveProps 有一个很重要的不同点是它在组件 Mounting 阶段时也会触发，而 componentWillReceiveProps 只会在组件 Updating 时触发

与 componentWillReceiveProps 处理逻辑类似，我们要判断一下 props 是否真的发生了更改，由于 getDerivedStateFromProps 比较特殊，我们不能获取到上一次的 props，所以这里我们需要手动存储一下：

```jsx
  static getDerivedStateFromProps(props, state) {
    if (props.wordsList !== state.prePropsWordsList) {
      return {
        prePropsWordsList: props.wordsList,
        wordsList: props.wordsList,
      };
    } else {
      return null;
    }
  }
```

## 总结

至此，关于 React 的状态派生基本就讲完了，总的来说如果无法避免使用状态派生，我们就需要非常小心的使用 componentWillReceiveProps 或者 getDerivedStateFromProps，由于前者在新版本中可能会被废弃，所以这里推荐后者
