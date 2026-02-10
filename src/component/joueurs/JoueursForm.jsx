import { useState } from "react";

const JoueursForm = ({ onSubmit, clubId }) => {
  const [newJoueur, setNewJoueur] = useState({
    firstName: "",
    lastName: "",
    position: "",
    dateDeNaissance: "",
    nation: "",
    clubId : Number(clubId) // envoyer l’objet Club directement
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newJoueur); // envoie un objet correctement formé
    // Reset form
    setNewJoueur({
      firstName: "",
      lastName: "",
      position: "",
      dateDeNaissance: "",
      nation: "",
      club: { id: clubId }
    });
  };

  const handleChange = (field, value) => {
    if (field === "clubId") return; // on ne change pas club ici
    setNewJoueur({ ...newJoueur, [field]: value });
  };


 

// dans ton map


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Prénom"
        value={newJoueur.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Nom"
        value={newJoueur.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Position"
        value={newJoueur.position}
        onChange={(e) => handleChange("position", e.target.value)}
        required
      />

      {/* input type=date → produit YYYY-MM-DD pour LocalDate */}
      <input
        type="date"
        value={newJoueur.dateDeNaissance}
        onChange={(e) => handleChange("dateDeNaissance", e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Nation"
        value={newJoueur.nation}
        onChange={(e) => handleChange("nation", e.target.value)}
        required
      />

      <button type="submit">Valider</button>
    </form>
  );
};

export default JoueursForm;
