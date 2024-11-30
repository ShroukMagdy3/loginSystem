var nameInput = document.querySelector("#inputName");
var emailInput = document.querySelector("#inputEmail");
var inputPass = document.querySelector("#inputPass");
var emailLog = document.querySelector("#emailLog");
var passLog = document.querySelector("#passLog");
var btnSign = document.querySelector("#btnSign");
var anchor1 = document.querySelector("#anchor1");
var anchor2 = document.querySelector("#anchor2");
var signIn = document.querySelector("#signIn");
var signUp = document.querySelector("#signUp");
var loginBtn = document.querySelector("#loginBtn");
var welcome = document.querySelector("#welcome");
var logOut = document.querySelector("#logOut");
var userContainer = [];

var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passRegex = /^[0-9]+$/;
var nameRegex = /^[A-Za-z]+$/;

if (localStorage.getItem("users") != null) {
  userContainer = JSON.parse(localStorage.getItem("users"));
  console.log("Loaded users:", userContainer);
}
btnSign.addEventListener("click", function () {
  addToArray();
  clear();
});
loginBtn.addEventListener("click", function () {
  search();
  clearLogIn();
});

logOut.addEventListener("click", function () {
  signIn.classList.replace("d-none", "d-block");
  welcome.classList.replace("d-block", "d-none");
});

anchor1.addEventListener("click", function () {
  signUp.classList.replace("d-none", "d-block");
  signIn.classList.add("d-none");
});
anchor2.addEventListener("click", function () {
  signIn.classList.replace("d-none", "d-block");
  signUp.classList.replace("d-block", "d-none");
});

function addToArray() {
    if (
      nameRegex.test(nameInput.value) &&
      emailRegex.test(emailInput.value) &&
      passRegex.test(inputPass.value)
    ) {
      var emailExists = false; 
      for (var i = 0; i < userContainer.length; i++) {
        if (userContainer[i].email == emailInput.value) {
          emailExists = true; 
          document.querySelector("#mess").innerHTML = `This email is already registered.`;
          document.querySelector("#mess").classList.remove("text-success");
          document.querySelector("#mess").classList.add("text-danger");
          break; 
        }
      }
  
      if (!emailExists) {
        var user = {
          name: nameInput.value,
          email: emailInput.value,
          pass: inputPass.value,
        };
        userContainer.push(user);
        console.log(userContainer);
        localStorage.setItem("users", JSON.stringify(userContainer)); 
        document.querySelector("#mess").innerHTML = `Successful Registration`;
        document.querySelector("#mess").classList.remove("text-danger");
        document.querySelector("#mess").classList.add("text-success");
      }
  
    } else {
      document.querySelector("#mess").innerHTML = `Enter valid inputs`;
      document.querySelector("#mess").classList.remove("text-success");
      document.querySelector("#mess").classList.add("text-danger");
    }
  }
  
function search() {
  var isValid = false;
  for (var i = 0; i < userContainer.length; i++) {
    if (
      emailLog.value == userContainer[i].email &&
      passLog.value == userContainer[i].pass
    ) {
      welcome.classList.replace("d-none", "d-block");
      signIn.classList.add("d-none");
      signUp.classList.add("d-none");
      document.querySelector(
        "#para"
      ).innerHTML = `Welcome ${userContainer[i].name}`;
      isValid = true;
      break;
    }
  }
  if (!isValid) {
    document
      .querySelector("#warningMess")
      .classList.replace("d-none", "d-block");
  }
}
emailLog.addEventListener("focus", function () {
  document.querySelector("#warningMess").classList.replace("d-block", "d-none");
});

passLog.addEventListener("focus", function () {
  document.querySelector("#warningMess").classList.replace("d-block", "d-none");
});

function clear() {
  nameInput.value = "";
  emailInput.value = "";
  inputPass.value = "";
}

function clearLogIn() {
  emailLog.value = "";
  passLog.value = "";
}

document.body.addEventListener("keydown", function (e) {
  if (e.code == "Enter") {
    search();
    clearLogIn();
  }
  if (e.code == "Escape") {
    signIn.classList.replace("d-none", "d-block");
    welcome.classList.replace("d-block", "d-none");
  }
});
