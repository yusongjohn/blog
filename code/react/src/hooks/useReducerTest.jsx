import React, {
  useReducer,
} from 'react';

/**
 * ----------------------------------------------------------------------------------------------------------
 * useReducer
 *
 * 【官方文档】React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
 *  这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。
 */
function reducer(state, action){
  switch (action.type) {
    case 'increment':
      return { number: state.number + 1 };
    case 'decrement':
      return { number: state.number - 1 };
    default:
      throw new Error();
  }
}

// 提取出来的好处是，方便以后在reducer中进行状态重置
function initSate(){
  console.log('--counter5---userreudcer');
  return {
    number: 1,
  };
}

export function Counter5(){

  // const [state, dispatch] = useReducer(reducer, { number: initialState });

  // 第三个参数是的初始状态【懒加载】了
  const [state, dispatch] = useReducer(reducer, { number: 0 }, initSate());


  return (
    <>
      Count: {state.number}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
