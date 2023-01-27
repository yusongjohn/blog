import Watcher from "./Watcher.js";
import Dep from "./Dep.js";

function main() {
  const watcherOne = new Watcher();
  const watcherTwo = new Watcher();

  const subjectOne = new Dep();
  watcherOne.addDep(subjectOne)
  watcherTwo.addDep(subjectOne)
  subjectOne.notify();

  console.log('----------');

  const subjectTwo = new Dep();
  watcherTwo.addDep(subjectTwo)
  subjectTwo.notify();
}

main();
