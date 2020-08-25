class ConcreteIterator {
    private list: [];
    private index: number = -1;

    constructor(list) {
        this.list = list;

    }

    next() {
        this.index++;
        return this.list[this.index]
    }

    hasNext() {
        if (this.index < this.list.length - 1) {
            return true;
        }
        return false;
    }
}

class ConcreteAggregate {
    private list: string[];

    add(item: string) {
        this.list.push(item)
    }

    remove() {
        this.list.pop();
    }

    getIterator() {
        return new ConcreteIterator(this.list);
    }
}

const aggregate = new ConcreteAggregate();
aggregate.add('1');
aggregate.add('2');
aggregate.add('3');

const iterator = aggregate.getIterator();
while (iterator.hasNext()) {
    console.log(iterator.next());
}
