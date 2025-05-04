function drawShapes() {
  
  const input = document.getElementById('arrayInput').value;
  let shapes;
  
  try {
    shapes = JSON.parse(input);
    if (!Array.isArray(shapes) || shapes.some(s => !Array.isArray(s))) {
      alert("Each shape must be an array.");
      return;
    }
  }
  catch (e) {
    alert("Invalid JSON. Please enter a valid array.");
    return;
  }
  
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  shapes.forEach(shape => {
  const [type, color, mode, x, y, size1, size2, label, extra] = shape;

  ctx.save(); // Save canvas state BEFORE transformations

  let red = getRedDecimal(color);
  let green = getGreenDecimal(color);
  let blue = getBlueDecimal(color);

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

  if (type === "translation") {
    ctx.translate(x, y);
  } else if (type === "rotation") {
    ctx.rotate(x);
  }

  // draw shape only if it's not a transformation type
  if (["rect", "circle", "triangle", "ellipse", "line", "quadratic"].includes(type)) {
    if (type === "rect") {
      if (mode === "fill") ctx.fillRect(x, y, size1, size2);
      else ctx.strokeRect(x, y, size1, size2);
    } else if (type === "circle") {
      ctx.arc(x, y, size1, 0, Math.PI * 2);
      if (mode === "fill") ctx.fill();
      else ctx.stroke();
    } else if (type === "triangle") {
      const height = size2 || size1;
      ctx.moveTo(x, y);
      ctx.lineTo(x + size1 / 2, y + height);
      ctx.lineTo(x - size1 / 2, y + height);
      ctx.closePath();
      if (mode === "fill") ctx.fill();
      else ctx.stroke();
    } else if (type === "ellipse") {
      ctx.ellipse(x, y, size1, size2, 0, 0, Math.PI * 2);
      if (mode === "fill") ctx.fill();
      else ctx.stroke();
    } else if (type === "line") {
      ctx.moveTo(x, y);
      ctx.lineTo(size1, size2);
      ctx.stroke();
    } else if (type === "quadratic") {
      if (!arrayLengthCheck(extra, 2)) {
        alert("Quadratic shape is missing control points.");
        ctx.restore();
        return;
      }
      const [controlX, controlY] = extra;
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(controlX, controlY, size1, size2);
      ctx.stroke();
    }

    // Add label
    if (label) {
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.fillText(label, x + 5, y - 5);
    }
    ctx.restore(); // I presume it needs to be here?
  }

  
});

}

function arrayLengthCheck(array, length) {
  if (!Array.isArray(array) || array.length < length) {
    return false;
  }
  return true;
}
/* let code die

        function getLabelContent(label) { // maybe make these data-driven?

            switch (label) {

                case 1: return "tadi web";

                case 2: return "sample label";

                case 3: return "rectangle";

                case 4: return "expected a dynamic value?";

                case 5: return "the floor is type conversion";

                case 6: return "you had me at 'hello world'";

                case 7: return "normalise sharing scrappy fiddles";

                case 8: return "opt out of facial recognition";

                case 9: return "#pastagang";

                case 10: return "it's surprisingly simple";

                case 11: return "it's so embarassing to burn your tongue";

                case 12: return "I love it when my gif has volume controls";

                case 13: return "please add gifs";

                case 14: return "trans rights";

                case 15: return "login automatically";

                case 16: return "constructive feedback";

                case 17: return "there are no mistakes";

                case 18: return "jam programming";

                case 19: return "try it out";

                case 20: return "available at pondiverse";

                case 21: return "by the way does this support emojis 😀😃";

                case 22: return "null pointer reference";

                case 23: return "please add gifs";

                case 24: return "embrace death";

                case 25: return "this is so tadi";

                default: return "what";

            }

        }

        function solveType(type) {

          switch (type) {

                case 1: return "rect";

                case 2: return "circle";

                case 3: return "triangle";

                case 4: return "ellipse";

                case 5: return "line";

                case 6: return "quadratic";

                default: return "rect";

          }

        }

      function solveMode(mode) {

          switch (mode) {

                case 1: return "fill";

                case 2: return "stroke";

                default: return "fill";

          }

      }

      */
function getRedDecimal(color) {
  return (color >> 16) & 0xFF;
}

function getGreenDecimal(color) {
  return (color >> 8) & 0xFF;
}

function getBlueDecimal(color) {
  return color & 0xFF;
}
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const creationUrl = urlParams.get("creation");
  
  if (creationUrl) {
    fetch(creationUrl).then(response => response.json()).then(data => {
      if (data && data.type === "arrayer" && data.data) {
        document.getElementById("arrayInput").value = data.data;
        drawShapes();
      }
      else {
        console.warn("Invalid or missing data in creation.");
      }
    }).catch(err => {
      console.error("Failed to load creation:", err);
    });
  }
  
  addPondiverseButton(() => {
    return {
      type: "arrayer",
      data: document.getElementById("arrayInput").value,
      image: document.getElementById("myCanvas").toDataURL("image/png"),
    };
  });
});

function seeDocs() {
  alert("Documentation:\n\n[shape, colour, mode, x, y, width, height, (label)]\n\n Label is optional.");
}
