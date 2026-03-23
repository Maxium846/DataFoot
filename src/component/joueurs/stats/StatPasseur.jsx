import { useNavigate } from "react-router-dom";

const StatPasseur = ({statPasseur}) => {

    const navigate = useNavigate();

    console.log()
    return (

          <table>
      <thead>
        <tr>
          <th>Rang</th>
          <th>nom</th>
          <th>totalPasse</th>
          <th>Equipe</th>
        </tr>
      </thead>

      <tbody>
        {statPasseur.map((stat, index) => (
          <tr key={stat.playerId}>
            <td >{index + 1}</td>
            <td className="player" onClick={()=>navigate(`/joueurs/${stat.clubId}/${stat.playerId}`)}>{stat.name}</td>
            <td>{stat.assist}</td>
            <td>{stat.clubName}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}
export default StatPasseur;