function insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

function interface() {}

// Llenar los años
interface.prototype.SetYears = () => {
  const max = new Date().getFullYear();
  min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let index = max; index > min; index--) {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = index;
    selectYear.appendChild(option);
  }
};

const ui = new interface();

document.addEventListener("DOMContentLoaded", () => {
  ui.SetYears();
});

eventListener();

function eventListener() {
  const form = document.querySelector("#cotizar-seguro");
  form.addEventListener("submit", quoteInsurance);
}

function quoteInsurance(e) {
  e.preventDefault();

  const brand = document.querySelector("#marca").value;

  const year = document.querySelector("#year").value;

  const type = document.querySelector('input[name="tipo"]:checked').value;

  if (brand === "") {
    console.log("no marca");
  } else {
    console.log("si valores");
  }

  console.log("brand " + brand + "year " + year + "type " + type);
}
