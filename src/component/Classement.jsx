import React from "react";
import "../css/classement.css";
import { useNavigate, useParams } from "react-router-dom";

const Classement = ({ classement, loading }) => {
    const navigate = useNavigate()
    const {leagueId} = useParams()
  if (loading) return <p>Chargement classement...</p>;
  if (!classement || classement.length === 0)
    return <p>Aucun classement disponible.</p>;

  return (
    <div className="page">
      <table className="classement-table">
        <thead>
          <tr>
            <th>Rang</th>
            <th>Club</th>
            <th>MJ</th>
            <th>Points</th>
            <th>V</th>
            <th>N</th>
            <th>D</th>
            <th>GA</th>
            <th>GC</th>
            <th>Diff. Buts</th>
          </tr>
        </thead>
        <tbody className="classement-container">
          {classement.map((c, index) => (
            <tr key={c.clubId}>
              <td>{index + 1}</td>
              <td onClick={() =>navigate(`/ficheClub/${leagueId}/${c.clubId}`)}>{c.clubName}</td>
              <td>{c.played}</td>
              <td>{c.points}</td>
              <td>{c.wins}</td>
              <td>{c.draws}</td>
              <td>{c.losses}</td>
              <td>{c.goalsFor}</td>
              <td>{c.goalsAgainst}</td>
              <td>{c.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classement;
