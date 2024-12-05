import { updateGuestCount, checkGuestLimit } from './guestCounter.js';

const form = document.getElementById('guestForm');
const guestCountSpan = document.getElementById('guestCount');
const messageParagraph = document.getElementById('message');


let guestCount = 0;
const guestLimit = 20;


form.addEventListener('submit', (event) => {

  event.preventDefault();


  if (guestCount < guestLimit) {

    guestCount++;
    updateGuestCount(guestCount, guestCountSpan);

    messageParagraph.textContent = '';
  } else {

    const excess = guestCount + 1 - guestLimit;

    checkGuestLimit(excess, messageParagraph);
  }

  form.reset();
});
