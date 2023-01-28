let uid = 0;

export default class Watcher {
  constructor() {
    this.deps = []
    this.id = `Watcher${uid++}`;
  }

  addDep(dep) {
    if (this.deps.findIndex(item => item === dep) >= 0) {
      return
    }
    this.deps.push(dep)
    dep.addSub(this);
  }

  update(dep) {
    console.log(`${this.id}_${dep.id}, changed`)
  }
}
