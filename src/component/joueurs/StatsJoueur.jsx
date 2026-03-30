import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJoueurById, getJoueurs, getStatByJoueur } from "../../api/joueurs";
import "../../css/joueurs.css";

const StatJoueurs = () => {
  const { joueurId, clubId } = useParams();

  const navigate = useNavigate();
  const [joueur, setJoueur] = useState(null);
  const [stat, setStat] = useState(null);
  const [club, setClub] = useState([]);

  const [selectedPlayer, setSelectedPlayer] = useState("");

  useEffect(() => {
    const fetchJoueur = async () => {
      const data = await getJoueurById(joueurId);
      const datastat = await getStatByJoueur(joueurId);
      const dataClub = await getJoueurs(clubId);
      setJoueur(data);
      setStat(datastat);
      setClub(dataClub);
    };

    fetchJoueur();
  }, [joueurId, clubId]);
  const handleChange = (e) => {
    const playerId = e.target.value;
    setSelectedPlayer(playerId);
    navigate(`/joueurs/${clubId}/${playerId}`);
  };
  if (!joueur) return <p>Chargement...</p>;

  return (
    <div>
      <div>
        <select onChange={handleChange}>
          <option value={selectedPlayer}>-- Joueur</option>
          {club.map((c) => (
            <option
              onClick={() => navigate(`/joueurs/${clubId}/${c.id}`)}
              key={c.id}
              value={c.id}
            >
              {c.firstName}
            </option>
          ))}
        </select>
      </div>
      <div className="player-card">
        <div className="player-header">
          <div>
            <img src={joueur.photo}></img>
          </div>

          <div>
            <h2>
              {joueur.firstName} {joueur.lastName}
            </h2>
          </div>
        </div>

        <div className="player-info">
          <div className="info-row">
            <span>Âge</span>
            <strong>{joueur.age}</strong>
          </div>

          <div className="info-row">
            <span>Date de naissance</span>
            <strong>{joueur.dateDeNaissance}</strong>
          </div>

          <div className="info-row">
            <span>Nation</span>
            <strong>{joueur.nation}</strong>
          </div>

          <div className="info-row">
            <span>Club</span>
            <strong>{joueur.clubName}</strong>
          </div>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>MJ</th>
              <th>But</th>
              <th>PD</th>
              <th>CR</th>
              <th>CJ</th>
              <th>Minutes Joué</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{stat?.matchesPlayed}</td>
              <td>{stat?.goals}</td>
              <td>{stat?.assists}</td>
              <td>{stat?.redCard}</td>
              <td>{stat?.yellowCard}</td>
              <td>{stat?.minutesPlayed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatJoueurs;
