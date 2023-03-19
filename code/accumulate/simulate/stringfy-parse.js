function jsonStringify(obj) {
    let type = typeof obj;
    if (obj === null || type !== "object") {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = [];
        let arr = Array.isArray(obj);
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) { //排除原型链上的属性
                continue;
            }
            let value = obj[key];
            let type = typeof value;
            if (/string|undefined|function/.test(type)) {
                value = '"' + value + '"';
            } else if (type === "object") {
                value = jsonStringify(value);
            }
            json.push((arr ? "" : '"' + key + '":') + String(value)); //注意：数组不用存放key
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}

console.log(jsonStringify({
    a: {
        b: function () {
            console.log('a')
        },
        c: null
    }
}))


//parse :eval、new Function
var jsonStr = '{ "age": 20, "name": "jack" }'
var json = (new Function('return ' + jsonStr))();
