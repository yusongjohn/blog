class Singleton {
    static instance = null;

    static getInstance(){
        if (Singleton.instance) {
            return Singleton.instance
        }
        return new Singleton();
    }

    constructor(){

    }
}

const Single = (function(){
    const single = null;

    class Singleton {
        constructor(props){
            if (single) {
                return single
            }
            return this;
        }
    }

    return Singleton;
}());
