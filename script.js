window.onload = function() {
    let storedTime = localStorage.getItem('totalWorkedMinutes') || 0;
    updateCounterDisplay(storedTime);
    highlightCurrentDay();
};

function updateStatus() {
    let startTime = document.getElementById('start-time')?.value;
    let endTime = document.getElementById('end-time')?.value;
    
    if (startTime && endTime) {
        let workedMinutes = calculateMinutes(startTime, endTime);
        let storedTime = parseInt(localStorage.getItem('totalWorkedMinutes') || 0) + workedMinutes;
        localStorage.setItem('totalWorkedMinutes', storedTime);
        updateCounterDisplay(storedTime);
    }
}

function calculateMinutes(start, end) {
    let [startHour, startMin] = start.split(':').map(Number);
    let [endHour, endMin] = end.split(':').map(Number);
    let startMinutes = startHour * 60 + startMin;
    let endMinutes = endHour * 60 + endMin;
    if (endMinutes < startMinutes) endMinutes += 24 * 60;
    return endMinutes - startMinutes;
}

function updateCounterDisplay(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    let displayElement = document.getElementById('counter-display');
    if (displayElement) {
        displayElement.innerText = `Szolgálatban töltött idő: ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
}

function resetTime() {
    localStorage.setItem('totalWorkedMinutes', '0');
    updateCounterDisplay(0);
    console.log('Heti munkaidő törölve!');
}

function clearInput(inputId) {
    let inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.value = '';
    }
}

function highlightCurrentDay() {
    let days = document.querySelectorAll('.day');
    let todayIndex = new Date().getDay() - 1;
    if (todayIndex >= 0 && todayIndex < days.length) {
        days[todayIndex].classList.add('current-day');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('deleteButton');

    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            const confirmed = confirm('Biztosan törölni szeretné a heti munkaidőt?');
            if (confirmed) {
                resetTime(); 
            }
        });
    }
});
