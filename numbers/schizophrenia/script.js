const input = document.getElementById('input');
const resultElement = document.getElementById('result');

function analyzeNumber() {
    const val = BigInt(document.getElementById("input").value);
    const resultElement = document.getElementById("result");

    if (val <= 0n) {
        resultElement.textContent = "Please enter a positive integer.";
        return;
    }

    const bigNum = schizophreniseBig(val);
    const sqrtText = bigIntSqrtDecimal(bigNum, 200); // 200 digits after decimal
    resultElement.textContent = sqrtText;
}

let result = schizophrenise(number);
result = Math.sqrt(result);
resultElement.textContent = result;
resultElement.classList.add('success');
resultElement.classList.remove('warn');

}

function schizophreniseBig(n) {
    let result = 0 n;
    for (let i = 1 n; i <= n; i++) {
        let len = BigInt(i.toString().length);
        result = result * 10n ** len + i;
    }
    return result;
}

function bigIntSqrt(value) {
    if (value < 0n) throw new Error("Negative value");
    if (value < 2n) return value;
    let low = 1n,
        high = value;
    while (low <= high) {
        let mid = (low + high) >> 1n;
        let midSq = mid * mid;
        if (midSq === value) return mid;
        if (midSq < value) low = mid + 1n;
        else high = mid - 1n;
    }
    return high;
}

function bigIntSqrtDecimal(n, digits) {
    const intPart = bigIntSqrt(n);
    let remainder = n - intPart * intPart;
    let decimal = "";
    for (let i = 0; i < digits; i++) {
        remainder *= 100n; // bring down two zeros for sqrt long division
        let x = 0 n;
        let candidate = 0n;
        const p = intPart * 2n * 10n ** BigInt(i) + 0n;
        for (let d = 9n; d >= 0n; d--) {
            const test = (p + d) * d;
            if (test <= remainder) {
                x = d;
                candidate = test;
                break;
            }
        }
        remainder -= candidate;
        decimal += x.toString();
    }
    return intPart.toString() + "." + decimal;
}
