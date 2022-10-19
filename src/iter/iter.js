import { 

    isLowSurrogate,
    isHightSurrogate,

} from './helpers';

function iter(str) {
    const normalizedString = str.normalize()

    let 
        cur,
        prev,
        i = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            cur = normalizedString[i];

            if (isLowSurrogate(cur.codePointAt(0))) {
                prev = cur;
                cur = normalizedString[i + 1];
            }

            if (isHightSurrogate(cur.codePointAt(0))) {
                return {
                    done: ++i >= normalizedString.length,
                    value: `${prev}${cur}`
                }
            }

            return {
                done: ++i >= normalizedString.length,
                value: cur
            }
        }
    }
}