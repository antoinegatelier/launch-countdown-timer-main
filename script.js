/* Constants */

//set your own date: year, month - 1, day, hour, minute, second
//const launchDate = new Date(2021, 4, 20, 17, 30, 00);

//set launchDate to 14 days at page loading - 1000 (ms) * 3600 (s = 1h) * 24 (hours) * 14 = 14days
const launchDate = Date.now() + 1000 * 3600 * 24 * 14;

//converts milliseconds to seconds/minutes/hours/days
const msToSeconds = 1000;
const msToMinutes = 60 * msToSeconds;
const msToHours = 60 * msToMinutes;
const msToDays = 24 * msToHours;

/* Variables */

const days = { 
    value: '',
    update: false,
    zIndex: [document.querySelector('#z0d'), document.querySelector('.z1d'), document.querySelector('#z2d'), document.querySelector('.z3d')]
};

const hours = {
    value: '',
    update: false,
    zIndex: [document.querySelector('#z0h'), document.querySelector('.z1h'), document.querySelector('#z2h'), document.querySelector('.z3h')]
};

const minutes = {
    value: '',
    update: false,
    zIndex: [document.querySelector('#z0m'), document.querySelector('.z1m'), document.querySelector('#z2m'), document.querySelector('.z3m')]
};

const seconds = {
    value: '',
    update: false,
    zIndex: [document.querySelector('#z0s'), document.querySelector('.z1s'), document.querySelector('#z2s'), document.querySelector('.z3s')]
};

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
};

const updateText = (timeUnit, index) => {
    timeUnit.zIndex[index].textContent = toTwoDigits(timeUnit.value);
};

const updateTimeUnit = (timeUnit) => {
    if(timeUnit.update) {
        updateText(timeUnit, 1);
        updateText(timeUnit, 2);
        timeUnit.zIndex[3].animate(animateTop, duration = 950, iterations = 1);
        timeUnit.zIndex[1].animate(animateBottom, duration = 950, iterations = 1);
        window.setTimeout(() => {
            updateText(timeUnit, 3);
            updateText(timeUnit, 0);
        }, 750);
        timeUnit.update = false;
    }
};

/* Animations */

const animateTop = [
    { transformOrigin: 'bottom', transform: 'scale(1, 1)' },
    { transformOrigin: 'bottom', transform: 'scale(1, 0)', offset: 0.5},
    { transformOrigin: 'bottom', transform: 'scale(1, 0)'}
];
const animateBottom = { transform: ['scale(1, 0)', 'scale(1, 0)', 'scale(1, 1)'] };

/* Defines and starts counter - refreshes every second (1000ms) */

const counter = setInterval(() => {
    updateRemainingTime();
    updateTimeUnit(days);
    updateTimeUnit(hours);
    updateTimeUnit(minutes);
    updateTimeUnit(seconds);
}, 1000);