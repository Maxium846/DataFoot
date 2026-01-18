import { useEffect, useState } from "react";
import { createClub, getClubs } from "../api/api";

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
  return {
    clubs,
    loading,
    error,
    addClub
  };
};

export default useClubs;
