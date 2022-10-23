export default class Range {
    #min;
    #max;
    #isNumber;

    constructor(start, end) {
        this.#isNumber = typeof start === "number";

        this.#min = this.#isNumber ? start : start.toString().codePointAt(0);
        this.#max = this.#isNumber ? end : end.toString().codePointAt(0);
    }

    [Symbol.iterator]() {
        return this.values();
    }

    values() {
        let i = this.#min;

        return {
            [Symbol.iterator]() {
                return this;
            },
            next: () => {
                return {
                    done: i > this.#max,
                    value: this.#isNumber ? i++ : String.fromCharCode(i++)
                }
            }
        }
    }

    reverse() {
        let i = this.#max;

        return {
            [Symbol.iterator]() {
                return this;
            },
            next: () => {
                return {
                    done: i < this.#min,
                    value: this.#isNumber ? i-- : String.fromCharCode(i--)
                }
            }
        }
    }
}