/* NAVBAR AND SCROLL PAGE AND LOGIN BUTTON */

const loginBtn = document.querySelector(".login-button");
const loginBox = document.getElementById("login-box");

const loginBoxEmail = document.getElementById("login-box-email");
const loginBoxPassword = document.getElementById("login-box-password");
const submitLogin = document.getElementById("submit-login");

loginBtn.addEventListener("click", openLoginDialog);

document.body.addEventListener("click", (e) => {
  if (loginBtn !== e.target && !e.path.some((elem) => loginBox === elem)) {
    closeLoginDialog();
  }
});

function openLoginDialog() {
  if (window.innerWidth > 1099) {
    loginBox.style.opacity = 1;
    loginBox.style.pointerEvents = "auto";
  } else {
    window.location = "/login";
  }
}

function closeLoginDialog() {
  loginBox.style.opacity = 0;
  loginBox.style.pointerEvents = "none";
}

submitLogin.addEventListener("click", async (e) => {
  e.preventDefault();

  const resp = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: loginBoxEmail.value,
      password: loginBoxPassword.value,
    }),
  });

  if (resp.status === 400) {
    alert(await resp.text());
    return;
  }

  if (resp.status === 200) {
    window.location = "index";
  }
});

/* REGISTRATION PAGE */

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirm-email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const gender = document.getElementById("gender");
const submitBtn = document.getElementById("submitBtn");

const inputs = {
  "first-name": {
    message: "At least 2 letters",
  },
  "last-name": {
    message: "At least 2 letters",
  },
  email: {
    message: "Enter a valid email address",
  },
  "confirm-email": {
    message: "Enter email again",
  },
  password: {
    message: "At least 8 letters please",
  },
  "confirm-password": {
    message: "Enter the password again",
  },
};

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (checkForm(e)) {
    const response = await fetch("/users/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        gender: gender.value,
      }),
    });

    if (response.status === 400) {
      alert(await response.text());
      return;
    }

    if (response.status === 200) {
      alert("Succeeded");
      window.location = "/login";
    }
  }
});

firstName.addEventListener("focusin", (e) => {
  inputsMessagesManager(e, inputs);
});

firstName.addEventListener("focusout", () => {
  document.getElementById("msg").remove();
});

lastName.addEventListener("focusin", (e) => {
  inputsMessagesManager(e, inputs);
});

lastName.addEventListener("focusout", () => {
  document.getElementById("msg").remove();
});

email.addEventListener("focusin", (e) => {
  inputsMessagesManager(e, inputs);
});

email.addEventListener("focusout", () => {
  document.getElementById("msg").remove();
});

confirmEmail.addEventListener("focusin", (e) => {
  inputsMessagesManager(e, inputs);
});

confirmEmail.addEventListener("focusout", () => {
  document.getElementById("msg").remove();
});

password.addEventListener("focusin", (e) => {
  inputsMessagesManager(e, inputs);
});

password.addEventListener("focusout", () => {
  document.getElementById("msg").remove();
});

confirmPassword.addEventListener("focusin", (e) => {
  inputsMessagesManager(e, inputs);
});

confirmPassword.addEventListener("focusout", () => {
  document.getElementById("msg").remove();
});

function checkForm(e) {
  if (email.value !== confirmEmail.value) {
    e.preventDefault();
    alert("Email and confirm email aren't match");
    return false;
  } else if (password.value !== confirmPassword.value) {
    e.preventDefault();
    alert("Password and confirm password aren't match");
    return false;
  }
  return true;
}

function inputsMessagesManager(e, inputs) {
  if (window.innerWidth > 991) {
    let msg = document.createElement("div");
    msg.id = "msg";
    msg.style.color = "yellow";
    msg.innerHTML = inputs[e.target.id].message;
    e.target.parentNode.appendChild(msg);
  }
}
