function instanceOf(left, right) {
    let _proto = left.__proto__;
    let _protoType = right.prototype;
    if (_proto != null && _protoType != null) {
        if (_proto === _protoType) {
            return true
        }
        return instanceOf(_proto.right)
    }
}

function instanceOf(left, right) {
    let leftValue = left.__proto__;
    let rightValue = right.prototype;
    while (true) {
        if (leftValue == null) {
            return false;
        }
        if (leftValue === rightValue) {
            return true
        }
        leftValue = leftValue.__proto__;
    }
}

