import {init, classModule, propsModule, styleModule, eventListenersModule, h,} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule,]);

const container = document.getElementById("container");

const vnode = h("div#container", {},
    h('ul', [], [
        h('a', {}, 'a'),
        h('b', {}, 'b'),
        h('c', {}, 'c'),
        h('d', {}, 'd')
    ]));


// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

// 因为patch是基于vnode进行对比的，因此你直接操作dom的变化，vnode是感知不到的
// 通过下述方式用来判断节点是否被复用
const a = document.querySelector('a')
a.style.backgroundColor = 'red'

const b = document.querySelector('b')
b.style.backgroundColor = 'green'

const c = document.querySelector('c')
c.style.backgroundColor = 'pink'

const d = document.querySelector('d')
d.style.backgroundColor = 'lightgray'

//--------------------------------
// const newVnode = h("div#container.two.classes", {},
//     h('ul', [], [
//         h('d', {}, 'd'),
//         h('b', {}, 'b'),
//         h('c', {}, 'c'),
//         h('a', {}, 'a')
//     ]));

window.clickHandle = function () {
    const newVnode = h("div#container", {},
        h('ul', [], [
            h('b', {}, 'b-1'),
            h('d', {}, 'd-1'),
            h('a', {}, 'a-1'),
            h('c', {}, 'c-1')
        ]));

    // Second `patch` invocation
    patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
}
