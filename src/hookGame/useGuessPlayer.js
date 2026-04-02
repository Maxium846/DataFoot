import { useState } from "react";
import useAllJoueurs from "../hooks/useAllJoueurs";

const useGuessPlayer = () => {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [count, setCount] = useState(0);
  const [victory, setVictory] = useState(false);

  const { listeJoueurGuessFacile } = useAllJoueurs();

  const startGame = () => {
    if (listeJoueurGuessFacile.length === 0) return;
    const index = Math.floor(Math.random() * listeJoueurGuessFacile.length);
    setRandomPlayer(listeJoueurGuessFacile[index]);
    setGuesses([]);
    setCount(0);
    setVictory(false);
  };

  const submitGuess = (player) => {
    if (!randomPlayer || !player) return;

    const isCorrect = player.firstName === randomPlayer.firstName;

    setGuesses((prev) => [...prev, player]);
    setCount((prev) => prev + 1);
    setVictory(isCorrect);
  };


  return {
    randomPlayer,
    guesses,
    setGuesses,
    count,
    victory,
    startGame,
    listeJoueurGuessFacile,
    setCount,
    setVictory,
    submitGuess,
  };
};

export default useGuessPlayer;
