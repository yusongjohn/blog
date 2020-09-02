import React, {
  useState,
} from 'react';

/**
 * ----------------------------------------------------------------------------------------------------------
 *  更新状态时，函数组件会被重新调用
 * 每次渲染都是独立的【闭包】
 */

let a = false;

export default function UseStateTest(){
  const nameState = { name: 'yusong' };
  const ageState = { age: 29 };
  let [name, setName] = useState(nameState);
  let [age, setAge] = useState(ageState);

  return (
    <>
      <p>{name.name} {age.age}</p>
      <button onClick={() => {
        setName({ name: 'sunqing' });
        setAge({ age: '26' });
        setName({ name: 'yujingyi' });
      }}>mod name
      </button>
    </>
  );
}
