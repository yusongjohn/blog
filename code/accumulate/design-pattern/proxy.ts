class Target {
    method() {
        console.log('i am target')
    }
}

class Proxy {
    private target: Target = new Target();

    method() {
        console.log('--before--');
        this.target.method();
        console.log('--after--');
    }
}

const proxy = new Proxy();
proxy.method();
