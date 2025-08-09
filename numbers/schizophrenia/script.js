const input = document.getElementById('input');
const resultElement = document.getElementById('result');

function analyzeNumber() {
    const val = BigInt(document.getElementById("input").value);
    const resultElement = document.getElementById("result");

    if (val <= 0 n) {
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
        result = result * 10 n ** len + i;
    }
    return result;
}

function bigIntSqrt(value) {
    if (value < 0 n) throw new Error("Negative value");
    if (value < 2 n) return value;
    let low = 1 n,
        high = value;
    while (low <= high) {
        let mid = (low + high) >> 1 n;
        let midSq = mid * mid;
        if (midSq === value) return mid;
        if (midSq < value) low = mid + 1 n;
        else high = mid - 1 n;
    }
    return high;
}

function bigIntSqrtDecimal(n, digits) {
    const intPart = bigIntSqrt(n);
    let remainder = n - intPart * intPart;
    let decimal = "";
    for (let i = 0; i < digits; i++) {
        remainder *= 100 n; // bring down two zeros for sqrt long division
        let x = 0 n;
        let candidate = 0 n;
        const p = intPart * 2 n * 10 n ** BigInt(i) + 0 n;
        for (let d = 9 n; d >= 0 n; d--) {
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
