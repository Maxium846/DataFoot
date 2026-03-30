import { useNavigate } from "react-router-dom";
import "../../../css/statJoueur.css";

const StatPasseur = ({ statPasseur, trierPass }) => {
  const navigate = useNavigate();
  const conversionPasse = (passeReussi, totalPasse) => {
    return Math.trunc((passeReussi / totalPasse) * 100);
  };
  console.log();
  return (
    <table>
      <thead>
        <tr>
          <th>Rang</th>
          <th>nom</th>
          <th className="player" onClick={() => trierPass("assist")}>
            Passes décisives
          </th>
          <th className="player" onClick={() => trierPass("keyPasse")}>
            Passes Clé
          </th>
          <th className="player" onClick={()=> trierPass("totalPasse")}>Total Passe</th>
          <th className="player" onClick={()=>trierPass("accuracyPass")}>Precision Passe</th>
          <th>Equipe</th>
        </tr>
      </thead>

      <tbody>
        {statPasseur.map((stat, index) => (
          <tr key={`${stat.playerId}-${stat.clubId}`}>
            <td>{index + 1}</td>
            <td
              className="player"
              onClick={() =>
                navigate(`/joueurs/${stat.clubId}/${stat.playerId}`)
              }
            >
              {stat.name}
            </td>
            <td>{stat.assist}</td>
            <td>{stat.keyPasse}</td>
            <td>{stat.totalPasse}</td>
            <td>{conversionPasse(stat.accuracyPass, stat.totalPasse) + "%"}</td>
            <td className="club-cell">
              <span>{stat.clubName}</span>
              {<img className="logoStat" src={stat.logo}></img>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default StatPasseur;
