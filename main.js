window.addEventListener("load", () => {
  if (!localStorage.hasOwnProperty("pass")) {
    document.location.href = "./set-pass.html";
  }
});

const pass = localStorage.getItem("pass");

const body = document.querySelector("body");
const form = document.querySelector(".form");
const inputBlock = document.querySelector(".input-block");
const submit = document.querySelector(".submit");
const formError = document.querySelector(".form-error");
const clearPass = document.querySelector(".clear");

for (let i = 0; i < pass.length; i++) {
  let input = document.createElement("input");
  input.setAttribute("maxlength", 1);
  input.setAttribute("class", "input");
  if (i == pass.length - 1) input.setAttribute("autofocus", true);
  else input.setAttribute("disabled", true);
  inputBlock.prepend(input);
}

let reg = new RegExp("^\\d+$");

form.addEventListener("keypress", (event) => {
  formError.textContent = "";
  event.preventDefault();
  if (reg.test(event.key)) {
    event.target.value = event.key;
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.removeAttribute("disabled");
      event.target.nextElementSibling.focus();
    }
  } else {
    formError.textContent = "Пароль может содержать только числа";
  }

  if (inputBlock.lastElementChild.value != "") {
    submit.removeAttribute("disabled");
  }
});

form.addEventListener("keydown", (event) => {
  if (event.key == "Backspace") {
    if (event.target.previousElementSibling) {
      event.target.value = "";
      event.target.setAttribute("disabled", true);
      event.target.previousElementSibling.focus();
    }

    submit.setAttribute("disabled", true);
  }
});

const inputs = document.querySelectorAll(".input");

form.addEventListener("paste", (e) => {
  formError.textContent = "";

  e.preventDefault();
  let data = e.clipboardData.getData("text/plain");
  for (let j = 0; j < data.length; j++) {
    console.log(inputs[j + 1]);

    inputs[j].value = data[j];
    if (inputs[j + 1]) {
      inputs[j + 1].removeAttribute("disabled");
    }
  }
  if (!reg.test(data)) {
    formError.textContent = "Пароль может содержать только числа";
  }

  if (inputBlock.lastElementChild.value != "") {
    submit.removeAttribute("disabled");
  }
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  let inputsArray = [];
  Array.from(inputs).forEach((element) => {
    inputsArray.push(element.value);
  });
  let string = inputsArray.join("");

  if (string == localStorage.getItem("pass")) {
    createModal("Верный пароль");
    
  } else createModal("Неверный пароль");
});

clearPass.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.removeItem("pass");
  document.location.href = "./set-pass.html";
});

function createModal(text) {
  event.stopPropagation();
  console.log("create")

  const modal = document.createElement("div");


  modal.classList.add("modal");
  modal.textContent = text;

  const modalClose = document.createElement("a");
  modalClose.classList.add("modal-close");
  modalClose.setAttribute("href", "#");
  modalClose.textContent = "X";
  modal.appendChild(modalClose);

  form.appendChild(modal);

  modalClose.addEventListener("click", () => {
    form.removeChild(modal);
  });

  body.addEventListener("click", closeModal);


  setTimeout(() => {
    
    if(document.querySelector(".modal")) {
    form.removeChild(modal);
    body.removeEventListener("click", closeModal);
    }
  }, 3000);
}

function closeModal(event) {
 
  console.log("close")
  if (event.target!=document.querySelector(".modal")) {
    body.removeEventListener("click", closeModal);
    form.removeChild(document.querySelector(".modal"));
  }
}
