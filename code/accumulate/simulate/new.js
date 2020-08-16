function newImple(Constructor) {
    let obj = {};
    obj.__proto__ = Constructor.prototype;
    let result = Constructor.apply(obj, [...arguments].slice(1));
    if (result !== null) {
        return result
    }
    return obj;
}
