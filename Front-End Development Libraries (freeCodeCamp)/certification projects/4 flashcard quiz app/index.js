"use strict";
class InvalidUserInputError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUserInputError";
    }
}
const currentCards = [
    { questionText: "What does HTML stand for?", questionAnswer: "HyperText Markup Language" },
    { questionText: "Which keyword declares a block-scoped variable?", questionAnswer: "let (or const)" },
];
let currentIndex = 0;
const cardEl = document.getElementById("flashcard");
const frontEl = document.getElementById("card-front");
const backEl = document.getElementById("card-back");
const counterEl = document.getElementById("counter");
const deleteBtn = document.getElementById("delete-btn");
const form = document.getElementById("entry-form");
const frontInput = document.getElementById("front-text");
const backInput = document.getElementById("back-text");
const errorEl = document.getElementById("error-msg");
function render() {
    cardEl.classList.remove("flipped");
    const card = currentCards[currentIndex];
    if (!card) {
        frontEl.textContent = "No cards left. Add one below!";
        backEl.textContent = "";
        counterEl.textContent = "0 / 0";
        return;
    }
    frontEl.textContent = card.questionText;
    backEl.textContent = card.questionAnswer;
    counterEl.textContent = `${currentIndex + 1} / ${currentCards.length}`;
}
cardEl.addEventListener("click", () => {
    cardEl.classList.add("flipped");
});
deleteBtn.addEventListener("click", () => {
    if (currentCards.length === 0)
        return;
    currentCards.splice(currentIndex, 1);
    currentIndex = Math.max(0, currentIndex - 1); // show the previous card
    render();
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const questionText = frontInput.value.trim();
    const questionAnswer = backInput.value.trim();
    if (!questionText || !questionAnswer) {
        errorEl.textContent = "Both the question and the answer are required.";
        throw new InvalidUserInputError("Question and answer must not be empty.");
    }
    errorEl.textContent = "";
    currentCards.push({ questionText, questionAnswer });
    currentIndex = currentCards.length - 1; // new card becomes current
    form.reset();
    render();
});
render();
