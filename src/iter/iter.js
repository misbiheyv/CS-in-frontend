import { 

    isLowSurrogate,
    isHightSurrogate,

} from './helpers.js';

export default function iter(str) {
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
            cur = normalizedString[i++];
            
            if (cur === undefined) {
                return {
                    done: true,
                    value: cur
                }
            }

            if (isLowSurrogate(cur.codePointAt(0))) {
                prev = cur;
                cur = normalizedString[i++];
            }

            if (isHightSurrogate(cur.codePointAt(0))) {
                return {
                    done: false,
                    value: `${prev}${cur}`
                }
            }

            return {
                done: false,
                value: cur
            }
        }
    }
}