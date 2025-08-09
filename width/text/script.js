function measureTextWidth() {
  const input = document.getElementById("textInput");
  const widthDisplay = document.getElementById("textWidth");
  const span = document.getElementById("textWidthSpan");

  span.style.visibility = "hidden";
  span.style.whiteSpace = "pre";
  span.style.position = "absolute";
  span.style.font = window.getComputedStyle(input).font;

  span.textContent = input.value || ""; // set the same text as input
  const width = span.offsetWidth;

  widthDisplay.textContent = width;
}

window.addEventListener("DOMContentLoaded", measureTextWidth);
