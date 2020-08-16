function ajax(options) {
    var xhr = null;
    let params = '';
    Object.keys(data).map((key) => {
        params += `${key}=${data[key]}&`;
    });

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 0：未初始化。尚未调用 open()方法。
    // 1：启动。已经调用 open()方法，但尚未调用 send()方法。
    // 2：发送。已经调用 send()方法，但尚未接收到响应。
    // 3：接收。已经接收到部分响应数据。//该状态会有多次
    // 4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                options.success(xhr.responseText);
                // 1. responseText：作为响应主体被返回的文本。
                // 2. responseXML：如果响应的内容类型是"text/xml"或"application/xml"，这个属性中将保
                // 3. 存包含着响应数据的 XML DOM 文档。
            } else {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };

    if (options.type == "GET") {
        xhr.open(options.type, `${options.url}?${params}`, options.async);
        xhr.send(null);//如果没有，必须设置为null
    } else if (options.type == "POST") {
        xhr.open(options.type, options.url, options.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
