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
let contentSections = ["Section 1", "Section 2", "Section 3", "Section 4"];
let sectionIds = document.querySelectorAll('section[data-nav]');
let menu = document.querySelector('#navbar__list');
let allLinks;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//Check if a section is in view port
let inViewport = (rect)=> {
    return (
        rect.top <= 150 &&
        rect.left >= 0 &&
        rect.bottom >= 150 &&
        rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav and nav content
let buildNav = ()=> {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < contentSections.length; i++) {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        newA.setAttribute("href", `#${sectionIds[i].id}`);
        newA.classList.add("menu__link");
        newA.innerHTML = contentSections[i];
        newLi.appendChild(newA);
        fragment.appendChild(newLi);
    }

    menu.append(fragment);
    allLinks = document.querySelectorAll('a[href*="section"]');
}

// Add class 'active' to section when near top of viewport
//Check if current section is visible in the viewport and add active class name
let showActiveClass = ()=> {
    for (let i = 0; i < contentSections.length; i++) {        
        const currStatus = inViewport(sectionIds[i].getBoundingClientRect());
        if (currStatus) {
            allLinks[i].classList.add("active-section");
            sectionIds[i].classList.add("active-section");
        } else {
            allLinks[i].classList.remove("active-section");
            sectionIds[i].classList.remove("active-section");
        }
    }
}

// Scroll to anchor ID using scrollTO event
let scrollToSection = (event)=> {
    event.preventDefault();
    const theLink = event.target.hash;

    let target = document.querySelector(theLink);
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
menu.addEventListener('click', scrollToSection);

// Set sections as active
document.addEventListener("scroll", showActiveClass);


