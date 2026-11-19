interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUserInputError";
  }
}

const currentCards: FlashCard[] = [
  { questionText: "What does HTML stand for?", questionAnswer: "HyperText Markup Language" },
  { questionText: "Which keyword declares a block-scoped variable?", questionAnswer: "let (or const)" },
];
let currentIndex = 0;

const cardEl = document.getElementById("flashcard") as HTMLDivElement;
const frontEl = document.getElementById("card-front") as HTMLDivElement;
const backEl = document.getElementById("card-back") as HTMLDivElement;
const counterEl = document.getElementById("counter") as HTMLParagraphElement;
const deleteBtn = document.getElementById("delete-btn") as HTMLButtonElement;
const form = document.getElementById("entry-form") as HTMLFormElement;
const frontInput = document.getElementById("front-text") as HTMLTextAreaElement;
const backInput = document.getElementById("back-text") as HTMLTextAreaElement;
const errorEl = document.getElementById("error-msg") as HTMLParagraphElement;

function render(): void {
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
  if (currentCards.length === 0) return;
  currentCards.splice(currentIndex, 1);
  currentIndex = Math.max(0, currentIndex - 1); // show the previous card
  render();
});

form.addEventListener("submit", (event: Event) => {
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