import { useEffect, useState } from "react";
import { createClub, deleteClub, getClubs } from "../api/api";

const useClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClubs()
      .then((data) => setClubs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);


  async function addClub(club) {
    const created = await createClub(club);
    setClubs([...clubs, created]);
  }

  async function handleDelete(id){

   if(!window.confirm("Supprimer ce club"))return;

   await deleteClub(id)
   setClubs(clubs.filter((club) =>club.id !== id))
  }

  return {
    clubs,
    loading,
    error,
    addClub,
    handleDelete
  };
};

export default useClubs;
