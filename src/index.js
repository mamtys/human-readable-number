module.exports = function toReadable (number) {
    const dictionary = {
        0: 'zero', 
        1: 'one', 
        2: 'two', 
        3: 'three', 
        4: 'four', 
        5: 'five', 
        6: 'six', 
        7: 'seven', 
        8: 'eight', 
        9: 'nine', 
        10: 'ten', 
        11: 'eleven', 
        12: 'twelve', 
        13: 'thirteen', 
        14: 'fourteen',
        15: 'fifteen', 
        16: 'sixteen', 
        17: 'seventeen', 
        18: 'eighteen', 
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety', 
    };
    const powersOfTen = {
        2: 'hundred',
        3: 'thousand',
        6: 'million',
        9: 'milliard',
        12: 'billion',
        15: 'billiard'
    }
    let readable = '';

    if (number < 0) {
        readable += 'minus ';
        number = -number;
    }

    if (dictionary[number]) {
        return dictionary[number];
    }

    let [beforeDot, afterDot] = String(number).split('.');
    let integerPart = BigInt(beforeDot); 
    readable += processIntegerPart(integerPart, dictionary, powersOfTen);

    if (afterDot) {
        let decimalPart = String(afterDot).split('').map(Number);
        readable += processDecimalPart(decimalPart, dictionary);
    }
    
    return readable.trim();
}

const processIntegerPart = (bigInt, dictionary, scale) => {
    let buffer='';
    for (let i = 0; bigInt > 0; i+=3) {
        let n = bigInt % 1000n;
        let tmp = '';
        if (n > 99n) {
            tmp += `${dictionary[Number(n/100n)]} ${scale[2]} `;
            n = n % 100n;
        }

        if (n > 0n) {
            tmp += `${dictionary[n] || `${dictionary[Number((n/10n)*10n)]} ${dictionary[Number(n%10n)]}`} `;
        }

        if (scale[i]) {
            tmp += `${scale[i]} `     
        }
        
        buffer = tmp + buffer;
        bigInt = bigInt/1000n;
    }

    return buffer;
}

const processDecimalPart = (arr, dictionary) => {
    let buffer = 'point ';
    for (let el of arr) {
        buffer += `${dictionary[el]}`;
    }
    return buffer;
}

console.log(module.exports(883), Number.MAX_SAFE_INTEGER/10);