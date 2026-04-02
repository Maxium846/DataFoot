import { useState } from "react";
import useAllJoueurs from "../hooks/useAllJoueurs";

const useGuessPlayer = (view) => {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [count, setCount] = useState(0);
  const [victory, setVictory] = useState(false);

  const { listeJoueur } = useAllJoueurs(view);

  const startGame = () => {
    if (listeJoueur.length === 0) return;
    const index = Math.floor(Math.random() * listeJoueur.length);
    setRandomPlayer(listeJoueur[index]);
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

  const resetGame= () => {

    setCount(0);
    setRandomPlayer(null);
    setGuesses([]);
    setVictory(false);
  }

  return {
    randomPlayer,
    guesses,
    count,
    victory,
    startGame,
    submitGuess,
    listeJoueur,
    resetGame
  };
};

export default useGuessPlayer;
