import "../../css/guessThePlayer.css";
import GuessAffichage from "./GuessAffichage";
import GuessPlayerInput from "./GuessPlayerInput";
import useGuessPlayer from "../../hookGame/useGuessPlayer";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
const GuessThePlayer = () => {
  const [name, setName] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [view, setView] = useState("Facile");

  const longText = "Il y a trois niveaux de difficulté , Facile, Intermediaire et Difficile."
  +" Le niveau facile regroupe l'ensemble des joueurs des 5 premiers de Championnats , intermediaire les 10 et difficile l'ensemble des joueurs ";
  const {
    listeJoueur,
    guesses,
    startGame,
    randomPlayer,
    count,
    victory,
    submitGuess,
    resetGame,
  } = useGuessPlayer(view);

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredPlayers = name
    ? listeJoueur
        .filter((player) =>
          normalize(player.firstName).includes(normalize(name)),
        )
        .slice(0, 30)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPlayer) return;

    submitGuess(selectedPlayer);
    setName("");
    setSelectedPlayer(null);
  };
  const handleSelect = (player) => {
    setSelectedPlayer(player);
    setName(player.firstName);
  };
  const indice = randomPlayer
    ? [
        { seuil: 5, text: "la nation est " + randomPlayer.nation },
        {
          seuil: 7,
          text: (
            <>
              le club du joueur est {" "}
              {randomPlayer.clubName}
              <img className="logoStat" src={randomPlayer.logo} />
            </>
          ),
        },
        {
          seuil : 10,
          text : " L'age du joueur est  "  + randomPlayer.age
        }
      ]
    : [];
  const indicateur = [
    {
      item: "",
      texte: "correct",
    },
    {
      item: "",
      texte: "incorect",
    },
    {
      item: "⬆️",
      texte: " moins agé",
    },
    {
      item: "⬇️",
      texte: "plus agé",
    },
  ];

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  console.log(listeJoueur);
  console.log(randomPlayer);
  return (
    <>
      <div>
        <select
          value={view}
          onChange={(e) => {
            setView(e.target.value);
          }}
        >
          <option value={"Facile"}>Facile</option>
          <option value={"Intermediaire"}>Intermediaire</option>
          <option value={"Difficile"}>Difficile</option>
        </select>
          <Tooltip title={longText}>
            <Button>ℹ️</Button>
          </Tooltip>
      </div>

      <div>
        {" "}
        <button onClick={startGame}>Génerer joueur</button>
      </div>
      <div className="tentative">
        <span>Un indice toute les 5 tentatives</span>
        {indice.map((indice, i) => (
          <div key={i}>
            <span>{count >= indice.seuil ? indice.text : ""}</span>
          </div>
        ))}
      </div>

      <div>
        {}
        <GuessPlayerInput
          name={name}
          setName={setName}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          filteredPlayers={filteredPlayers}
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
        ></GuessPlayerInput>
      </div>

      <div>
        {/* Affiche le joueur sélectionné avec détails */}

        {guesses.length > 0 && (
          <GuessAffichage
            random={randomPlayer}
            guess={guesses}
          ></GuessAffichage>
        )}
      </div>
      <div className="indicateurContainer">
        <p className="pIndicateurdeCouleur">Indicateur de couleur</p>
        <div className="tableDesCouleur">
          {indicateur.map((indic, i) => (
            <div className="ligneIndic" key={i}>
              <div
                className={
                  indic.texte === "correct" ? "carreCorrect" : "carreIncorrect"
                }
              >
                <span>{indic.item}</span>
              </div>
              <div className="texteIndic">
                <span>{indic.texte}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1> Nombre de tentative {count}</h1>
      </div>

      <div className="victoire">
        <span>
          {victory && (
            <div>
              <p>Félicitation tu as trouvé le joueur 🥳</p>
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExczZ6c2o0ZDR6dXNtMHo5djQwcHd5NnY0dzl3cmlmdHhzeHdzbW15ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TjAcxImn74uoDYVxFl/giphy.gif"
                alt="victoire"
              ></img>
            </div>
          )}{" "}
        </span>
      </div>
    </>
  );
};

export default GuessThePlayer;
