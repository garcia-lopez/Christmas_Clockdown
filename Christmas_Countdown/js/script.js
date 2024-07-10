//Get all the elements from the HTML file
let monthText = document.getElementById('months');
let dayText = document.getElementById('days');
let hourText = document.getElementById('hours');
let minuteText = document.getElementById('minutes');
let secondText = document.getElementById('seconds');
let title = document.getElementById('title');
let clock = document.getElementById('clock');
//Get all the elements for my mobile version
let monthTextMobile = document.getElementById('mobile_months');
let dayTextMobile = document.getElementById('mobile_days');
let hourTextMobile = document.getElementById('mobile_hours');
let minuteTextMobile = document.getElementById('mobile_minutes');
let secondTextMobile =  document.getElementById('mobile_seconds');

//Get milisecondsInAmonth
let millisecondsInADay = 24 * 60 * 60 * 1000;
let averageDaysInAMonth = 30.44;
let millisecondsInAMonth = millisecondsInADay * averageDaysInAMonth;

//Next Christmas date
function getNextChristmas() {
    let today = getActualTime();
    let currentYear = today.getFullYear();
    let christmasThisYear = new Date(currentYear, 11, 25); // Month is 0-indexed, 11 = December
    if (today > christmasThisYear) {
        // If today is past this year's Christmas, target next year's Christmas
        return new Date(currentYear + 1, 11, 25);
    } else {
        return christmasThisYear;
    }
}
function getActualTime() {
    let actual = new Date();
    return actual;
}

function doCalculations(timeLeft) {
    //Number of miliseconds in a day 1000 * 60 * 60 * 24
    //Math.floor() function returns the largest integer less than or equal to a given number. Redondea el resultado hacia abajo
    let months = Math.floor(timeLeft / millisecondsInAMonth);
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    //Display the countdown
    monthText.innerText = months;
    dayText.innerText = days;
    hourText.innerText = hours;
    minuteText.innerText = minutes;
    secondText.innerText = seconds;

    //Display the countdown for the mobile version
    monthTextMobile.innerText = months;
    dayTextMobile.innerText = days;
    hourTextMobile.innerText = hours;
    minuteTextMobile.innerText = minutes;
    secondTextMobile.innerText = seconds;
}

//Update the countdown every second
var interval = setInterval(function() {
    try {
        let actual = getActualTime();
        let Christmas = getNextChristmas()
        //console.log(Christmas);
        let timeLeft = Christmas.getTime() - actual.getTime();
        //console.log(actual);
        //console.log(timeLeft);
        if (timeLeft <= 0 || actual.getMonth() == 11 && actual.getDate() == 25) {
            clearInterval(interval);
            title.innerText = "Merry Christmas!";
            monthText.innerText = 0;
            dayText.innerText = 0;
            hourText.innerText = 0;
            minuteText.innerText = 0;
            secondText.innerText = 0;
            //Update mobile view 
            monthTextMobile.innerText = 0;
            dayTextMobile.innerText = 0;
            hourTextMobile.innerText = 0;
            minuteTextMobile.innerText = 0;
            secondTextMobile.innerText = 0;	
    
        } else {
            doCalculations(timeLeft);
        }
    } catch (error) {
        console.error('Error in interval:', error);
        clearInterval(interval); // Stop the interval on error to prevent endless error logging
    }
}, 1000);