import { useEffect, useState } from "react";
import { getAllJoueur } from "../../../api/joueurs";
import "../../../css/guessThePlayer.css";
import GuessAffichage from "./GuessAffichage";

const GuessThePlayer = () => {
  const [listeJoueur, setListeJoueur] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [name, setName] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null); // joueur sélectionné
  const [composant, setComposant] = useState(false);
  const [guesse, setGuess] = useState([]);
  const [count, setCount] = useState(null);

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
    const index = Math.floor(Math.random() * listeJoueur.length);
    setRandomPlayer(listeJoueur[index]);
  };

  const tentative = (count) => {
    if (count === 2) {
      return " La nation du joueur est " + randomPlayer.nation;
    }else if(count === 5){
        return "le club du joueur est" + randomPlayer.clubName
    }
  };
  // Normalisation pour accents et majuscules
  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Liste filtrée et limitée à 10
  const filteredPlayers = name
    ? listeJoueur
        .filter((player) =>
          normalize(`${player.firstName}`).includes(normalize(name)),
        )
        .slice(0, 5)
    : [];

  const handleSelect = (player) => {
    setSelectedPlayer(player);
    setName(`${player.firstName}`); // remplit l'input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!randomPlayer) return;
    setComposant(true);
    setGuess((prev) => [...prev, selectedPlayer]);
    setName("");
    setCount((prev) => prev + 1);
    setSelectedPlayer(null);
  };
  console.log(randomPlayer);
  return (
    <>
      <div>
        {" "}
        <button onClick={pickRandom}>Génerer joueur</button>
      </div>
       <div>
          {" "}
          <h1> Un indice toute les 5 tentative {tentative(count)}</h1>
        </div>
      <div className="div">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Tapez un joueur..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSelectedPlayer(null);
            }}
          />

          {name && !selectedPlayer && filteredPlayers.length > 0 && (
            <ul
              style={{
                border: "1px solid #ccc",
                margin: 0,
                padding: 0,
                listStyle: "none",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {filteredPlayers.map((player) => (
                <li
                  key={player.id}
                  onClick={() => handleSelect(player)}
                  style={{ padding: "8px", cursor: "pointer" }}
                >
                  {player.firstName} :{player.clubName}
                </li>
              ))}
            </ul>
          )}
          <button type="submit" style={{ marginTop: "10px" }}>
            Valider
          </button>
        </form>
      </div>

      <div>
        {/* Affiche le joueur sélectionné avec détails */}

        {composant && (
          <GuessAffichage random={randomPlayer} guess={guesse}></GuessAffichage>
        )}
      </div>
      <div>
        <h1> Nombre de tentative {count}</h1>
      </div>
    </>
  );
};

export default GuessThePlayer;
