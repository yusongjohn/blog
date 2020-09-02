abstract class Strategy {
    public abstract method()
}

class Strategy_1 extends Strategy {
    constructor() {
        super();
    }

    method() {
        console.log('strategy_1')
    }
}

class Strategy_2 extends Strategy {
    constructor() {
        super();
    }

    method() {
        console.log('strategy_2')
    }
}

class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }


    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    getStrategy() {
        return this.strategy;
    }

    method() {
        this.strategy.method();
    }
}

// test
const context = new Context(new Strategy_1());
context.method();
context.setStrategy(new Strategy_2());
context.method();


// knockout中的模板引擎采用的策略模式，默认使用原生模板引擎，检测到有jquery.tml时设置使用jquery的模板引擎

// 1. 定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。
// 2. 使用和实现分离，策略类的使用放在环境类中，算法实现放在具体的策略类中
// 低耦合 高扩展
