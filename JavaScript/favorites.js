const nav = document.querySelector(".navbar");
const logoutBtn = document.querySelector(".logout-button");
const main = document.getElementById("main-content");
const favoriteBtns = document.getElementsByClassName("favorite-btn");

window.addEventListener("scroll", () => {
  if (innerWidth >= 992) {
    nav.classList.toggle("slide-nav", window.scrollY > 0);
  }
});

logoutBtn.addEventListener("click", () => {
  alert("logging out");
  window.location = "/logout";
});

for (let button of favoriteBtns) {
  button.addEventListener("click", async (e) => {
    const response = await fetch("/favorites/deleteOne", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: e.target.id,
      }),
    });

    if (response.status === 400) {
      alert(await response.text());
    }

    if (response.status === 200) {
      alert(await response.text());
    }
  });
}
