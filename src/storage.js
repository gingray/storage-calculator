import Alpine from "alpinejs";
import humanFormat from "human-format";

const storeUnit = {
    'kb': 1024,
    'mb': 1024 * 1024,
    'gb': 1024 * 1024 * 1024,
}
const timeUnit = {
    'seconds': 1,
    'minutes': 60,
    'hours': 60 * 60,
    'days': 60 * 60 * 24,
    'months': 60 * 60 * 24 * 30,
    'years': 60 * 60 * 24 * 30 * 365,
}
const parseNumber = (value) => {
    if (value !== null && value !== undefined && value !== '') {
        return parseFloat(value)
    }
    return 0
}

const binaryScale1000 = (value) => {
    const binaryScale = humanFormat.Scale.create(["", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"], 1000);
    return humanFormat(value, {scale: binaryScale});
}

const binaryScale1024 = (value) => {
    return humanFormat(value, {
        scale: "binary",
        unit: "B",
    });
}

const priceMap = {
    "S3 Standard": [23, 60 * 60 *24 * 30, Math.pow(10, 3 * 4)],
    "S3 Intelligent-Tiering": [18, 60 * 60 *24 * 30, Math.pow(10, 3 * 4)],
    "S3 Standard-IA": [12.5, 60 * 60 *24 * 30, Math.pow(10, 3 * 4)],
    "S3 One Zone-IA": [10, 60 * 60 *24 * 30, Math.pow(10, 3 * 4)],
    "S3 Glacier Instant": [4, 60 * 60 *24 * 30, Math.pow(10, 3 * 4)],
    "S3 Glacier Flexible": [3.6, 60 * 60 *24 * 30, Math.pow(10, 3 * 4)],
    "S3 Glacier Deep Archive": [1, 60 * 60 *24 * 30, Math.pow(10, 3 * 4)],
}
const priceAWS = (storeData, time, period) => {
    return Object.keys(priceMap).map(key => {
        const priceTimeMultiplier = time / priceMap[key][1]
        const tbValue = (storeData / priceMap[key][2]) * priceTimeMultiplier
        return [period, key, `${(tbValue * priceMap[key][0]).toFixed(2)}$`]
    })
}

const scaleTime = (value, converter1000, converter1024) => {
    if (value <= 0) {
        return []
    }
    return [['Day', 60 * 60 * 24], ['Month',60 * 60 * 24 * 30], ['Year', 60 * 60 * 24 * 365]].map(data => {
        const calcedValue = value * data[1]
        return [data[0], converter1000(calcedValue), converter1024(calcedValue), priceAWS(calcedValue, data[1], data[0])];
    })
}

const initStorage = () => {
    Alpine.store('data', {
        value: null,
        storeUnit: 'kb',
        perTimeUnit: 'seconds',
        awsPrices: {},
        calculateStore() {
            const data = (parseNumber(this.value) * storeUnit[this.storeUnit]) / timeUnit[this.perTimeUnit]
            const values = scaleTime(data, binaryScale1000, binaryScale1024)
            this.awsPrices = {}
            values.reduce((acc, cur) => {
                cur[3].forEach((value) => {
                    acc[value[1]] = acc[value[1]] || []
                    acc[value[1]].push(`${value[2]} (${cur[1]}/${cur[2]})`)
                })
                return acc
            }, this.awsPrices)
            console.log(values)
            console.log(this.awsPrices)
            return values
        }
    })
}

export {initStorage, storeUnit}