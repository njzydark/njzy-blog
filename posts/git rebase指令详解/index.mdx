---
title: Git Rebase指令详解
date: '2019-11-16'
desc: 这里主要介绍一下如何利用git rebase指令进行commit的修改和分支合并
---

最近发现 git log 中有很多无用信息，分支也比较繁琐。所以在想有没有什么指令可以让 commit 记录看起来清晰明了，经过学习发现 git rebase 可以解决此问题。

在深入了解 git rebase 之前，先回顾一下常用的一些指令。

## 常用指令

仓库初始化

```bash
git init
```

克隆远程仓库

```bash
git clone
```

添加上游仓库

```bash
git remote add
```

分支的创建、删除、切换和合并

```bash
git branch
git branch -d
git checkout
git merge
```

修改文件添加到本地仓库

```bash
git add
git commit
```

拉取远程更新

```bash
git fetch
```

本地仓库的更新和上传

```bash
git pull
git push
```

分支提交历史和状态

```bash
git log
git status
```

分支回滚

```bash
git revert
git reset
```

## git rebase 详解

git rebase 主要可以解决以下问题：

1. 合并分支
2. 合并多次 commit 记录

### 合并分支

假设我们目前有`master`和`dev`两个分支，其中 master 和 dev 分支上各有一次提交，状态如下：

![1](./1.png)

此时如果需要将 dev 上的分支内容合并到 master，我们一般会进行如下操作：

```bash
git merge dev
```

合并之后状态如下：

![2](./2.png)

此时执行`git log`，日志如下：

```bash
700c335 (HEAD -> master) Merge branch 'dev'
3c439fa add t2
ec8e71c (dev) add t1
00dbbcd change message
e61090f add index.js
```

我们会看到虽然成功合并了，但产生了一次新的 commit 提交，这个 commit 是自动生成的，那么有没有办法避免掉这次新提交，这是有`git rebase`就派上用场了。

执行以下操作：

```bash
git rebase master dev
```

此时状态如下：

![3](./3.png)

执行 git log，日志如下：

```bash
b11f2fb (HEAD -> dev) add t1
64e3df4 (master) add t2
00dbbcd change message
e61090f add index.js
```

可见 commit 记录非常清晰。

### 合并多次 commit 记录

有时候我们开发一个功能可能需要多次 commit，当合并到 master 分支后，这些 commit 记录也会全部存在，那么有没有办法整理这些 commit，使其变成一次 commit，这样也方便以后的代码 review。

首先在没使用 git rebase 之前，假设 dev 上有三次提交，状态如下：

![4](./4.png)

接下来我们尝试合并这些 commit：

```bash
git rebase -i HEAD~3
```

状态如下：

![5](./5.png)

可见 git rebase 的 commit 合并功能十分好用。

### 参考链接

- [Rebase 代替合并](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/rebase#start)
- [彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)
