/* Constants */
const launchDate = new Date(2021, 4, 20, 17, 30, 00);

const msToSeconds = 1000;
const msToMinutes = 60 * msToSeconds;
const msToHours = 60 * msToMinutes;
const msToDays = 24 * msToHours;

/* Helper functions */

const updateRemainingTime = () => {
    const remainingTime = launchDate - Date.now();
    if(days.value !== Math.floor(remainingTime / msToDays)) {
        days.value = Math.floor(remainingTime / msToDays);
        days.update = true;
    } 
    if(hours.value !== Math.floor((remainingTime - (days.value * msToDays)) / msToHours)) {
        hours.value = Math.floor((remainingTime - (days.value * msToDays)) / msToHours);
        hours.update = true;
    }
    if(minutes.value !== Math.floor((remainingTime - (days.value * msToDays) - (hours.value * msToHours)) / msToMinutes)) {
        minutes.value = Math.floor((remainingTime - (days.value * msToDays) - (hours.value * msToHours)) / msToMinutes);
        minutes.update = true;
    }
    seconds.value = Math.floor((remainingTime - (days.value * msToDays) - (hours.value * msToHours) - (minutes.value * msToMinutes)) / msToSeconds);
    seconds.update = true;
};

const toTwoDigits = (number) => {
    if(number.toString().length < 2) {
        return `0${number}`;
    }
    return number;
}

const updateText = (nodeToUpdate, unitToUpdate) => {
    nodeToUpdate.forEach(node => node.textContent = toTwoDigits(unitToUpdate));
}

/* Animations */

const animateTop = [
    { transformOrigin: 'bottom', transform: 'scale(1 ,1)' },
    { transformOrigin: 'bottom', transform: 'scale(1, 0)', offset: 0.5},
    { transformOrigin: 'bottom', transform: 'scale(1, 0)'}
];
const animateBottom = { transform: ['scale(1, 0)', 'scale(1, 0)', 'scale(1, 1)'] };

/* Selectors */

const daysTopDivsSelector = document.querySelectorAll(".daysFirst");
const daysBottomDivsSelector = document.querySelectorAll(".daysSecond");
const hoursTopDivsSelector = document.querySelectorAll(".hoursFirst");
const hoursBottomDivsSelector = document.querySelectorAll(".hoursSecond");
const minutesTopDivsSelector = document.querySelectorAll(".minutesFirst");
const minutesBottomDivsSelector = document.querySelectorAll(".minutesSecond");
const secondsTopDivsSelector = document.querySelectorAll(".secondsFirst");
const secondsBottomDivsSelector = document.querySelectorAll(".secondsSecond");

/* Variables */

const days = { value: '', update: false };
const hours = { value: '', update: false };
const minutes = { value: '', update: false};
const seconds = { value: '', update: false};

/* Defines and starts counter - refreshes every second (1000ms) */

const counter = setInterval(() => {
    updateRemainingTime();
    if(days.update) {
        document.querySelector('.z1d').textContent = toTwoDigits(days.value);
        document.querySelector('#z2d').textContent = toTwoDigits(days.value);
        document.querySelector('.z3d').animate(animateTop, duration = 950, iterations = 1);
        document.querySelector('.z1d').animate(animateBottom, duration = 950, iterations = 1);
        window.setTimeout(() => {
            document.querySelector('.z3d').textContent = toTwoDigits(days.value);
            document.querySelector('#z0d').textContent = toTwoDigits(days.value);
        }, 750);
        days.update = false;
        };
    if(hours.update) {
        document.querySelector('.z1h').textContent = toTwoDigits(hours.value);
        document.querySelector('#z2h').textContent = toTwoDigits(hours.value);
        document.querySelector('.z3h').animate(animateTop, duration = 950, iterations = 1);
        document.querySelector('.z1h').animate(animateBottom, duration = 950, iterations = 1);
        window.setTimeout(() => {
            document.querySelector('.z3h').textContent = toTwoDigits(hours.value);
            document.querySelector('#z0h').textContent = toTwoDigits(hours.value);
        }, 750);
        hours.update = false;
    };
    if(minutes.update) {
        document.querySelector('.z1m').textContent = toTwoDigits(minutes.value);
        document.querySelector('#z2m').textContent = toTwoDigits(minutes.value);
        document.querySelector('.z3m').animate(animateTop, duration = 950, iterations = 1);
        document.querySelector('.z1m').animate(animateBottom, duration = 950, iterations = 1);
        window.setTimeout(() => {
            document.querySelector('.z3m').textContent = toTwoDigits(minutes.value);
            document.querySelector('#z0m').textContent = toTwoDigits(minutes.value);
        }, 750);
        minutes.update = false;
    };
    if(seconds.update) {
        document.querySelector('.z1s').textContent = toTwoDigits(seconds.value);
        document.querySelector('#z2s').textContent = toTwoDigits(seconds.value);
        document.querySelector('.z3s').animate(animateTop, duration = 950, iterations = 1);
        document.querySelector('.z1s').animate(animateBottom, duration = 950, iterations = 1);
        window.setTimeout(() => {
            document.querySelector('.z3s').textContent = toTwoDigits(seconds.value);
            document.querySelector('#z0s').textContent = toTwoDigits(seconds.value);
        }, 750);
        seconds.update = false;
    }
}, 1000);