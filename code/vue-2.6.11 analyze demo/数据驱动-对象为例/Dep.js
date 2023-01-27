let uid = 0;

export default class Dep {
  currentWatcher = null; // Watcher类型

  constructor() {
    this.watchers = [];
    this.id = `Dep_${uid++}`;
  }

  addSub(watcher) {
    if (this.watchers.findIndex(item => item === watcher) >= 0) {
      return
    }
    this.watchers.push(watcher);
  }

  notify() {
    this.watchers.forEach(watcher => watcher.update(this))
  }
}
