const surrogate = {
    low: {
        min: 55296,
        max: 56319
    },
    high: {
        min: 56320,
        max: 57343
    }
}

export function isLowSurrogate(char) {
    return surrogate.low.min <= char && char <= surrogate.low.max
}

export function isHightSurrogate(char) { 
    return surrogate.high.min <= char && char <= surrogate.high.max
}