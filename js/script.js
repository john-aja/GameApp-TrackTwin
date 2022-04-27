const playButton = document.querySelector('.play_button');

const patternOne = document.querySelector('.p-one').value;
const patternTwo = document.querySelector('.p-two').value;
const patternThree = document.querySelector('.p-three').value;
const patternFour = document.querySelector('.p-four').value;

const levelOne = document.querySelector('.c-one').value;
const levelTwo = document.querySelector('.c-two').value;
const levelThree = document.querySelector('.c-three').value;



function pageOne() {
    window.location.href = 'two*three.html';
    return false;
}

function pageTwo() {
    window.location.href = 'two*four.html';
    return false;
}

function pageThree() {
    window.location.href = 'three*four.html';
    return false;
}

function pageFour() {
    window.location.href = 'four*five.html';
    return false;
}


playButton.addEventListener('click', function () {

    const levelSelector = document.getElementById('complexity')
    const levelValue = levelSelector.options[levelSelector.selectedIndex].value;

    localStorage.setItem('levelValue', JSON.stringify(levelValue));

    const patternSelector = document.getElementById('pattern');
    const patternValue = patternSelector.options[patternSelector.selectedIndex].value;

    if (patternValue == patternOne) return pageOne();
    if (patternValue == patternTwo) return pageTwo();
    if (patternValue == patternThree) return pageThree();
    if (patternValue == patternFour) return pageFour();

})