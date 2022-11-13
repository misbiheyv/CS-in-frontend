// Task 1

const sleep = (ms, payload) => new Promise(res => setTimeout(res, ms, payload));

// Task 2

function timeout(promise, ms) {
    return Promise.race([promise, sleep(ms, new Error('timeout'))])
        .then(res => {
            if (res instanceof Error && res.message === 'timeout')
                return Promise.reject(res)

            return Promise.resolve(res)
        })
}

// timeout(sleep(500, 'success'), 1000)
//     .then(res => console.log('res', res))
//     .catch(err => console.log('err', err));


// Task 3

function setImmediatePromisify(fn, ...args) {
    const obj = {
        aborted: false,
        fn: Promise.resolve().then(() => {
            if (!obj.aborted) {
                fn(...args);
            }
        })
    };

    return obj;
}

const clearImmediatePromisified = el => el.aborted = true;

// const int = setImmediatePromisify((...args) => {
//     console.log('immediately promise executing immediate', [...args]);
// });

// clearImmediatePromisified(int);


// Task 4

function promisify(fn) {
    return (...args) => {
        return new Promise((res, rej) => {
            fn(...args, (err, data) => {
                if (err) rej(err);
                res(data);
            })
        }) 
    }
}

function readFile(file, cb) {
    cb(null, 'fileContent');
}

// promisify(readFile)('my-file.txt').then(console.log).catch(console.error);