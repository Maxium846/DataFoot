import useClubs from "../../hooks/useClubs";
import ClubForm from "./ClubForm";

export default function ClubList() {
 
const {clubs,addClub} = useClubs();

  return (
    <div>
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Ligue</th>
          <th>Pays</th>
          <th>Joueur</th>
        </tr>
      </thead>
      <tbody>
        {clubs.map(club => (
          <tr key={club.id}>
            <td>{club.name}</td>
            <td>{club.league}</td>
            <td>{club.country}</td>
            <td>
        {club.player && club.player.length > 0
          ? club.player.map(play => play.name).join(", ")
          : "Aucun joueur"}
      </td>
          </tr>
        ))}
      </tbody>
    </table>

    <ClubForm onSubmit = {addClub}></ClubForm>
    </div>
  );
}
