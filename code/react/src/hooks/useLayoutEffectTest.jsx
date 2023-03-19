import React, {
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
/**
 * ----------------------------------------------------------------------------------------------------------
 * useLayoutEffect
 */
export function LayoutEffect(){
  const [color, setColor] = useState('red');
  useLayoutEffect(() => {
    // 阻塞渲染
    alert(color);

    // 下面操作导致rerender，但是由于使用Object.is ,由于这里是字符串字面量，对比为true，不会造成循环渲染，
    // 如果把这里的初始值改为对象，那么会造成循环渲染
    setColor('black');
  });

  useEffect(() => {
    console.log('color', color);
  });

  return (
    <>
      <div id="myDiv" style={{ background: color }}>颜色</div>
      <button onClick={() => setColor('red')}>红</button>
      <button onClick={() => setColor('yellow')}>黄</button>
      <button onClick={() => setColor('blue')}>蓝</button>
    </>
  );
}
