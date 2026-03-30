import { useNavigate } from "react-router-dom";
import "../../../css/ficheC.css";
import "../../../css/statJoueur.css";

const StatButeur = ({ statOffensive, trierStat }) => {
  const navigate = useNavigate();

  const conversionTirTirCadre = (shootOntarget, totalShoot) => {
    return Math.trunc((shootOntarget / totalShoot) * 100);
  };
  const conversionbutTire = (goal, totalShoot) => {
    return Math.trunc((goal / totalShoot) * 100);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Rang</th>
          <th>nom</th>
          <th className="player" onClick={() => trierStat("totalBut")}>
            Buts
          </th>

          <th
            className="player"
            onClick={() => trierStat("totalShoot")}
          >
            Tirs
          </th>
          <th
            className="player"
            onClick={() => trierStat("shootOnTarget")}
          >
            Tirs cadrés
          </th>
          <th>Ratio tir/tirCadré</th>
          <th>Ratio But/tir</th>
          <th>Equipe</th>
        </tr>
      </thead>

      <tbody>
        {statOffensive.map((stat, index) => (
          //clé stat.club id necessaire car un joueur peux changer de club en cours de saison , il se retrouve alors avec deux clés 
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
            <td>{stat.totalBut}</td>

            <td>{stat.totalShoot}</td>
            <td>{stat.shootOnTarget}</td>
            <td>
              {conversionTirTirCadre(stat.shootOnTarget, stat.totalShoot) +"%"}
            </td>
            <td>{conversionbutTire(stat.totalBut, stat.totalShoot) + "%"}</td>

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
export default StatButeur;
