document.addEventListener('DOMContentLoaded', () => {
    const wordleGrid = document.getElementById('wordle-grid');
    const wordInput = document.getElementById('word-input');
    const submitButton = document.getElementById('submit-button');
    const message = document.getElementById('message');

    const targetWord = 'apple'; // This would be dynamically set in a real app
    const maxAttempts = 6;
    let attempts = 0;

    function createGrid() {
        for (let i = 0; i < maxAttempts * 5; i++) {
            const cell = document.createElement('div');
            cell.classList.add('border', 'border-gray-400', 'w-12', 'h-12', 'flex', 'items-center', 'justify-center', 'text-xl', 'font-bold');
            wordleGrid.appendChild(cell);
        }
    }

    function checkWord() {
        const inputWord = wordInput.value.toLowerCase();
        if (inputWord.length !== 5) {
            message.textContent = 'Please enter a 5-letter word.';
            return;
        }

        if (attempts >= maxAttempts) {
            message.textContent = 'No more attempts left!';
            return;
        }

        const gridCells = wordleGrid.children;
        for (let i = 0; i < 5; i++) {
            const cell = gridCells[attempts * 5 + i];
            cell.textContent = inputWord[i];
            if (inputWord[i] === targetWord[i]) {
                cell.classList.add('bg-green-500', 'text-white');
            } else if (targetWord.includes(inputWord[i])) {
                cell.classList.add('bg-yellow-500', 'text-white');
            } else {
                cell.classList.add('bg-gray-300');
            }
        }

        attempts++;
        wordInput.value = '';

        if (inputWord === targetWord) {
            message.textContent = 'Congratulations! You guessed the word!';
            submitButton.disabled = true;
        } else if (attempts >= maxAttempts) {
            message.textContent = `Game over! The word was "${targetWord}".`;
            submitButton.disabled = true;
        }
    }

    createGrid();

    submitButton.addEventListener('click', checkWord);
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkWord();
        }
    });
});