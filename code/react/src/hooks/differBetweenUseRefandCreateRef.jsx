import React, {
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';

/**
 * useRef 与 createRef 区别
 * 1. useRef 返回的 ref 对象在组件的整个生命周期内保持不变，也就是说每次重新渲染函数组件时，返回的ref 对象都是同一个使用
 * 2. React.createRef ，每次重新渲染组件都会重新创建 ref
 */

export function MyInput(){
  let [count, setCount] = useState(0);

  const myRef = createRef(null);
  const inputRef = useRef(null);
  //仅执行一次
  useEffect(() => {
    inputRef.current.focus();
    window.myRef = myRef;
    window.inputRef = inputRef;
  }, []);

  useEffect(() => {
    //除了第一次为true， 其它每次都是 false 【createRef】
    console.log('myRef === window.myRef', myRef === window.myRef);
    //始终为true 【useRef】
    console.log('inputRef === window.inputRef', inputRef === window.inputRef);
  });
  return (
    <>
      <input type="text" ref={inputRef}/>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}
