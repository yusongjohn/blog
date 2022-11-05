import React, {
    useEffect, useLayoutEffect, useState,
} from 'react';

export default function UseEffectTest(){
    const [count, setCount] = useState(0);

    debugger
    useEffect(() => {
        console.log('------useEffect');
        if (count === 0) {
            const randomNum = 10 + Math.random() * 200;
            setCount(10 + Math.random() * 200);
        }
    }, [count]);

    // useLayoutEffect(() => {
    //     console.log('------useLayoutEffect');
    // });

    return (
        <div onClick={() => {
            setCount(0);
        }}>{count}</div>
    );
}

// 参考：https://juejin.im/post/6844904008402862094
// 运行上面的组件，点击div，页面会更新一串随机数。
// 当你连续点击时，你会发现这串数字在发生抖动。
// 原因在于，当你每次点击 div， count 会更新为 0， 之后 useEffect 内又把 count 改为一串随机数。
// 所以页面会先渲染成0，然后再渲染成随机数，由于更新很快，所以出现了闪烁。
// 接下来我们将 useEffect 改为 useLayoutEffect：
// 闪烁消失了。
// 相比使用 useEffect，当你点击 div，count 更新为 0，此时页面并不会渲染，而是等待 useLayoutEffect 内部状态修改后，才会去更新页面，所以页面不会闪烁。

// 总结
//
// useLayoutEffect 相比 useEffect，通过同步执行状态更新可解决一些特性场景下的页面闪烁问题。
// useEffect 可以满足百分之99的场景，而且 useLayoutEffect 会阻塞渲染，请谨慎使用。
