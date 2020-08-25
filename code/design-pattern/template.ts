abstract class AbstractClass {
    public TemplateMethod() {
        this.SpecificMethod();
        this.abstractMethod1();
        this.abstractMethod2();
    }

    public SpecificMethod() {
        console.log("抽象类中的具体方法被调用...");
    }

    public abstract abstractMethod1(); //抽象方法1
    public abstract abstractMethod2(); //抽象方法2
}


class ConcreteClass extends AbstractClass {
    public abstractMethod1() {
        console.log("抽象方法1的实现被调用...");
    }

    public abstractMethod2() {
        console.log("抽象方法2的实现被调用...");
    }
}


const tm = new ConcreteClass();
tm.TemplateMethod();


// 步骤的顺序是确定，只是某些步骤的实现可能不同
