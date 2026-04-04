import { useState } from "react";
import useAllJoueurs from "../hooks/useAllJoueurs";
import { getJoueurs } from "../api/joueurs";

const useGuessPlayer = (view) => {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [count, setCount] = useState(0);
  const [victory, setVictory] = useState(false);
  const [club, setClub] = useState([]);
  const { listeJoueur } = useAllJoueurs(view);

    

  const startGame = async () => {
    
    if (listeJoueur.length === 0) return;
    const index = Math.floor(Math.random() * listeJoueur.length);
    const player = listeJoueur[index]
    setRandomPlayer(player);
    setGuesses([]);
    setCount(0);
    setVictory(false);

    const data = await getJoueurs(player.clubId);

    setClub(data);

  }
  const submitGuess = (player) => {
    if (!randomPlayer || !player) return;

    const isCorrect = player.firstName === randomPlayer.firstName;

    setGuesses((prev) => [...prev, player]);
    setCount((prev) => prev + 1);
    setVictory(isCorrect);
  };

  const resetGame = () => {
    setCount(0);
    setRandomPlayer(null);
    setGuesses([]);
    setVictory(false);
  };

  return {
    randomPlayer,
    guesses,
    count,
    victory,
    startGame,
    submitGuess,
    listeJoueur,
    resetGame,
    club
  };
};

export default useGuessPlayer;
