export function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function calculateTurns(squares: (string | null)[]) {
  return squares.filter((square) => !square).length;
}

export function calcuateStatus(
  winner: string | null,
  turns: number,
  player: string,
) {
  if (!winner && !turns) {
    return "Draw";
  }

  if (winner) {
    return `${winner} wins!`; // Use winner instead of player
  }

  return `Next player: ${player}`;
}
