/* NAVBAR AND SCROLL PAGE AND LOGIN BUTTON */

const cookie = document.cookie;

if (cookie) {
  const logoutBtns = [...document.getElementsByClassName("logout-button")];
  const favoritesBtn = document.getElementById("favorites-btn");

  for (const logoutBtn of logoutBtns) {
    logoutBtn.addEventListener("click", () => {
      alert("logging out");
      window.location = "/logout";
    });
  }

  favoritesBtn.addEventListener("click", () => {
    window.location = "/favorites";
  });
} else {
  const loginBtns = [...document.getElementsByClassName("login-button")];
  const loginBox = document.getElementById("login-box");
  const getStartedBtn = document.getElementById("get-started-btn");

  const loginBoxEmail = document.getElementById("login-box-email");
  const loginBoxPassword = document.getElementById("login-box-password");
  const submitLogin = document.getElementById("submit-login");

  for (const loginBtn of loginBtns) {
    loginBtn.addEventListener("click", openLoginDialog);
  }

  document.body.addEventListener("click", (e) => {
    if (
      !loginBtns.includes(e.target) &&
      !e.path.some((elem) => loginBox === elem)
    ) {
      closeLoginDialog();
    }
  });

  getStartedBtn.addEventListener("click", () => {
    window.location = "/registration";
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
      location.reload();
    }
  });
}
