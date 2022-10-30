// 1 задание
export const isLatinNumericOrDollar = (str) => /^[a-z\p{Number}$_]+$/ui.test(str);

// 2 задание
'foo    bla.bar,gd;4'
export const split = (str) => str.split(/ +|\.|,|;/g);

// 3 задание
export function format(str, replacer) {
    return str.replace(/\${(?<key>\w+?)}/g, (...args) => {
        return replacer[args[args.length - 1].key]
    })
}

// 4 задание

export function normalize(str) {
    return str.replace(/(\w{1,3}?)\1+/g, '$1')
}

// 5 задание

export function calc(expression) {
    return expression.replace(/[(\d\-][\d\+\-\*\/\(\) ]+[\d)]/mig, (...args) => 
        Function('', `return ${args[0]}`)()
    )
}