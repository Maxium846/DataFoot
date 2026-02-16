import { useEffect, useState } from "react";
import {
  createEvent,
  getMatchById,
  getMatchLineup,
  getMatchStatByMatchId,
  updateMatchScore,
} from "../../api/matchApi";
import { useParams } from "react-router-dom";
import Terrain from "./Terrains";

const MatchDetails = ({ onMatchValidated }) => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [lineups, setLineups] = useState([]);
  const [events, setEvents] = useState([]);

  const [event, setEvent] = useState({
    matchId: Number(matchId),
    playerId: null,
    clubId: null,
    eventType: "",
    minutes: "",
  });
  const [searchPlayer, setSearchPlayer] = useState("");
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);

  // 🔹 Charger match
  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(matchId);
      setMatch(data);
    };
    fetchMatch();
  }, [matchId]);

  // 🔹 Charger compos
  useEffect(() => {
    if (!match) return;
    const fetchLineups = async () => {
      const data = await getMatchLineup(match.id);
      setLineups(data);
    };
    fetchLineups();
  }, [match]);

  // 🔹 Charger events
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getMatchStatByMatchId(matchId);
      setEvents(data);
    };
    fetchEvents();
  }, [matchId]);

  // 🔹 Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event.playerId || !event.eventType || !event.minutes || !event.clubId) return;

    try {
      const newEvent = await createEvent(event);
      setEvents((prev) => [...prev, newEvent]);
      setEvent({
        matchId: Number(matchId),
        playerId: null,
        clubId: null,
        eventType: "",
        minutes: "",
      });
      setSearchPlayer("");
      setAutocompleteOpen(false);
    } catch (err) {
      console.error("Erreur création event :", err);
    }
  };

  // 🔹 Valider le match
  const handleValidateMatch = async () => {
    if (!match || match.status === "FINISHED") return;

    const homeGoals = events.filter(
      (e) => e.eventType === "GOAL" && e.clubId === match.homeClubId
    ).length;
    const awayGoals = events.filter(
      (e) => e.eventType === "GOAL" && e.clubId === match.awayClubId
    ).length;

    try {
      // Update score en DB
      await updateMatchScore(matchId, homeGoals, awayGoals);

    

      // Refresh match pour le score final + statut
      const updatedMatch = await getMatchById(matchId);
      setMatch(updatedMatch);

      // Notifier le parent pour refresh MatchTables / Classement
      if (onMatchValidated) onMatchValidated();

      alert("Match validé !");
    } catch (err) {
      console.error("Erreur validation match :", err);
    }
  };

  if (!match) return <p>Chargement du match...</p>;

  const homePlayers = lineups.filter((l) => l.clubId === match.homeClubId && l.starter);
  const awayPlayers = lineups.filter((l) => l.clubId === match.awayClubId && l.starter);

  const filteredPlayers = lineups.filter((j) =>
    j.playerName.toLowerCase().includes(searchPlayer.toLowerCase())
  );

  // 🔹 Calcul score live
  const homeGoals = events.filter(
    (e) => e.eventType === "GOAL" && e.clubId === match.homeClubId
  );
  const awayGoals = events.filter(
    (e) => e.eventType === "GOAL" && e.clubId === match.awayClubId
  );

  return (
    <div>
      <h2>
        {match.homeClubName} {homeGoals.length} - {awayGoals.length} {match.awayClubName}
      </h2>
      <p>Status : {match.status}</p>

      {/* 🔹 Liste des buteurs */}
      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <strong>{match.homeClubName} :</strong>
          <ul>
            {homeGoals.map((g, i) => {
              const player = lineups.find((p) => p.playerId === g.playerId);
              return <li key={i}>{player?.playerName} ({g.minutes}')</li>;
            })}
          </ul>
        </div>

        <div>
          <strong>{match.awayClubName} :</strong>
          <ul>
            {awayGoals.map((g, i) => {
              const player = lineups.find((p) => p.playerId === g.playerId);
              return <li key={i}>{player?.playerName} ({g.minutes}')</li>;
            })}
          </ul>
        </div>
      </div>

      {/* 🔹 Terrain */}
      <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
        <Terrain players={homePlayers} teamColor="blue" events={events} />
        <Terrain players={awayPlayers} teamColor="red" events={events} />
      </div>

      {/* 🔹 Formulaire événement */}
      {match.status !== "FINISHED" && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            type="number"
            placeholder="Minute"
            value={event.minutes}
            onChange={(e) => setEvent({ ...event, minutes: e.target.value })}
            style={{ marginRight: "10px" }}
          />

          {/* Autocomplete */}
          <div style={{ position: "relative", display: "inline-block", marginRight: "10px" }}>
            <input
              type="text"
              placeholder="Buteur"
              value={searchPlayer}
              onFocus={() => setAutocompleteOpen(true)}
              onBlur={() => setTimeout(() => setAutocompleteOpen(false), 150)}
              onChange={(e) => setSearchPlayer(e.target.value)}
            />

            {autocompleteOpen && filteredPlayers.length > 0 && (
              <ul style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "1px solid #ccc",
                maxHeight: "150px",
                overflowY: "auto",
                listStyle: "none",
                padding: 0,
                margin: 0,
                zIndex: 10
              }}>
                {filteredPlayers.map((j) => (
                  <li
                    key={j.playerId}
                    onMouseDown={() => {
                      setEvent({ ...event, playerId: j.playerId, clubId: j.clubId });
                      setSearchPlayer(j.playerName);
                    }}
                    style={{ padding: "5px", cursor: "pointer" }}
                  >
                    {j.playerName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select
            value={event.eventType}
            onChange={(e) => setEvent({ ...event, eventType: e.target.value })}
            style={{ marginRight: "10px" }}
          >
            <option value="">-- Type --</option>
            <option value="GOAL">But</option>
            <option value="ASSIST">Passe</option>
            <option value="YELLOW_CARD">Jaune</option>
            <option value="RED_CARD">Rouge</option>
          </select>

          <button type="submit">Ajouter</button>
        </form>
      )}

      {/* 🔹 Valider le match */}
      {match.status !== "FINISHED" && (
        <button
          onClick={handleValidateMatch}
          style={{ marginTop: "20px", backgroundColor: "green", color: "white", padding: "5px 10px" }}
        >
          Valider le match
        </button>
      )}
    </div>
  );
};

export default MatchDetails;
