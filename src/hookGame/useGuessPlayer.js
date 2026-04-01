import { useState } from "react";
import useAllJoueurs from "../hooks/useAllJoueurs";

const useGuessPlayer = () => {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [count, setCount] = useState(0);
  const [victory, setVictory] = useState(false);


  const {listeJoueur} = useAllJoueurs();

  const startGame = () => {
    if(listeJoueur.length === 0) return;
    const index = Math.floor(Math.random() * listeJoueur.length);
    setRandomPlayer(listeJoueur[index]);
    setGuesses([]);
    setCount(0);
    setVictory(false);
  };

  const submitGuess = (player) => {
    const isCorrect = player.firstName === randomPlayer?.firstName;

    setGuesses(prev => [...prev, player]);
    setCount(prev => prev + 1);
    setVictory(isCorrect);
  };
  

  return {
    randomPlayer,
    guesses,
    setGuesses,
    count,
    victory,
    startGame,
    submitGuess,
    listeJoueur,
    setCount,
    setVictory
    
  };
};

export default useGuessPlayer;