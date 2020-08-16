Object.create = function (_proto) {
    function fn() {
    }

    fn.prototype = _proto;
    return new fn();
}
