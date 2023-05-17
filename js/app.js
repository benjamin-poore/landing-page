/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

// store each section of the page in an array
const sections = document.querySelectorAll("section");
const hamburgerButton = document.querySelector(".menu");

// dictionary that has the section id stored with the section name
const navItems = {};
sections.forEach((el) => {
  navItems[el.dataset["nav"]] = el.id;
});

// navbar UL element
const navbarList = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Begin Main Functions
 *
 */

// build the nav
// using a fragment to make the page only update one time instead of after each item in the loop
const fragment = document.createDocumentFragment();
// loop through each nav item and create a LI element with nested anchor tag that has the item name and href to each section
for (const key in navItems) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = `#${navItems[key]}`;
  a.className = "menu__link";
  a.innerHTML = key;
  // use of append
  li.append(a);
  // use of appendChild
  fragment.appendChild(li);
}

navbarList.appendChild(fragment);

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", (e) => {
  for (const section of sections) {
    section.className = "";
    const rec = section.getBoundingClientRect();
    if (window.screenTop >= rec.top && window.screenTop <= rec.bottom) {
      section.className = "active";
    }
  }
});

// Scroll to sections using smooth scroll
const links = document.querySelectorAll(".menu__link");
for (const el of links) {
  el.addEventListener("click", (e) => {
    // use the nav item name as the key for the navItem dict and smooth scroll to section
    e.preventDefault();
    const targetSection = document.querySelector(
      `#${navItems[e.target.innerHTML]}`
    );
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });
}

// show and hide navbar menu on button click
const toggleHamburger = () => {
  hamburgerButton.classList.toggle("opened");
  hamburgerButton.setAttribute(
    "aria-expanded",
    hamburgerButton.classList.contains("opened")
  );
  navbarList.classList.toggle("sm-hide");
};

/**
 * End Main Functions
 * Begin Events
 *
 */
