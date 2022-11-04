import { intoIter } from './helpers/intoIter';

let execDuration = 50;

let sleepDuration = 50;

export const getExecDuration = () => execDuration;

export const getSleepDuration = () => execDuration;

export const changeExecDuration = (v) => execDuration = v;

export const changeSleepDuration = (v) => sleepDuration = v;

export default function forEach(iterable, fn,) {
    return executor(_forEach(intoIter(iterable), fn))
}

function *_forEach(iter, fn,) {
    let time = Date.now();

    for (const el of iter) {
        fn(el);

        if (Date.now() - time > execDuration) {
            yield;
            time = Date.now();
        }
    }
}

async function executor(iter, value) {
    await sleep(sleepDuration);

    let 
        res         = iter.next(value),
        promisified = Promise.resolve(res);

    if (res.done) return promisified;

    return promisified
        .then((res) => {
            return executor(iter, res.value);
        })

        .catch((err) => {
            if (typeof iter.throw === 'function') {
                res = iter.throw(err)
            }

            if (res.done) return res.value;

            return executor(iter, res.value);
        })
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}