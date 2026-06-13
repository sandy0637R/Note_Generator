const display = document.querySelector("#display");
const type = document.querySelector("#type");

const pngBtn = document.querySelector("#pngBtn");
const pdfBtn = document.querySelector("#pdfBtn");

const themeToggle = document.querySelector("#themeToggle");

// ----------------------
// Auto Numbering
// ----------------------

type.value = "1. ";
display.textContent = type.value;

type.addEventListener("input", () => {
  display.textContent = type.value;
});

type.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const lines = type.value.split("\n");
    const nextNumber = lines.length + 1;

    type.value += `\n${nextNumber}. `;

    display.textContent = type.value;
  }
});

// ----------------------
// Theme Toggle
// ----------------------

let darkMode = false;

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;

  document.body.classList.toggle("dark-mode");

  if (darkMode) {
    display.classList.remove("bg-white", "text-dark");

    display.classList.add("bg-dark", "text-white");

    themeToggle.innerHTML = '<i class="bi bi-circle-half me-2"></i>Theme';

    themeToggle.classList.remove("btn-dark");

    themeToggle.classList.add("btn-secondary");
  } else {
    display.classList.remove("bg-dark", "text-white");

    display.classList.add("bg-white", "text-dark");

    themeToggle.innerHTML = '<i class="bi bi-circle-half me-2"></i>Theme';

    themeToggle.classList.remove("btn-secondary");

    themeToggle.classList.add("btn-dark");
  }
});

// ----------------------
// PNG Download
// ----------------------

pngBtn.addEventListener("click", () => {
  html2canvas(display, {
    scale: 2,
    useCORS: true,
  }).then((canvas) => {
    const link = document.createElement("a");

    link.download = "note.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
  });
});

// ----------------------
// PDF Download
// ----------------------

pdfBtn.addEventListener("click", () => {
  html2canvas(display, {
    scale: 2,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 190;

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);

    pdf.save("note.pdf");
  });
});
