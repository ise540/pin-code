window.addEventListener("load", () => {
    if (localStorage.hasOwnProperty("pass")) {
      document.location.href = "./index.html";
    }
  });

const setPassButton = document.querySelector(".set-pass-button");
const setPassInput = document.querySelector(".set-pass-input");
const setPassError = document.querySelector(".set-pass-error");


function checkPass (text) {
    let reg = new RegExp('^\\d+$')
    return reg.test(text);
}

setPassButton.addEventListener("click", ()=>{
    setPassError.textContent = "";
    if(!checkPass(setPassInput.value)) {
        setPassError.textContent = "Пароль может содержать только числа";
    } 
    else {
        localStorage.setItem("pass", setPassInput.value);
        document.location.href = "./index.html";
    }
})