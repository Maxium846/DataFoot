import { useEffect, useState } from "react";
import {getLeagueDetailById } from "../api/leaguesApi";

export default function useClubs(leagueId) {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    if (!leagueId) return;

    getLeagueDetailById(leagueId)
      .then(setClubs)
      .catch(console.error);
  }, [leagueId]);

  const addClub = (club) => {
    setClubs((prev) => [...prev, club]);
  };

  const handleDelete = (id) => {
    setClubs((prev) => prev.filter((club) => club.id !== id));
  };

  return { clubs, addClub, handleDelete, setClubs};
}
