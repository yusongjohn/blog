<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [updateClassComponent](#updateclasscomponent)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B)
  - [代码](#%E4%BB%A3%E7%A0%81)
- [constructClassInstance](#constructclassinstance)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B-1)
- [mountClassInstance](#mountclassinstance)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B-2)
- [updateClassInstance](#updateclassinstance)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B-3)
- [finishClassComponent](#finishclasscomponent)
  - [主要流程](#%E4%B8%BB%E8%A6%81%E6%B5%81%E7%A8%8B-4)
  - [代码](#%E4%BB%A3%E7%A0%81-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# updateClassComponent
## 主要流程
1. 处理context相关的逻辑，见context章节
2. if条件分支
    - 条件1：如果当前fiber节点没有关联的组件实例（如在组件第一次挂载阶段
        - 调用 constructClassInstance 执行构造函数创建组件实例
        - 调用 mountClassInstance，fiber.udpateQueue上的update的执行与合并，以及该阶段部分生命周期的执行
        - 设置shouldUpdate为ture，挂载阶段一定更新
    - 条件2：如果fiber关联的组件实例不为null，但是current确认null ，说明处于恢复阶段【TODO】
    - 除了上述情况之外，就是组件的更新阶段，调用updateClassInstance，执行更新阶段相关的生命周期以及state的更新
3. 组件更新的收尾工作：finishClassComponent
    - 调用组件render方法：instance.render获取最新的dom树
    - 调和，与老的结构进行对比，在相应的fiber节点上通过effectTag标识副作用，以在commit阶段提交更新(待确认

## 代码
```javascript
function updateClassComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime){
  // 省略context相关逻辑...

  var instance = workInProgress.stateNode;
  var shouldUpdate = void 0;
  if (instance === null) {
    if (current$$1 !== null) {
      // An class component without an instance only mounts if it suspended
      // inside a non- concurrent tree, in an inconsistent state. We want to
      // tree it like a new mount, even though an empty version of it already
      // committed. Disconnect the alternate pointers.
      current$$1.alternate = null;
      workInProgress.alternate = null;
      // Since this is conceptually a new fiber, schedule a Placement effect
      workInProgress.effectTag |= Placement;
    }

    constructClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);

    // 第一次挂载阶段 shouldUpdate一定为true
    shouldUpdate = true;
  } else if (current$$1 === null) {
    // In a resume, we'll already have an instance we can reuse.
    shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
  } else {
    shouldUpdate = updateClassInstance(current$$1, workInProgress, Component, nextProps, renderExpirationTime);
  }

  var nextUnitOfWork = finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime);

  return nextUnitOfWork;
}
```

# constructClassInstance
## 主要流程
1. context相关逻辑，见context章节
2. 执行构造函数
3. 设置 workInProgress.memoziedState
4. adoptClassInstance 设置相关属性
```javascript
instance.updater = classComponentUpdater，setState/forceUpdate等操作的具体实现就是在这个类中
workInProgress.stateNode =  instance
instance._reactInternalFiber = workInProgrss
```
5. context相关(缓存，见context章节

# mountClassInstance
## 主要流程
主要是生命周期调用 & state的合并处理
1. context相关逻辑
2. 获取最新的状态：processUpdateQueue(workInProgress.updateQueue) 【TODO】
3. 生命周期getDerivedStateFromProps
4. 支持老的生命周期i：UNSAFE_componentWillMount/componentWillMount
    - 注意：getDerivedStateFromProps、getSnapshotBeforeUpdate没有实现的情况下才支持上述老的生命周期
    - 由于老的生命周期不是静态方法，可以执行setState，会向fiber.uddateQueue添加更新对象，因此需要再次执行以下processUpdateQueue来获取最新的state
5. componentDidMount生命周期暂时不会执行，
    - workInProgress.effectTag |= Update 相当于给这个节点加上了这个副作用标记，会在commit阶段被调用

# updateClassInstance
## 主要流程
生命周期 & context & state

1. context相关
2. 如果props变化或者context变化了，则调用生命周期：UNSAFE_componentWillReceiveProps、componentWillReceiveProps
    - 条件：!hasNewLifecycles  && (oldProps !== newProps || oldContext !== nextContext)
3. resetHasForceUpdateBeforeProcessing：重置是否强制更新hasForceUpdate
4. 如果updateQueue存在则 processUpdateQueue(workInProgress.updateQueue)，获取最新的状态
    - newState = workInProgress.memoizedState;
5. 如果props没有变化，state没有变化，context没有变化，也没有强制更新，则说明组件不需要更新【TODO】这里的注释让我没看懂这里
    - 为 componentDidUpdate & getSnapshotBeforeUpdate 设置effectTag
    - 返回false给upateClassComponent的shouldUpdate变量
6. 生命周期：getDerivedStateFromProps
    - applyDerivedStateFromProps
7. 生命周期：shouldUpdate判断，如果没哟强制更新则调用shouldComponentUpdate，否则返回true
8. 如果组件需要更新，即shouldUpdate为true，则调用以下生命周期
    - 支持生命周期：componentWillUpdate \ UNSAFE_componentWillUpdate
    - 为 生命周期 componentDidUpdate getSnapshotBeforeUpdate 设置effectTag标志，在commit阶段执行
9. 设置组件实例关键属性
```javascript
instance.props = newProps;
instance.state = newState;
instance.context = nextContext;
```
10. 将shouldUpdate返回给updateClassComponent的变量shouldUpdate

# finishClassComponent
## 主要流程
1. 在没有出现异常的情况下
    1. children = instance.render() ：获取最新的dom结构
    2. reconcile() ：调和 见相关章节
2. 省略了异常相关和context相关的逻辑 【TODO】

## 代码
```javascript
function finishClassComponent(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: any,
  shouldUpdate: boolean,
  hasContext: boolean,
  renderExpirationTime: ExpirationTime,
) {
    ...
    nextChildren = instance.render();
    ...
    reconcileChildren(
      current,
      workInProgress,
      nextChildren,
      renderExpirationTime,
    );
    ...
  return workInProgress.child;
}
```

