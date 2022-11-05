import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';

/**
 * ----------------------------------------------------------------------------------------------------------
 * useImperativeHandle 自定义暴露给父组件的实例值，不能让父组件想干嘛就干嘛
 */

function Child(props, parentRef){
  // 子组件内部自己创建 ref
  let focusRef = useRef();
  let inputRef = useRef();
  useImperativeHandle(parentRef, () => {
    // 这个函数会返回一个对象，该对象会作为父组件 current 属性的值
    // 通过这种方式，父组件可以使用操作子组件中的多个 ref
    return {
      focusRef,
      inputRef,
      name: '计数器',
      focus(){
        focusRef.current.focus();
      },
      changeText(text){
        inputRef.current.value = text;
      },
    };
  });

  return (
    <>
      <input ref={focusRef}/>
      <input ref={inputRef}/>
    </>
  );

}

const ForwardChild = forwardRef(Child);

export function UseImperativeParent(){
  const parentRef = useRef();//{current:''}
  function getFocus(){
    parentRef.current.focus();

    // 因为子组件中没有定义这个属性，实现了保护，所以这里的代码无效
    parentRef.current.addNumber(666);

    parentRef.current.changeText('<script>alert(1)</script>');
    console.log(parentRef.current.name);
  }

  return (
    <>
      <ForwardChild ref={parentRef}/>
      <button onClick={getFocus}>获得焦点</button>
    </>
  );
}

