//my public API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '095a5b4bc2mshce87e5e4e9b1d87p10c136jsn33c7cf93790e',
		'X-RapidAPI-Host': 'wonderboyapi.p.rapidapi.com'
	}
};

fetch('https://wonderboyapi.p.rapidapi.com/lastDateAndTime', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
 // Elements in const
 const inputContainer = document.getElementById('input-container');  
 const countdownForm = document.getElementById('countdownForm');  
 const dateEl = document.getElementById('date-picker');  
 const titleEl = document.getElementById('title');  
 const countdownEl = document.getElementById('countdown');  
 const countdownElTitle = document.getElementById('countdown-title');  
 const resetBtn = document.getElementById('countdown-button');  
 const timeElements = document.querySelectorAll('span');  
 const completeEl = document.getElementById('complete');  
 const completeElInfo = document.getElementById('complete-info');  
 const completeBtn = document.getElementById('complete-button');  
 // Global Variables  
 let countdownTitle = '';  
 let countdownDate = '';  
 let countdownValue = new Date();  
 let countdownActive;  
 let savedCountdown;  
 // Time Variables  
 const second = 1000;  
 const minute = second * 60;  
 const hour = minute * 60;  
 const day = hour * 24;  
 // Set date input minimum with todays date  
 const today = new Date().toISOString().split('T')[0];  
 dateEl.setAttribute('min', today);  
 // Populate countdown / complete UI  
 function updateDOM() {  
  countdownActive = setInterval(() => {  
   // Get the time between Jan 1, 1970 to the entered date, returned in milliseconds.  
   const now = new Date().getTime();  
   const distance = countdownValue - now;  
   // Split up the time held in distance into days, hours, minutes, and seconds.  
   const days = Math.floor(distance / day);  
   const hours = Math.floor((distance % day) / hour);  
   const minutes = Math.floor((distance % hour) / minute);  
   const seconds = Math.floor((distance % minute) / second);  
   // Hide Input  
   inputContainer.hidden = true;  
   // If countdown has ended, show the complete messaging  
   if (distance < 0) {  
    countdownEl.hidden = true;  
    clearInterval(countdownActive);  
    completeElInfo.textContent = `${countdownTitle} countdown finished on ${countdownDate}`;  
    completeEl.hidden = false;  
   } else {  
    // Else, Show countdown in progress  
    // Populate the countdown  
    countdownElTitle.textContent = `${countdownTitle}`;  
    timeElements[0].textContent = `${days}`;  
    timeElements[1].textContent = `${hours}`;  
    timeElements[2].textContent = `${minutes}`;  
    timeElements[3].textContent = `${seconds}`;  
    completeEl.hidden = true;  
    countdownEl.hidden = false;  
   }  
  }, second);  
 }  
 // Take Values from the form input  
 function updateCountdown(event) {  
  event.preventDefault();  
  countdownTitle = event.srcElement[0].value;  
  countdownDate = event.srcElement[1].value;  
  savedCountdown = {  
   title: countdownTitle,  
   date: countdownDate,  
  };  
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));  
  // Check for a valid date  
  if (countdownDate === '') {  
   alert('Please select a date for the countdown.');  
  } else {  
   // Get the number version of current date and update DOM  
   countdownValue = new Date(countdownDate).getTime();  
   updateDOM();  
  } 
} 
 
 // Reset all values  
 function reset() {  
  // Hide Countdown and show input  
  countdownEl.hidden = true;  
  completeEl.hidden = true;  
  inputContainer.hidden = false;  
  // Stop the countdown  
  clearInterval(countdownActive);  
  // Reset Values  
  countdownTitle = '';  
  countdownDate = '';  
  titleEl.value = '';  
  dateEl.value = '';  
  localStorage.removeItem('countdown');  
 }  
 // Get the countdown from localStorage if available  
 function restorePreviousCountdown() {  
  if (localStorage.getItem('countdown')) {  
   inputContainer.hidden = true;  
   savedCountdown = JSON.parse(localStorage.getItem('countdown'));  
   countdownTitle = savedCountdown.title;  
   countdownDate = savedCountdown.date;  
   countdownValue = new Date(countdownDate).getTime();  
   updateDOM();  
  }  
 }  
 // My Event Listeners  
 countdownForm.addEventListener('submit', updateCountdown);  
 resetBtn.addEventListener('click', reset);  
 completeBtn.addEventListener('click', reset);  
 // On Load  
 restorePreviousCountdown();  

