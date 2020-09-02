interface Target {
    request: () => void;
}

//适配者接口
class Adaptee {
    public specificRequest() {
        console.log("适配者中的业务代码被调用！");
    }
}

//类适配器类
class ClassAdapter extends Adaptee implements Target {
    public request() {
        this.specificRequest();
    }
}


// test
const target = new ClassAdapter();
target.request();


// 目标 将非标准的接口转为标准的接口
