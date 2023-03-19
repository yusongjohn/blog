//readyState : 0,1,2,3,4
//status
//

function createXHR() {
    if (window.XMLHttpRequest) {
        return window.XMLHttpRequest();
    } else {
        return new ActiveXObject('Microsoft.XMLHTTP')
    }
}

function ajax(options) {
    if (!options) return;

    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                options.success(xhr.responseText);
            } else {
                options.onerror && options.onerror();
            }
        }
    };
    xhr.timeout = options.timeout || 1 * 60 * 1000;
    xhr.ontimeout = options.ontimeout || function () {
        console.log('请求超时');
    };
    xhr.onerror = options.onerror || function () {
        console.log('请求出错');
    }
    var params = '';
    if (options.data) {
        Object.keys(options.data).forEach(function (key) {
            params += `${key}=${options.data[key]}&`;
        })
    }

    if (typeof options.type === 'string' && options.type.toLowerCase() === 'get') {
        options.open(options.type, `${options.url}?${params}`, options.async);
        options.send(null);
    } else {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        options.open(options.type, options.url, options.async);
        options.send(params);
    }
}

//Promise封装ajax，如何设定超时
function ajax(options) {
    let url = options.url;
    const method = options.method.toLocaleLowerCase() || 'get';
    const async = options.async;
    const data = options.data;
    const xhr = new XMLHttpRequest();
    if (options.timeout && options.timeout > 0) {
        xhr.timeout = options.timeout
    }
    return new Promise((resolve, reject) => {
        xhr.ontimeout = () => reject && reject('请求超时');
        // 监听状态变化回调
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                // 200-300 之间表示请求成功，304资源未变，取缓存
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    resolve && resolve(xhr.responseText)
                } else {
                    reject && reject()
                }
            }
        };
        // 错误回调
        xhr.onerror = err => reject && reject(err);
        let paramArr = [];
        let encodeData;
        // 处理请求参数
        if (data instanceof Object) {
            for (let key in data) {
                // 参数拼接需要通过 encodeURIComponent 进行编码
                paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            }
            encodeData = paramArr.join('&')
        }
        // get请求拼接参数
        if (method === 'get') {
            // 检测url中是否已存在 ? 及其位置
            const index = url.indexOf('?');
            if (index === -1) url += '?';
            else if (index !== url.length - 1) url += '&';
            // 拼接url
            url += encodeData
        }
        // 初始化
        xhr.open(method, url, async);
        // 发送请求
        if (method === 'get') xhr.send(null);
        else {
            // post 方式需要设置请求头
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
            xhr.send(encodeData)
        }
    })
}

