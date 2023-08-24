

const word = document.getElementById('word')
const popupContainer = document.getElementById("popup-container")
const successMessage = document.getElementById("success-message")
const wrongLettersAll = document.getElementById("wrong-letters")
const item = document.querySelectorAll('.item')
const playAgain = document.getElementById('play-again')
const container = document.querySelector('.container')
popupContainer.style.display = 'none'


const correctLetters = []
const wrongLetters = [];
let selectedWord = getRandomWord();




function getRandomWord() {
    const words = ["javascript", "java", "python", "react", "angular", "shell", "ruby"]
    return words[Math.floor(Math.random() * words.length)]
}




let stripeOne = document.querySelector('.stripeone')

function displayWord() {

    word.innerHTML = `
    
    ${selectedWord.split('').map(letter => `
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ''}

    </div>
    `).join('')}
    `;


    const w = word.innerText.replace(/\n/g, '')
    if (w === selectedWord) {
        popupContainer.style.display = 'block'
        container.style.display = 'none'
        stripeOne.style.display = 'block'
        popupContainer.style.zIndex = '1'
    }
}

let stripe = document.querySelector('.stripe')

function updateWrongLetters(){
    wrongLettersAll.innerHTML = `
        ${wrongLetters.length > 0 ?'<h3>Incorrect letters</h3>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    item.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if(index<errorCount){
            item.style.display = "block"
        }else{
            item.style.display = "none"
        }

     
    })

    if(wrongLetters.length === item.length){
        stripe.style.display = 'block'
        container.style.display = 'none'
        popupContainer.style.display = 'block'
        popupContainer.style.zIndex = '1'

    }


}


window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter)
                displayWord()
            } else {
                console.log("you have already entered this letter");
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)
                updateWrongLetters()
                
            }
        }
    }
})

playAgain.addEventListener('click', function() {
    correctLetters.splice(0),
    wrongLetters.splice(0),
    selectedWord = getRandomWord();
    displayWord()
    updateWrongLetters()
    popupContainer.style.display="none"
    container.style.display = 'block'
    stripe.style.display = 'none'
    stripeOne.style.display = 'none'


})

displayWord()