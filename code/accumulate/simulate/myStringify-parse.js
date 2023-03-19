// JSON.stringify：undefined、function、symbol均会被忽略
function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== 'object' || obj === null) { //obj:number\string\boolean\function\
        if (/string|function|undefined/.test(type)) {//function\undefined\string需要添加双引号
            return '"' + obj + '"'
        }
        return String(obj);
    } else {
        let json = [];
        let isArray = Array.isArray(obj);
        for (let key in obj) {
            let value = obj[key];
            if (/string|function|undefined/.test(typeof value)) {
                value = '"' + obj + '"';
            } else if (typeof value === 'object') {
                value = jsonStringify(value);
            }
            json.push(isArray ? value : '"' + key + '"' + ':' + String(value))
        }
        return (isArray ? '[' : '{') + String(json) + (isArray ? ']' : '}')
    }
}
