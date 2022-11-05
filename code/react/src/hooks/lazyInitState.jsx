import React, {
  useState,
} from 'react';
/**
 * ----------------------------------------------------------------------------------------------------------
 * 惰性初始化state
 */
export function Counter2(props){
  console.log('Counter2render', Date.now());

  // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
  function getInitState(){
    console.log('--inital-state--');
    return { number: props.number };
  }

  let [counter, setCounter] = useState(getInitState);
  console.log(counter);
  return (
    <>
      <p>{counter.number}</p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>+</button>
      <button onClick={() => setCounter(counter)}>setCounter</button>
    </>
  );
}
