'use strict';
const phrase = document.querySelector('.visual__phrase');
const visual = document.querySelector('#visual');
const navbar = document.querySelector("#navbar");
const upBtn = document.querySelector('.up-btn');
const navbarHeight = navbar.getBoundingClientRect().height;
const visualHeight = visual.getBoundingClientRect().height;

// 비주얼 사진 글씨
document.addEventListener('scroll',()=>{
    phrase.style.opacity = 1-(window.scrollY-navbarHeight) / visualHeight;
});

// UP-BTN
document.addEventListener('scroll', ()=>{
    if(window.scrollY > visualHeight+navbarHeight){
        upBtn.classList.add('visible');
    }else{
        upBtn.classList.remove('visible');
    }
});

upBtn.addEventListener('click', ()=>{
    scrollIntoView('#visual');
});

// Handle click 
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
