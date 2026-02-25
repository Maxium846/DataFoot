import { useNavigate, useParams } from "react-router-dom";
import useJoueurs from "../../hooks/useJoueurs";
import "../../css/joueurs.css";

const Joueurs = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { joueurs, sortByPosition } =
    useJoueurs(clubId);

  return (
    
      <div className="container-joueurs">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th onClick={sortByPosition} style={{ cursor: "pointer" }}>
              Position ⬍
              </th>
              <th>Date de naissance</th>
              <th>Age</th>
              <th>Nation</th>
            </tr>
          </thead>
          <tbody>
            {joueurs.map((j) => (
              <tr key={j.id}>
                <td onClick={()=> navigate(`/joueurs/${clubId}/${j.id}`)}>{j.firstName}</td>
                <td>{j.lastName}</td>
                <td>{j.position}</td>
                <td>{j.dateDeNaissance}</td>
                <td>{j.age}</td>
                <td>{j.nation}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

      </div>
  );
};
export default Joueurs;
