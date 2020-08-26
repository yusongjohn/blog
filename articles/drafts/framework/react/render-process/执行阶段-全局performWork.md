<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [performWork](#performwork)
  - [参数含义](#%E5%8F%82%E6%95%B0%E5%90%AB%E4%B9%89)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B)
  - [关键代码](#%E5%85%B3%E9%94%AE%E4%BB%A3%E7%A0%81)
- [performWorkOnRoot](#performworkonroot)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B-1)
  - [代码](#%E4%BB%A3%E7%A0%81)
- [render阶段：renderRoot](#render%E9%98%B6%E6%AE%B5renderroot)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B-2)
  - [代码](#%E4%BB%A3%E7%A0%81-1)
  - [workLoop](#workloop)
- [提交阶段：completeRoot](#%E6%8F%90%E4%BA%A4%E9%98%B6%E6%AE%B5completeroot)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# performWork
本案例是同步模式
```javascript
function performSyncWork() {
  performWork(Sync, false);
}
```


## 参数含义
1. minExpirationTime
2. isYieldy 标识是并发模式还是同步模式

## 主要流程
1. 找最高优先级的任务：findHighestPriorityRoot
```javascript
nextFlushedRoot = highestPriorityRoot;
nextFlushedExpirationTime = highestPriorityWork;
```
            
>react应用中，可能会存在多个root节点，在前面说到 scheduleWork-> scheduleWorkToRoot 中会将root添加到schedule链表中，findHighestPriorityRoot就是从该链表中去查找最高优先级的任务（遍历该链表，对比expirationTime来得到最高优先级任务的过期时间和节点）；
大多数情况下一个react应用只有一个根节点，因此通常就是我们应用入口处的ReactDom.render时的那个root节点，过期时间是在准备阶段生成的expirationTime

2. 根据isYieldy判断同步模式还是并发模式？
- 并发模式(或者叫 异步任务）【TODO】并发模式
- 同步模式(或者叫 同步任务）：遍历执行的过程：从schedule链表中筛选出最高优先级的任务(渲染root节点)去执行performWorkOnRoot，直到清空schedule链表

3. 清理工作 finishRendering 【TODO】

## 关键代码
```javascript
// 同步模式下：isYieldy为false
function performWork(minExpirationTime, isYieldy){
  findHighestPriorityRoot();

  if (isYieldy) {
      // ... 省略并发模式相关的逻辑  
  } else {
    // 循环执行任务
    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && minExpirationTime <= nextFlushedExpirationTime) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
      findHighestPriorityRoot();
    }
  } 
  
  // ... 省略并发模式相关的逻辑
  
  finishRendering();
}
```


# performWorkOnRoot
非常重要的入口，真正开始进行root节点的更新了，可以看到root节点的更新包含两个阶段：render阶段和complete阶段，分别对应两个方法renderRoot和completeRoot。
**这个过程总是从root节点开始**

## 主要流程
1. 并发模式【TODO】
2. 同步模式，看到执行一次完整的渲染过程包含两个阶段 render阶段和commit阶段
    1. renderRoot：主要的工作 构建fiber树，调和等操作，这里的fiber对象就是我们所说的虚拟dom；render阶段完成后会在root节点中挂载一个finishedWork属性，通过判断该属性是否存在得知render阶段是否完成，render阶段完成后就可以进入commit阶段
    2. completeRoot -> commitRoot，将render阶段的成果反馈到真实dom节点上
## 代码
```javascript
function performWorkOnRoot(root, expirationTime, isYieldy){
  isRendering = true;
  
  if (!isYieldy) { // 同步模式逻辑
      
    var finishedWork = root.finishedWork;
    if (finishedWork !== null) {
      completeRoot(root, finishedWork, expirationTime);
    } else {
      root.finishedWork = null;
      
      var timeoutHandle = root.timeoutHandle;
      if (timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        cancelTimeout(timeoutHandle);
      }
      
      renderRoot(root, isYieldy);
      finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        completeRoot(root, finishedWork, expirationTime);
      }
    }
  } else {
      // ... 省略并发模式相关的逻辑
  }

  isRendering = false;
}
```


# render阶段：renderRoot
## 主要流程
1. 设置全局变量 isWorking
2. ReactCurrentDispatcher是和hooks执行相关的对象
    1. ContextOnlyDispatcher 重写了hooks的方法，逻辑均改为抛异常，
    2. 只有在renderHooks函数内部执行时，才允许使用hooks，其余地方执行hooks都属于预期之外需要抛出异常 【猜测】
3. if条件：Check if we're starting from a fresh stack, or if we're resuming from previously yielded work.
    >针对这个if我们还是对这个条件取反来看，会更容易理解
    
    >expirationTime === nextRenderExpirationTime && root === nextRoot && nextUnitOfWork !== null
    满足这个条件说明是同一个root节点，同一优先级的任务，nextUnitOfWork存在表明有任务正在render阶段执行，针对这种场景，调用workLoop继续执行的工作即可
    
    >满足 expirationTime !== nextRenderExpirationTime || root !== nextRoot 这两个条件说明一定是不同的任务
    如果 nextUnitOfWork === null 说明当前正在render阶段执行的任务(如果有的话)已经执行完毕了
    这两种情况都需要重启一个新的任务，即执行if条件语句内的操作

- 1.resetStack, 重置相关的全局变量，另外重要的一点是需要如果之前的任务执行了一半被终止了即nextUnitOfWork存在，需要撤销已经完成的部分工作【TODO】
- 2.设置 nextRenderExpirationTime , nextRoot
- 3.创建了 根节点的 alternate 版本：createWorkInProgress，因为总是从根节点开始处理，另外render阶段的工作都是基于替换版本去处理的
    >workInProgress 英文含义 进行中的工作
- 4.赋值给nextUnitOfWork，初始化为根节点的fiber对象的替换版本，在workLoop中递归遍历这个树

4. workLoop：深度优先遍历整个树，为每个节点执行更新
5. 恢复一些全局变量的设置，
```javascript
isWorking
ReactCurrentDispatcher.current
resetContextDependences
resetHooks();
```

6. 异常 以及 并发模式相关逻辑 ....【TODO】
7. onComplete
    1. 设置finishedWork为根节点的替换版本
    2. 设置pendingCommitExpirationTime为root.nextExpirationTimeToWorkOn，该时间在commit阶段会使用到

## 代码
```javascript
function renderRoot(root, isYieldy){
  flushPassiveEffects();

  isWorking = true;
  
  var previousDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  var expirationTime = root.nextExpirationTimeToWorkOn;

  if (expirationTime !== nextRenderExpirationTime || root !== nextRoot || nextUnitOfWork === null) {
    resetStack();
    nextRoot = root;
    nextRenderExpirationTime = expirationTime;
    nextUnitOfWork = createWorkInProgress(nextRoot.current, null, nextRenderExpirationTime);
    root.pendingCommitExpirationTime = NoWork;
  }

  do {
    try {
      workLoop(isYieldy);
    }
    catch (thrownValue) {
        // ...省略异常相关逻辑
    }
    break;
  } while (true);
 
  isWorking = false;  
  ReactCurrentDispatcher.current = previousDispatcher;
  resetContextDependences();
  resetHooks();

  // ... 省略 异常和并发模式相关的逻辑

  var rootWorkInProgress = root.current.alternate;
  nextRoot = null;
  interruptedBy = null;
  
  // ... 省略 异常和并发模式相关的逻辑
  
  onComplete(root, rootWorkInProgress, expirationTime);
}

// render阶段完成后，设置完成标志
function onComplete(root, finishedWork, expirationTime){
  root.pendingCommitExpirationTime = expirationTime;
  root.finishedWork = finishedWork;
}
```


## workLoop
```javascript
function workLoop(isYieldy){
  if (!isYieldy) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {
      // ... 异步模式
  }
}
```


# 提交阶段：completeRoot
见commit阶段文件夹
