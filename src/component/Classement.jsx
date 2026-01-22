import { Link, useParams } from "react-router-dom";
import useClassement from "../hooks/useClassement";

export default function Classement() {
  const { leagueId } = useParams();
  const { classement } = useClassement(leagueId);

  return (
    <div>
      <h2>Classement</h2>

<buttonn><Link to={`/championnat/${leagueId}/clubs`}>
  Voir les clubs
</Link></buttonn>
      {classement.length === 0 ? (
        <p>Aucun classement disponible</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>Club</th>
              <th>Pts</th>
              <th>MJ</th>
              <th>V</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
            </tr>
          </thead>
          <tbody>
            {classement.map((c, index) => (
              <tr key={c.clubId}>
                <td>{index + 1}</td>
                <td>{c.clubName}</td>
                <td>{c.points}</td>
                <td>{c.played}</td>
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
      )}
    </div>
  );
}
