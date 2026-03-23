import { useNavigate } from "react-router-dom";

const StatButeur = ({statButeur}) => {

      const navigate = useNavigate();
    

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
        {statButeur.map((stat, index) => (
          <tr key={stat.playerId}>
            <td >{index + 1}</td>
            <td className="player" onClick={()=>navigate(`/joueurs/${stat.clubId}/${stat.playerId}`)}>{stat.name}</td>
            <td>{stat.totalBut}</td>
            <td>{stat.clubName}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}
export default StatButeur;