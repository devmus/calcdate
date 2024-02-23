const $ = document.querySelector.bind(document);

const displayDate = $('#display-date');
const displayDays = $('#display-days');
const displayHours = $('#display-hours');
const displayMinutes = $('#display-minutes');
const displayTotalHours = $('#total-hours');
const displayTotalMinutes = $('#total-minutes');
const displayNewDate = $('#deadline-date');

const initApp = () => {
  const form = document.querySelector('#inputform');
  document.addEventListener('submit', (e) => inputData(e, form));
};

const inputData = (e, form) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const daysString = form.elements.days.value; // Get the value of the 'days' input
  const hoursString = form.elements.hours.value; // Get the value of the 'hours' input
  const minutesString = form.elements.minutes.value; // Get the value of the 'minutes' input

  const days = +daysString;
  const hours = +hoursString;
  const minutes = +minutesString;

  const currentDate = new Date();

  displayData(days, hours, minutes, currentDate);
  calculate(days, hours, minutes, currentDate);
};

const displayData = (days, hours, minutes, currentDate) => {
  const formattedDate = formatDate(currentDate);
  displayDate.innerText = formattedDate;

  displayDays.innerText = days;
  displayHours.innerText = hours;
  displayMinutes.innerText = minutes;
};

const calculate = (days, hours, minutes, currentDate) => {
  const daysToHours = days * 24;
  const totalHours = daysToHours + hours;
  const hoursToMinutes = totalHours * 60;
  const totalMinutes = hoursToMinutes + minutes;
  const totalMilliseconds = totalMinutes * 60 * 1000;

  const gettime = currentDate.getTime();
  const newTime = totalMilliseconds + gettime;
  const newDate = new Date(newTime);

  displayCalculations(totalHours, totalMinutes, newDate);
};

const displayCalculations = (totalHours, totalMinutes, newDate) => {
  displayTotalHours.innerText = totalHours;
  displayTotalMinutes.innerText = totalMinutes;
  const formattedDate = formatDate(newDate);
  displayNewDate.innerText = formattedDate;
};

const formatDate = (date) => {
  const year = date.getFullYear(); // Get the year (four digits)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (zero-based index, add 1 to get the correct month) and ensure it's two digits
  const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month and ensure it's two digits
  const hours = String(date.getHours()).padStart(2, '0'); // Get the hours and ensure it's two digits
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes and ensure it's two digits

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`; // Concatenate date and time with a space in between

  return formattedDateTime;
};

document.addEventListener('DOMContentLoaded', initApp);
