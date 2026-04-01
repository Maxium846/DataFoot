import { useEffect, useMemo, useState } from "react";
import { getAllJoueur } from "../../../api/joueurs";
import "../../../css/guessThePlayer.css";
import GuessAffichage from "./GuessAffichage";
import GuessPlayerInput from "./GuessPlayerInput";
const GuessThePlayer = () => {
  const [listeJoueur, setListeJoueur] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [name, setName] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [composant, setComposant] = useState(false);
  const [guesse, setGuess] = useState([]);
  const [count, setCount] = useState(null);
  const [victoire, setVictoire] = useState(false);

  const indice = useMemo(() => {
    if (!randomPlayer) return [];

    return [
      { seuil: 2, text: "la nation est " + randomPlayer.nation },

      {
        seuil: 3,
        text: (
          <>
            le club du joueur est {""}{" "}
            <img className="logoStat" src={randomPlayer.logo}></img>{" "}
          </>
        ),
      },
    ];
  }, [randomPlayer]);

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
    const fetchData = async () => {
      const data = await getAllJoueur();
      setListeJoueur(data);
    };
    fetchData();
  }, []);

  const pickRandom = () => {
    if (listeJoueur.length === 0) return;
    setGuess([]);
    setCount(0);
    setVictoire(false);
    setName("");
    const index = Math.floor(Math.random() * listeJoueur.length);
    setRandomPlayer(listeJoueur[index]);
  };

  // Normalisation pour accents et majuscules
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

  const handleSelect = (player) => {
    setSelectedPlayer(player); // selectione le joueur pour le comparer a randomPlayer
    setName(player.firstName); // remplit l'input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!randomPlayer || !selectedPlayer) return;
    setComposant(true);
    vic();
    setGuess((prev) => [...prev, selectedPlayer]);
    setName("");
    setCount((prev) => prev + 1);
    setSelectedPlayer(null);
  };

  const vic = () => {
    if (!randomPlayer || !selectedPlayer) return;

    if (randomPlayer.firstName === selectedPlayer.firstName) {
      setVictoire(true);
    }
  };
  console.log(randomPlayer);
  console.log(selectedPlayer)
  return (
    <>
      <div>
        {" "}
        <button onClick={pickRandom}>Génerer joueur</button>
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

        {composant && (
          <GuessAffichage random={randomPlayer} guess={guesse}></GuessAffichage>
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
          {victoire && (
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
