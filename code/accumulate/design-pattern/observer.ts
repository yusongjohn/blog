class Subject {
    private list: Observer [];

    subscribe(observer: Observer) {
        this.list.push(observer)
    }

    notifiyAll() {
        this.list.forEach((observer: Observer) => {
            observer.response()
        })
    }
}

let flag = 0;

class Observer {
    private flag: number;

    constructor(props) {
        this.flag = flag++;
    }

    public response() {
        console.log('--response--' + this.flag);
    }
}

