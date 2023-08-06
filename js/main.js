let landing = document.querySelector(".landing");
let imgs = ["01.png", "02.jpg", "03.jpg", "04.jpg"];
let settingsBox = document.querySelector(".settings-box");
let gearIcon = document.querySelector(".gear-box i");
animateSkills();

// Show Settings Box:
gearIcon.addEventListener("click", () => {
  gearIcon.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
});

// Check If Color In LocalStorage:
let favColor = localStorage.getItem("FavouriteColor");
if (favColor !== null) {
  document.documentElement.style.setProperty("--main-color", favColor);

  //Remove active class from all lis:
  document.querySelectorAll(".colors li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === favColor) {
      ele.classList.add("active");
    }
  });
}

//Change Page Color:
let colorsList = document.querySelectorAll(".settings .color .colors li ");
colorsList.forEach((li) => {
  //Click EventListener
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    //Remove active class from all lis:
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });

    //Add active class to target element:
    e.target.classList.add("active");

    //Set Favourite Color To LocalStorage
    localStorage.setItem("FavouriteColor", e.target.dataset.color);
  });
});

let choice = true;
let imgInterval;
let backgroundOption = localStorage.getItem("ranBackChoice");
let span = document.querySelectorAll(".settings .box .choices span ");

// Check if there is bacground option in local storage:
if (backgroundOption !== null) {
  if (backgroundOption === "true") {
    choice = true;
  } else {
    choice = false;
  }
  span.forEach((s) => {
    s.classList.remove("active");
  });
  if (backgroundOption === "true") {
    document
      .querySelector(".settings .box .choices .yes")
      .classList.add("active");
  } else {
    document
      .querySelector(".settings .box .choices .no")
      .classList.add("active");
  }
}

//Change Random Background:
span.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target.dataset.choice === "yes") {
      choice = true;
      randomBackImg();
      localStorage.setItem("ranBackChoice", true);
    } else {
      choice = false;
      clearInterval(imgInterval);
      localStorage.setItem("ranBackChoice", false);
    }
  });
});

//Random Background Image:
function randomBackImg() {
  if (choice === true) {
    imgInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgs.length);
      landing.style.backgroundImage = `url("../imgs/${imgs[randomNum]}")`;
    }, 5000);
  }
}
randomBackImg();

//Skills On Scroll:
function animateSkills() {
  let mySkills = document.querySelector(".mySkills");
  window.onscroll = () => {
    let skillOffsetTop = mySkills.offsetTop;
    let skillOuterHeight = mySkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillOffsetTop + skillOuterHeight - windowHeight) {
      let allSkills = document.querySelectorAll(
        ".mySkills .skill .progress span"
      );
      allSkills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    }
  };
}

//Gallery Code:
let allImages = document.querySelectorAll(".gallery .images img");
allImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "imgOverlay";
    document.body.appendChild(overlay);

    let imageBox = document.createElement("div");
    imageBox.className = "imageBox";

    let title = document.createElement("h2");
    title.innerHTML = `${img.alt}`;
    title.className = "imageTitle";
    imageBox.appendChild(title);
    let image = document.createElement("img");
    image.src = img.src;
    imageBox.appendChild(image);
    document.body.appendChild(imageBox);

    let closeOverlay = document.createElement("button");
    closeOverlay.className = "closeOverlay";
    closeOverlay.innerHTML = "X";
    imageBox.appendChild(closeOverlay);
    closeOverlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
      document.body.removeChild(imageBox);
    });
  });
});

// Bullets Logic:
let bulletsOption = localStorage.getItem("bulletsOptions");
let bulletsDiv = document.querySelector(".scrollBullets");
let bullets = document.querySelectorAll(".scrollBullets .bullet");
let bulletSpan = document.querySelectorAll(
  ".settings .box .bullets-options span"
);

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// Check For Bullet Optin in local storage:
if (bulletsOption !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsOption === "show") {
    document
      .querySelector(".settings .box .bullets-options span.show")
      .classList.add("active");
    bulletsDiv.style.display = "block";
  } else {
    document
      .querySelector(".settings .box .bullets-options span.hide")
      .classList.add("active");
    bulletsDiv.style.display = "none";
  }
}
//Handles User Clicks On Each Option:
bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target.dataset.display === "show") {
      // console.log("Show");
      bulletsDiv.style.display = "block";
      localStorage.setItem("bulletsOptions", "show");
    } else {
      bulletsDiv.style.display = "none";
      localStorage.setItem("bulletsOptions", "hide");
    }
  });
});

// Handling Form:

let form = document.querySelector(".contact-us .form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let links = document.querySelector("header .links");
let linksLi = document.querySelector("header .links li");
let toggleBtn = document.querySelector("header .toggle-menu");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  links.classList.toggle("open");
  toggleBtn.classList.toggle("menu-active");
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== linksLi) {
    if (links.classList.contains("open")) {
      links.classList.remove("open");
      toggleBtn.classList.remove("menu-active");
    }
  }
  console.log(e.target);
});

links.addEventListener("click", (e) => {
  e.stopPropagation();
});

let toTopBtn = document.querySelector(".scrollToTop");

toTopBtn.addEventListener("click", () => {
  document.querySelector("header").scrollIntoView({
    behavior: "smooth",
  });
});

setInterval(() => {
  if (window.pageYOffset > 400) {
    toTopBtn.style.display = "flex";
  }
  if (this.pageYOffset < 300) {
    toTopBtn.style.display = "none";
  }
}, 100);
