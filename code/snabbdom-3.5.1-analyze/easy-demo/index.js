import {
  init, classModule, propsModule, styleModule, eventListenersModule, h
} from "../build/index.js";

const patch = init([// Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
]);

const container = document.getElementById("container");

function someFn() {
  function anotherEventHandler() {
    console.log('anotherEventHandler')
  }
  
  const newVnode = h("div#container.two.classes",
    { on: { click: anotherEventHandler } },
    [
      h("span", { style: { fontWeight: "normal", fontStyle: "italic" } }, "This is now italic type"),
      " and this is still just normal text",
      h("a", { props: { href: "http://wwww.baidu.com" } }, "_ baidu.com_2")
    ]
  );

  // Second `patch` invocation
  patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
}



const vnode = h("div#container.two.classes",
  { on: { click: someFn } },
  [
    h("span", { style: { fontWeight: "bold" } }, "This is bold"), " and this is just normal text",
    h("a", { props: { href: "http://wwww.baidu.com" } },
      "_ baidu.com_1")
  ]
);

// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

