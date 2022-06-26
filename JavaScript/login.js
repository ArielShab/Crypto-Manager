/* NAVBAR AND SCROLL PAGE AND LOGIN BUTTON */

const loginBtn = document.querySelector(".login-button");
const loginBox = document.getElementById("login-box");
const loginBoxEmail = document.getElementById("login-box-email");
const loginBoxPassword = document.getElementById("login-box-password");
const submitLogin = document.getElementById("submit-login");

const password = document.getElementById("password");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");

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

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const resp = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  if (resp.status === 400) {
    alert(await resp.text());
    return;
  }

  if (resp.status === 200) {
    window.location = "/index";
  }
});

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
    window.location = "/index";
  }
});
