"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const ul = document.querySelector('nav ul');
    const ulbtn = document.querySelector('nav button');
    const ulLinks = Array.from(document.querySelectorAll("ul a"));
    const nav = document.querySelector('nav');
    // Defensive guards: if expected nav elements are missing, skip nav-specific behavior
    const hasNavElements = ul && ulbtn && nav;
    /* close link function */
    function closeUl() {
        if (!hasNavElements) return;
        ul.classList.remove("active");
        ulbtn.setAttribute('aria-expanded', 'false');
    }
    /* show mobile nav menu */
    if (hasNavElements) {
        ulbtn.addEventListener("click", () => {
            /* set aria attribute for accessibility */
            let expanded = ulbtn.getAttribute('aria-expanded') === 'true';
            ulbtn.setAttribute("aria-expanded", String(!expanded));
            ul.classList.toggle('active');
        });
    }
    /* close nav on click of links */
    if (ulLinks.length) {
        ulLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                closeUl();
                const targetId = link.getAttribute('href');
                setTimeout(() => {
                    const target = document.querySelector(targetId);
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                }, 100);
            });
        });
    }
    /* close nav link on click of outside ul */
    document.addEventListener('click', (e) => {
        if (!hasNavElements) return;
        const navopen = ul.classList.contains("active");
        const clickedUl = ul.contains(e.target);
        const clickedtoggle = ulbtn.contains(e.target);
        if (navopen && !clickedUl && !clickedtoggle) {
            closeUl();
        }
    });
    //get scroll to top button
    const togglebtn = document.getElementById("scrollToTop");
/* scroll on click of button */
    if (togglebtn) {
        togglebtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
/* show scroll to top button */
    window.addEventListener('scroll', () => {
        const scrollHeight = window.scrollY;
        if (!togglebtn) return;
        if (scrollHeight > 1500) {
            togglebtn.classList.add("show");
        } else {
            togglebtn.classList.remove("show");
        }
    });

    /* reveal: adds a small translate/opacity animation when elements enter viewport
       types the hero H1 when it becomes visible*/
    
    // announcer for scrren reader
    const announcer = document.getElementById('aria-announcer');

    // elements to reveal on scroll;
    const elementsToReveal = 'section, .projectcard, .projectcontent, .hero-content,  h3, h4, .abouth3, p, li,  .aboutp, .herop, .skills, footer, header';

    //turn elements to array
    const revealElements = Array.from(document.querySelectorAll(elementsToReveal));
     
    //add reveal classlist to selected array of elements
    revealElements.forEach((el) => {el.classList.add('reveal')});

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // only reveal once
                obs.unobserve(entry.target);
            } 
        });
    }, { threshold: 0.15});

    revealElements.forEach((el) => {revealObserver.observe(el)});

    // type h1 text and add cursor
    const heroH1 = document.querySelector('#hero .hero-content h1');
    if (heroH1) {
        const fullText = heroH1.textContent.trim();
        // clear existing text and prepare
        heroH1.textContent = '';

        function typeText(target, text, delay) {
            return new Promise((resolve) => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        target.textContent += text.charAt(i);
                        i += 1;
                    } else {
                        clearInterval(timer);
                        resolve();
                    };
                }, delay);
            });
        };

        function startTypewriter() {
            // create a caret element and a text node so the caret remains after the typed text
            const caret = document.createElement('span');
            caret.className = 'caret';
            const textNode = document.createTextNode('');
            // clear and append text node then caret
            heroH1.textContent = '';
            heroH1.appendChild(textNode);
            heroH1.appendChild(caret);
            heroH1.classList.add('typing');
            // type into the textNode
            return typeText(textNode, fullText, 150).then(() => {
                heroH1.classList.remove('typing');
                //remove caret after typing completes
                if (caret && caret.parentNode) caret.parentNode.removeChild(caret);
                // announce final text for screen readers
                if (announcer) announcer.textContent = fullText;
            });
        };

        const h1Observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTypewriter();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        h1Observer.observe(heroH1);
    };
});