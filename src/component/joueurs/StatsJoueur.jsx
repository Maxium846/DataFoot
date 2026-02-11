import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJoueurById, getStatByJoueur } from "../../api/joueurs";
import "../../css/joueurs.css";

const StatJoueurs = () => {
  const { joueurId } = useParams();

  const [joueur, setJoueur] = useState(null);
  const [stat, setStat] = useState(null);

  useEffect(() => {
    const fetchJoueur = async () => {
      const data = await getJoueurById(joueurId);

      const datastat = await getStatByJoueur(joueurId);
      setJoueur(data);
      setStat(datastat);
    };

    fetchJoueur();
  }, [joueurId]);
  if (!joueur) return <p>Chargement...</p>;

  return (
    <div>
      <div className="player-card">
        <div className="player-header">
          <div className="player-avatar">
            {joueur.firstName?.[0]}
            {joueur.lastName?.[0]}
          </div>

          <div>
            <h2>
              {joueur.firstName} {joueur.lastName}
            </h2>
            <p className="player-position">{joueur.position}</p>
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
              <td>{stat?.redCards}</td>
              <td>{stat?.yellowCards}</td>
              <td>{stat?.minutesPlayed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatJoueurs;
