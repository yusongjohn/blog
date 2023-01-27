import {observe} from "./observe.js";
import Watcher from "./Watcher.js";
import {set} from "./api.js";

function main() {
  const data = {
    a: 'a',
    b: {
      c: 'c'
    }
  }
  // 让数据变成响应式，即具备观察者模式的能力
  observe(data);

  // 建立双向关系（依赖（或者主题的）订阅者、观察者的依赖（或者订阅的主题）
  new Watcher(function () {
    console.log(data.b);
  }, function () {
    console.log(data)
  });

  // 派发跟新
  data.b = {
    c: 'aa'
  }

  // data.c = 'c';
  set(data.b, 'c1', 'c1')
}

main();
