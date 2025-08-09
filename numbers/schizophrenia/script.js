const input = document.getElementById('input');
const resultElement = document.getElementById('result');

function analyzeNumber() {
  const number = parseFloat(input.value);
  
  if (isNaN(number) || !Number.isInteger(number) || number <= 0) {
    resultElement.textContent = "Please enter a positive integer.";
    return;
  }
  
  let result = schizophrenise(number);
  result = Math.sqrt(result);
  resultElement.textContent = result;
}

function schizophrenise(number) {
  if (number == 0) {
    return 0;
  }
  return 10 * schizophrenise(number - 1) + number;
}
