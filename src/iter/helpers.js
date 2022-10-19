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

const isLowSurrogate = (char) => surrogate.low.min <= char && char <= surrogate.low.max;

const isHightSurrogate = (char) => surrogate.high.min <= char && char <= surrogate.high.max;