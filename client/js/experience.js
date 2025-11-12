"use strict"
 
//get buttons and experience contents elements
const prevbtn = document.querySelector("#prevbtn");
const nextbtn = document.querySelector("#nextbtn");
const title = document.querySelector("#cardtitle");
const subtitle = document.querySelector("#subtitle");
const liOne = document.querySelector("#list-one");
const liTwo = document.querySelector("#list-two");
const liThree = document.querySelector("#list-three");

// array objects of experience show card
const cards = [
  {
    id: 1,
    title: 'Education',
    subtitle: `<strong>B.S.C International Relations</strong> | National Open university of Nigeria. | (IN VIEW)`,
    list1: `<strong>Relevant Course Work:</strong>
Diplomacy, Political Economy, Computer Fundamentals, Globalizations.
    `,
    list2: `Negotiation, Cross-cultural relations, African Politics.`,
    list3: `Conflict Resolution, Power, International Migration, Statistics.
    `
  },
    {
        id: 2,
        title: 'Apprentice',
        subtitle: `<strong>PureTech Computer Training School </strong> | February 2024 - June 2024.`,
        list1: `Assisted customers with document processing, editing, printing, laminating, spiral
binding, and scanning. `,
        list2: `Handled customer service, ensuring smooth communication and assistance.`,
        list3: `Applied Microsoft Office tools, for various
tasks and Operated office equipment’s to meet customers’ needs.`,
    },
    
    {
        id: 3,
        title: 'Web Development Intern',
        subtitle: '<strong>PureTech Computer Training School</strong> | August 2024 - December 2024',
        list1: `Acquired Front-End development skills.`,
        list2: `Built websites from scratch, focusing on   user-friendly
interfaces & applying unique styling techniques to enhance user experience.`,
        list3: `Collaborated as part of a front-end developer team on MetaMagnetAi project,
contributing to the development  of innovative web solutions.`
    },
    {
        id: 4,
        title: `Certifications`,
        subtitle: `Certificates I own`,
      list1: `Front-End Web Development Certification - <a href="https://freecodecamp.org/certification/marveeygoodlife/responsive-web-design
" target="_blank" rel="noopener noreferrer" >freeCodeCamp (2025).</a>
        <span class="sr-only"> view my freecode camp responsive-web-design certificate</span>
`,
        list2: `JavaScript Algorithms and Data Structures - freeCodeCamp (In-VIEW)`,
        list3: `Hp Life Awareness`,
    }
    
]
let currentitem = 0;
// default card to show when DOM content loads
document.addEventListener("DOMContentLoaded", () => {
  const item = cards[currentitem];
  title.textContent = item.title;
  subtitle.innerHTML = item.subtitle;
  liOne.innerHTML = item.list1;
  liTwo.textContent = item.list2;
  liThree.textContent = item.list3;
});

function showCard(card) {
    const item = cards[card];
    if (!item) return;
     title.textContent = item.title;
     subtitle.innerHTML = item.subtitle;
    liOne.innerHTML = item.list1;
    liTwo.textContent = item.list2;
    liThree.textContent = item.list3;
  // announce the currently visible card for screen readers
/*   try {
    const carouselRegion = document.querySelector('[role="region"][aria-label="card carousel"]');
    if (carouselRegion) {
      // use plain text content to avoid announcing HTML tags
      const announcement = `${title.textContent}. ${subtitle.textContent}`;
      carouselRegion.textContent = announcement;
    }
  } catch (e) {
    // fail silently if DOM is not available
  }; */
};

prevbtn.addEventListener("click", () => {
  currentitem--;
  if (currentitem < 0) {
    // back to last index of the cards array
    currentitem = cards.length - 1;
  };
  showCard(currentitem); 
});


nextbtn.addEventListener("click", () => {
    currentitem++;
    if (currentitem > cards.length - 1) {
        currentitem = 0;
    }
    showCard(currentitem);
});

// Keyboard navigation for experience cards
document.addEventListener('keydown', (e) => {
  // Ignore key events when focus is in form fields or contenteditable areas
  const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

  switch (e.key) {
    case 'ArrowLeft':
      // go to previous card
      prevbtn.click();
      break;
    case 'ArrowRight':
      // go to next card
      nextbtn.click();
      break;
    case 'Home':
      // go to first card
      currentitem = 0;
      showCard(currentitem);
      break;
    case 'End':
      // go to last card
      currentitem = cards.length - 1;
      showCard(currentitem);
      break;
    default:
      // ignore other keys
      break;
  };
});