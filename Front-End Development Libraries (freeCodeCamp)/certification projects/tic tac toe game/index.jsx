
const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function checkWinner(board) {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[b] === board[c]
      ) {
        return board[a];
      }
    }

    return null;
  }

  function handleClick(index) {
    // Stop if the game has ended or square is occupied
    if (squares[index] || winner || isDraw) return;

    const newSquares = [...squares];
    newSquares[index] = currentPlayer;

    setSquares(newSquares);

    const gameWinner = checkWinner(newSquares);

    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newSquares.every(square => square !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>

      <p className="status">
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a Draw!"
          : `Current Player: ${currentPlayer}`}
      </p>

      <div className="board">
        {squares.map((square, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      <button id="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
