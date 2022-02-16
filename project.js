let page = 0;

const articles = document.querySelectorAll("main article");
const indicatorsWrap = document.querySelector("main .indicators");
const buttonWrap = document.querySelector("header .btn-wrap");
const buttons = Array.from(buttonWrap.children);

const toggleTransition = (el) => {
  ["transition", "show"].forEach((cl) => el.classList.toggle(cl));
};

indicatorsWrap.append(
  ...Array.from(articles).map((_, i) =>
    Object.assign(document.createElement("div"), {
      className: i === page ? "selected" : ""
    })
  )
);

buttonWrap.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const prevPage = page;
    buttons.forEach((btn) => (btn.disabled = true));
    toggleTransition(articles[prevPage]);
    indicatorsWrap.children[prevPage].classList.remove("selected");

    setTimeout(() => {
      articles[prevPage].classList.remove("transition");
    }, 600);

    if (e.target.textContent === "Next") {
      if (++page > articles.length - 1) page = 0;
    } else {
      if (--page < 0) page = articles.length - 1;
    }
    console.log(prevPage, page);

    setTimeout(() => {
      articles[page].classList.add("transition");
      indicatorsWrap.children[page].classList.add("selected");
    }, 600);
    setTimeout(() => {
      toggleTransition(articles[page]);
      buttons.forEach((btn) => (btn.disabled = false));
    }, 900);
  },
  { passive: true }
);
  
