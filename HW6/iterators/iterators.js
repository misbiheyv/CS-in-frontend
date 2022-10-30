export {

    random,
    take,
    filter,
    enumerate,
    seq,
    zip,
    mapSeq

};

function random(min, max) {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return {
                done: false,
                value: (min + Math.floor(Math.random() * (max - min)))
            }
        }
    }
}

function take(iterable, count) {
    let i = 0;
    const iter = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const v = iter.next().value;
            return {
                done: i++ >= count,
                value: v
            }
        }
    }
}

function filter(iterable, cb) {
    const iter = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let cur = iter.next();

            while (!cb(cur.value) && !cur.done) {
                cur = iter.next();
            }

            return cur;
        }
    }
}

function enumerate(iterable) {
    let i = 0;
    const iter = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const cur = iter.next()
            return {
                done: cur.done,
                value: [i++, cur.value]
            }
        }
    }
}

function seq(...iterables) {    

    const iters = iterables.map(el => el[Symbol.iterator]());

    let pointer = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let cur = iters[pointer].next();
            
            while (true) {
                if (cur.done) {
                    if (++pointer !== iters.length) {
                        cur = iters[pointer].next()
                        continue ;
                    }

                    return {
                        done: true,
                        value: undefined
                    }
                }

                return cur;
            }
        }
    }
}

function zip(...iterables) {
    const iters = iterables.map(el => el[Symbol.iterator]());

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let tuple = [];
            
            for (const iter of iters) {
                const cur = iter.next();

                if (cur.done) {
                    return {
                        done: true,
                        value: undefined
                    }
                }

                tuple.push(cur.value);
            }

            return {
                done: false,
                value: tuple
            }
        }
    }
}

function mapSeq(iterable, handlers) {
    const iter = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const cur = iter.next()
            return {
                value: handlers.reduce((acc, cur) => cur(acc), cur.value),
                done: cur.done
            }
        }
    }
}