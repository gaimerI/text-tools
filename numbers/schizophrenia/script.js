const input = document.getElementById('input');
const resultElement = document.getElementById('result');

function analyzeNumber() {
    const valStr = input.value.trim();
    if (!/^\d+$/.test(valStr)) {
        resultElement.textContent = "Please enter a valid positive integer.";
        return;
    }

    const val = BigInt(valStr);

    if (val <= 0n) {
        resultElement.textContent = "Please enter a positive integer.";
        return;
    }

    const bigNum = schizophreniseBig(val);
    const sqrtText = bigIntSqrtDecimal(bigNum, 200); // 200 digits after decimal
    resultElement.textContent = sqrtText;
    resultElement.classList.add('success');
    resultElement.classList.remove('warn');
}

// Builds a big number by concatenating all integers from 1 to n (e.g., n=3 => 123)
function schizophreniseBig(n) {
    let result = 0n;
    for (let i = 1n; i <= n; i++) {
        const len = BigInt(i.toString().length);
        result = result * 10n ** len + i;
    }
    return result;
}

// Integer square root of a BigInt (floor of sqrt)
function bigIntSqrt(value) {
    if (value < 0n) throw new Error("Negative value");
    if (value < 2n) return value;
    let low = 1n,
        high = value;
    while (low <= high) {
        const mid = (low + high) >> 1n;
        const midSq = mid * mid;
        if (midSq === value) return mid;
        if (midSq < value) low = mid + 1n;
        else high = mid - 1n;
    }
    return high;
}

// Calculate sqrt with decimal digits by long division method
function bigIntSqrtDecimal(n, digits) {
    const intPart = bigIntSqrt(n);
    let remainder = n - intPart * intPart;
    let decimal = "";
    let divisor = intPart;

    for (let i = 0; i < digits; i++) {
        remainder *= 100n;
        let x = 0n;
        let candidate = 0n;

        // Calculate partial divisor: 2 * divisor * 10 + d
        const p = divisor * 20n;

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
        divisor = divisor * 10n + x;
    }

    return intPart.toString() + "." + decimal;
}
