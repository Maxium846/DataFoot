import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStatByJoueurByChampionnat } from "../../api/joueurs";

const StatChampionnatJoueurs = () => {
  const { leagueId } = useParams();
  const [statJoueur, setStatJoueur] = useState([]);

  useEffect(() => {
    const fetchStat = async () => {
      const data = await getStatByJoueurByChampionnat(leagueId);

      setStatJoueur(Array.isArray(data) ? data : []);
    };

    fetchStat();
  }, [leagueId]);

 

  return (
    <table>
      <thead>
        <tr>
          <th>Rang</th>
          <th>nom</th>
          <th>TotalBut</th>
          <th>Equipe</th>
        </tr>
      </thead>

      <tbody>
        {statJoueur.map((stat, index) => (
          <tr key={stat.playerId}>
            <td>{index + 1}</td>
            <td>{stat.name}</td>
            <td>{stat.totalBut}</td>
            <td>{stat.clubName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default StatChampionnatJoueurs;
