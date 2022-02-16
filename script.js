$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 10){
          $('.navbar').addClass("sticky");
      }else{
          $('.navbar').removeClass("sticky");
      }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
        
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student", "Recruitment Researcher"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Student", "Recruitment Researcher"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

const form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      const status = document.getElementById("my-form-status");
      const data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)





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
  
