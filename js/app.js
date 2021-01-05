function insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

function UI() {}

// Llenar los años
UI.prototype.SetYears = () => {
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

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.SetYears();
});
