//非享元角色
class UnsharedConcreteFlyweight {
    private info: string;

    constructor(info: string) {
        this.info = info;
    }

    public getInfo() {
        return this.info;
    }
}

//抽象享元角色
interface Flyweight {
    operation(state: UnsharedConcreteFlyweight);
}

//具体享元角色
class ConcreteFlyweight implements Flyweight {
    public key: string;

    constructor(key: string) {
        this.key = key;
        console.log("具体享元" + key + "被创建！");
    }

    public operation(outState: UnsharedConcreteFlyweight) {
        console.log("具体享元" + this.key + "被调用，");
        console.log("非享元信息是:" + outState.getInfo());
    }
}

//享元工厂角色
class FlyweightFactory {
    private flyweights = {};

    public getFlyweight(key: string) {
        let flyweight = this.flyweights[key];
        if (flyweight != null) {
            console.log("具体享元" + key + "已经存在，被成功获取！");
        } else {
            flyweight = new ConcreteFlyweight(key);
            this.flyweights[key] = flyweight;
        }
        return flyweight;
    }
}


// test
const factory = new FlyweightFactory();
const f01 = factory.getFlyweight("a");
const f02 = factory.getFlyweight("a");
const f03 = factory.getFlyweight("a");
const f11 = factory.getFlyweight("b");
const f12 = factory.getFlyweight("b");
f01.operation(new UnsharedConcreteFlyweight("第1次调用a。"));
f02.operation(new UnsharedConcreteFlyweight("第2次调用a。"));
f03.operation(new UnsharedConcreteFlyweight("第3次调用a。"));
f11.operation(new UnsharedConcreteFlyweight("第1次调用b。"));
f12.operation(new UnsharedConcreteFlyweight("第2次调用b。"));

// 本质 复用已有对象
