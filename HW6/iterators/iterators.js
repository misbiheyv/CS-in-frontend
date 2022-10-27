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
                value: (min + Math.floor(Math.random() * max)) % (max + 1)
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

function seq(...iters) {
    let 
        i    = 0,
        iter = iters[i][Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let cur = iter.next();

            if (i === iters.length - 1 && cur.done) {
                return {
                    value: undefined,
                    done: true
                }
            }

            if (cur.done) {
                iter = iters[++i][Symbol.iterator]();
                cur = iter.next()
            }

            return cur;
        }
    }
}

function zip(...iters) {
    let i = 0;
    let size = Number.MAX_SAFE_INTEGER;

    for (const iter of iters) {
        const l = [...iter].length;
        size = l < size ? l : size;
    }

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let res = [];

            if (i === size) {
                return {
                    done: true,
                    value: undefined
                }
            }

            for (const iter of iters) {
                res.push([...iter][i]);
            }

            i++;

            return {
                done: false,
                value: res
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