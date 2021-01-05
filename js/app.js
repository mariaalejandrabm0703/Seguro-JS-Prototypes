//variables
const form = document.querySelector("#cotizar-seguro");

function insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
  this.value = 0;
}

insurance.prototype.quote = function () {
  switch (this.brand) {
    case "1":
      this.value = 200 * 1.15;
      break;
    case "2":
      this.value = 200 * 1.05;
      break;
    case "3":
      this.value = 200 * 1.35;
      break;

    default:
      this.value = 200 * 0;
      break;
  }

  // Diferencia por año
  const diferent = new Date().getFullYear() - this.year;
  this.value -= (diferent * 3 * this.value) / 100;

  // Por tipo de seguro
  if (this.type === "basico") {
    this.value = this.value + this.value * 0.3;
  } else {
    this.value = this.value + this.value * 0.5;
  }
};

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

// Mostrar mensaje del proceso
interface.prototype.showMessage = (mensaje, tipo) => {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  form.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

interface.prototype.showResult = (insurance) => {
  // Muestra el seguro cotizado y la información
  const result = document.querySelector("#resultado");
  let brand = "";
  switch (insurance.brand) {
    case "1":
      brand = "Americano";
      break;
    case "2":
      brand = "Asiatico";
      break;
    case "3":
      brand = "Europeo";
      break;
  }
  // Crear un div
  const div = document.createElement("div");
  div.classList.add("mt-10");
  // Insertar la informacion
  div.innerHTML = `
          <p class='header'>Tu Resumen: </p>
          <p class="font-bold">Marca: <span class="font-normal"> ${brand} </span> </p>
          <p class="font-bold">Año: <span class="font-normal"> ${insurance.year} </span> </p>
          <p class="font-bold">Tipo: <span class="font-normal"> ${insurance.type} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal"> $ ${insurance.value} </span> </p>
     `;

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    resultado.appendChild(div);
  }, 3000);
};

const ui = new interface();

document.addEventListener("DOMContentLoaded", () => {
  ui.SetYears();
});

eventListener();

function eventListener() {
  form.addEventListener("submit", quoteInsurance);
}

function quoteInsurance(e) {
  e.preventDefault();

  const brand = document.querySelector("#marca").value;

  const year = document.querySelector("#year").value;

  const type = document.querySelector('input[name="tipo"]:checked').value;

  if (brand === "") {
    ui.showMessage("Se debe ingresar la marca.", "error");
    return;
  } else {
    ui.showMessage("Cotizando...", "correcto");
  }
  console.log("lo elimina");
  // Ocultar cotizaciones previas
  const results = form.querySelector("#resultado div");

  if (results != null) {
    results.remove();
  }
  const insu = new insurance(brand, year, type);
  insu.quote();
  ui.showResult(insu);
}
