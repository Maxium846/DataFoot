import { useState } from "react";

const ClubForm = ({ onSubmit,leagueId }) => {
  const [name, setName] = useState("");

 const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; // sécurité
    onSubmit({ name, leagueId: Number(leagueId) }); // ⚡ on envoie l'objet attendu
    setName(""); // reset du champ
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du club"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default ClubForm;
