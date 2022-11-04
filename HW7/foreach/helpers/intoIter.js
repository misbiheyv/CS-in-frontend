export function intoIter(obj);

export function intoIter(obj);

export function intoIter(obj);

export function intoIter(obj) {

    if (obj instanceof Array) {
        return obj.values();
    }

    if (Symbol.iterator in Object(obj)) {
        const iter = Object(obj)[Symbol.iterator]();

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                return iter.next()
            }
        }
    }

    return [].values();
}
