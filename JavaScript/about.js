/* NAVBAR AND SCROLL PAGE AND LOGIN BUTTON */

const cookie = document.cookie;

const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (innerWidth >= 992) {
    nav.classList.toggle("slide-nav", window.scrollY > 0);
  }
});

if (cookie) {
  const logoutBtn = document.querySelector(".logout-button");

  logoutBtn.addEventListener("click", () => {
    alert("logging out");
    window.location = "/logout";
  });
} else {
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
      window.location = "/index";
    }
  });
}
