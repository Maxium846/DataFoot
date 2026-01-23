import { useParams } from "react-router-dom";
import useClub from "../../hooks/useClub";

const FicheClub =() => {


  const { clubId } = useParams();
  console.log(clubId)
  const { ficheClub, loading, error } = useClub(clubId);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!ficheClub) return <p>Aucun club trouvé</p>;

  return (
    <div>
      <h2>{ficheClub.name}</h2>
      {/* ajoute ici stats, classement, etc */}
    </div>
  );

}

export default FicheClub;