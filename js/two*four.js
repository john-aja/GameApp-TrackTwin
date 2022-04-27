import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHeaYMygDFLqH6MToCMAWS8nbPAriE3xk",
    authDomain: "track-twin.firebaseapp.com",
    projectId: "track-twin",
    storageBucket: "track-twin.appspot.com",
    messagingSenderId: "1038739724010",
    appId: "1:1038739724010:web:3d839b78bb75bb3a292993"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

let data;
const retriveData = ref(db, 'bestscore 2*4/');
onValue(retriveData, (snapshot) => {
    data = snapshot.val().highscore
    bestTag.innerText = data;
    console.log(data)
})


function writeData(score) {
    set(ref(db, 'bestscore 2*4/'), {
        highscore: score,
    })
}

const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const turnTag = document.querySelector(".moves b");
const bestTag = document.querySelector(".high-score b")
const refreshBtn = document.querySelector(".information button");
const successBox = document.querySelector('.alert');
const overlay = document.querySelector('.overlay');
const timeUpBox = document.querySelector('.alert-fail')

let maxTime;
let remainingTime = maxTime;
let turn = 0;
let cardPair = 0;
let deactivate = false;
let started = false;
let highscore = 0;
let firstCard, secondCard, timer;


let complexityValue = JSON.parse(localStorage.getItem('levelValue'));

if (complexityValue == "c-1") {
    maxTime = 35;
}
if (complexityValue == "c-2") {
    maxTime = 25;
}
if (complexityValue == "c-3") {
    maxTime = 15;
}


function timerFunc() {
    if (remainingTime <= 0) {
        timeUpBox.classList.remove('display')
        overlay.classList.remove('display')
        return clearInterval(timer);
    }
    remainingTime--;
    timeTag.innerText = remainingTime;
}

function turnCard({ target: clickedCard }) {
    if (!started) {
        started = true;
        timer = setInterval(timerFunc, 1000);
    }
    if (clickedCard !== firstCard && !deactivate && remainingTime > 0) {
        turn++;
        turnTag.innerText = turn;
        clickedCard.classList.add("turn");
        if (!firstCard) {
            return firstCard = clickedCard;
        }
        secondCard = clickedCard;
        deactivate = true;
        let firstCardImg = firstCard.querySelector(".card-back img").src,
            secondCardImg = secondCard.querySelector(".card-back img").src;
        checkCards(firstCardImg, secondCardImg);
    }
}

function removeCard(firstCard, secondCard) {
    setTimeout(() => {
        firstCard.classList.toggle("hidden");
        secondCard.classList.toggle("hidden");
    }, 1000);
}
function checkCards(firstImg, secondImg) {
    if (firstImg === secondImg) {
        removeCard(firstCard, secondCard);
        cardPair++;



        if (cardPair == 4 && remainingTime > 0) {
            if (bestTag.innerText > turn || bestTag.innerText == 0) {
                highscore = turn;
                bestTag.innerText = highscore;
                writeData(highscore)
            }
            return clearInterval(timer), setTimeout(() => {
                successBox.classList.remove('display');
                overlay.classList.remove('display');
            }, 500);
        }


        firstCard.removeEventListener("click", turnCard);
        secondCard.removeEventListener("click", turnCard);
        firstCard = secondCard = "";
        return deactivate = false;
    }

    setTimeout(() => {
        firstCard.classList.add("vibrate");
        secondCard.classList.add("vibrate");
    }, 400);

    setTimeout(() => {
        firstCard.classList.remove("vibrate", "turn");
        secondCard.classList.remove("vibrate", "turn");
        firstCard = secondCard = "";
        deactivate = false;
    }, 1200);
}

function mixCards() {

    remainingTime = maxTime;
    turn = cardPair = 0;
    firstCard = secondCard = "";
    clearInterval(timer);
    timeTag.innerText = remainingTime;
    turnTag.innerText = turn;
    deactivate = started = false;

    let arr = [1, 2, 3, 4, 1, 2, 3, 4];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("turn");
        card.classList.remove("hidden");
        let imgTag = card.querySelector(".card-back img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", turnCard);
    });
}

mixCards();

refreshBtn.addEventListener("click", mixCards);

cards.forEach(card => {
    card.addEventListener("click", turnCard);
});



