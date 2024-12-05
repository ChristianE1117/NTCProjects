export function updateGuestCount(count, element) {
    element.textContent = count;
}
  
export function checkGuestLimit(excess, messageElement) {
    messageElement.textContent = `The limit of 20 guests has been reached. ${excess} person(s) cannot be admitted.`;
}