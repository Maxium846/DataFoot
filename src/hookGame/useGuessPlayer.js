import { useState, useEffect } from "react";
import useAllJoueurs from "../hooks/useAllJoueurs";
import { getJoueurs } from "../api/joueurs";

const useGuessPlayer = (view) => {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [count, setCount] = useState(0);
  const [victory, setVictory] = useState(false);
  const [club, setClub] = useState([]);
  const { listeJoueur } = useAllJoueurs(view);


  useEffect(() => {
    if (listeJoueur.length === 0  || randomPlayer) return;

    
      const fetchData =  () => {
        const index = Math.floor(Math.random() * listeJoueur.length);
        setRandomPlayer(listeJoueur[index]);
      };
      fetchData();
    
  }, [listeJoueur, randomPlayer]);

  useEffect(() => {
    if (!randomPlayer) return;
    const fetchClub = async () => {
      const data = await getJoueurs(randomPlayer.clubId);
      setClub(data);
    };
    fetchClub();
  }, [randomPlayer]);
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
    setClub([]);
  };

  return {
    randomPlayer,
    guesses,
    count,
    victory,
    submitGuess,
    listeJoueur,
    resetGame,
    club,
  };
};

export default useGuessPlayer;
