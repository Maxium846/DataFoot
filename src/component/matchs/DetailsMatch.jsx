import { useEffect, useMemo, useState } from "react";
import {
  getMatchById,
  getMatchLineup,
  getMatchStatByMatchId,
} from "../../api/matchApi";
import { useNavigate, useParams } from "react-router-dom";
import Terrain from "./Terrains";

const cardStyle = {
  background: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 14,
  boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
  padding: 14,
};

const sectionTitle = {
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: 0.2,
  opacity: 0.85,
  margin: "0 0 10px 0",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 8,
};

const rowStyle = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: 10,
  padding: "8px 10px",
  borderRadius: 10,
  background: "rgba(0,0,0,0.04)",
};

const pill = (bg) => ({
  fontSize: 12,
  fontWeight: 800,
  padding: "2px 8px",
  borderRadius: 999,
  background: bg,
  color: "white",
  whiteSpace: "nowrap",
});

const MatchDetails = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [lineups, setLineups] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(matchId);
      setMatch(data);
    };
    fetchMatch();
  }, [matchId]);

  useEffect(() => {
    if (!match) return;
    const fetchLineups = async () => {
      const data = await getMatchLineup(match.id);
      setLineups(data);
    };
    fetchLineups();
  }, [match]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getMatchStatByMatchId(matchId);
      setEvents(data);
    };
    fetchEvents();
  }, [matchId]);

  const lineupById = useMemo(
    () => new Map(lineups.map((p) => [p.playerId, p])),
    [lineups],
  );

  if (!match) return <p>Chargement du match...</p>;

  const homePlayers = lineups.filter(
    (l) => l.clubId === match.homeClubId && l.starter,
  );
  const awayPlayers = lineups.filter(
    (l) => l.clubId === match.awayClubId && l.starter,
  );

  const isGoal = (e) =>
    e.eventType === "GOAL" ||
    e.eventType === "PENALTY_GOAL" ||
    e.eventType === "OWN_GOAL";

  const homeGoals = events.filter(
    (e) => isGoal(e) && e.clubId === match.homeClubId,
  );
  const awayGoals = events.filter(
    (e) => isGoal(e) && e.clubId === match.awayClubId,
  );

  const assistGoalHome = events.filter(
    (e) => e.assistName && e.clubId === match.homeClubId,
  );
  const assistGoalAway = events.filter(
    (e) => e.assistName && e.clubId === match.awayClubId,
  );

  const subsHome = events.filter(
    (e) => e.eventType === "SUBSTITUTION" && e.clubId === match.homeClubId,
  );
  const subsAway = events.filter(
    (e) => e.eventType === "SUBSTITUTION" && e.clubId === match.awayClubId,
  );

  // (optionnel) trier chronologiquement
  const byMinute = (a, b) => (a.minutes ?? 0) - (b.minutes ?? 0);

  return (
    <>
      {" "}
      <button onClick={() => navigate(`/match/${matchId}/stats`)}>
        Voir les stats
      </button>
      <div
        style={{
          padding: 16,
          maxWidth: 1100,
          margin: "0 auto",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        {/* Header / Score */}
        <div
          style={{
            ...cardStyle,
            padding: 16,
            marginBottom: 14,
            display: "grid",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "grid", gap: 4 }}>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{match.status}</div>
              <div style={{ fontSize: 20, fontWeight: 900 }}>
                {match.homeClubName}{" "}
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  {homeGoals.length} - {awayGoals.length}
                </span>{" "}
                {match.awayClubName}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={pill("#2563eb")}>Domicile</span>
              <span style={pill("#ef4444")}>Extérieur</span>
            </div>
          </div>
        </div>

        {/* 3 colonnes : Home / Centre / Away */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            gap: 14,
            alignItems: "start",
          }}
        >
          {/* HOME COLUMN */}
          <div style={{ display: "grid", gap: 14 }}>
            <div style={cardStyle}>
              <div style={sectionTitle}>⚽ Buteurs — {match.homeClubName}</div>
              <ul style={listStyle}>
                {[...homeGoals].sort(byMinute).map((g) => {
                  const player = lineupById.get(g.playerId);
                  const name = player?.playerName ?? "Joueur inconnu";
                  return (
                    <li key={g.id} style={rowStyle}>
                      <span style={{ fontWeight: 700 }}>{name}</span>
                      <span style={{ opacity: 0.75 }}>{g.minutes}'</span>
                    </li>
                  );
                })}
                {homeGoals.length === 0 && (
                  <li style={{ opacity: 0.65 }}>Aucun but</li>
                )}
              </ul>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>🅰️ Passes décisives</div>
              <ul style={listStyle}>
                {[...assistGoalHome].sort(byMinute).map((ag) => {
                  const assist = lineupById.get(ag.assistPlayerId);
                  const assistName =
                    assist?.playerName ?? ag.assistName ?? "Inconnu";
                  const scorer =
                    lineupById.get(ag.playerId)?.playerName ?? "Butteur";
                  return (
                    <li key={ag.id} style={rowStyle}>
                      <span>
                        <span style={{ fontWeight: 700 }}>{assistName}</span>{" "}
                        <span style={{ opacity: 0.7 }}>→ {scorer}</span>
                      </span>
                      <span style={{ opacity: 0.75 }}>{ag.minutes}'</span>
                    </li>
                  );
                })}
                {assistGoalHome.length === 0 && (
                  <li style={{ opacity: 0.65 }}>Aucune passe</li>
                )}
              </ul>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>🔁 Changements</div>
              <ul style={listStyle}>
                {[...subsHome].sort(byMinute).map((c) => {
                  const outPlayer = lineupById.get(c.playerOutId);
                  const inPlayer = lineupById.get(c.playerInId);

                  const outName =
                    outPlayer?.playerName ??
                    c.namePlayerOut ??
                    "Sortant inconnu";
                  const inName =
                    inPlayer?.playerName ?? c.namePlayerin ?? "Entrant inconnu";

                  return (
                    <li key={c.id} style={rowStyle}>
                      <span>
                        <span style={{ opacity: 0.75 }}>{outName}</span>{" "}
                        <span style={{ fontWeight: 900 }}>→</span>{" "}
                        <span style={{ fontWeight: 800 }}>{inName}</span>
                      </span>
                      <span style={{ opacity: 0.75 }}>{c.minutes}'</span>
                    </li>
                  );
                })}
                {subsHome.length === 0 && (
                  <li style={{ opacity: 0.65 }}>Aucun changement</li>
                )}
              </ul>
            </div>
          </div>

          {/* CENTER COLUMN: Terrain */}
          <div style={{ display: "grid", gap: 14 }}>
            <div style={cardStyle}>
              <div style={sectionTitle}>📋 Compositions</div>
              <div style={{ display: "grid", gap: 14 }}>
                <Terrain
                  players={homePlayers}
                  teamColor="#2563eb"
                  events={events}
                />
                <Terrain
                  players={awayPlayers}
                  teamColor="#ef4444"
                  events={events}
                />
              </div>
            </div>
          </div>

          {/* AWAY COLUMN */}
          <div style={{ display: "grid", gap: 14 }}>
            <div style={cardStyle}>
              <div style={sectionTitle}>⚽ Buteurs — {match.awayClubName}</div>
              <ul style={listStyle}>
                {[...awayGoals].sort(byMinute).map((g) => {
                  const player = lineupById.get(g.playerId);
                  const name = player?.playerName ?? "Joueur inconnu";
                  return (
                    <li key={g.id} style={rowStyle}>
                      <span style={{ fontWeight: 700 }}>{name}</span>
                      <span style={{ opacity: 0.75 }}>{g.minutes}'</span>
                    </li>
                  );
                })}
                {awayGoals.length === 0 && (
                  <li style={{ opacity: 0.65 }}>Aucun but</li>
                )}
              </ul>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>🅰️ Passes décisives</div>
              <ul style={listStyle}>
                {[...assistGoalAway].sort(byMinute).map((ag) => {
                  const assist = lineupById.get(ag.assistPlayerId);
                  const assistName =
                    assist?.playerName ?? ag.assistName ?? "Inconnu";
                  const scorer =
                    lineupById.get(ag.playerId)?.playerName ?? "Butteur";
                  return (
                    <li key={ag.id} style={rowStyle}>
                      <span>
                        <span style={{ fontWeight: 700 }}>{assistName}</span>{" "}
                        <span style={{ opacity: 0.7 }}>→ {scorer}</span>
                      </span>
                      <span style={{ opacity: 0.75 }}>{ag.minutes}'</span>
                    </li>
                  );
                })}
                {assistGoalAway.length === 0 && (
                  <li style={{ opacity: 0.65 }}>Aucune passe</li>
                )}
              </ul>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>🔁 Changements</div>
              <ul style={listStyle}>
                {[...subsAway].sort(byMinute).map((c) => {
                  const outPlayer = lineupById.get(c.playerOutId);
                  const inPlayer = lineupById.get(c.playerInId);

                  const outName =
                    outPlayer?.playerName ??
                    c.namePlayerOut ??
                    "Sortant inconnu";
                  const inName =
                    inPlayer?.playerName ?? c.namePlayerin ?? "Entrant inconnu";

                  return (
                    <li key={c.id} style={rowStyle}>
                      <span>
                        <span style={{ opacity: 0.75 }}>{outName}</span>{" "}
                        <span style={{ fontWeight: 900 }}>→</span>{" "}
                        <span style={{ fontWeight: 800 }}>{inName}</span>
                      </span>
                      <span style={{ opacity: 0.75 }}>{c.minutes}'</span>
                    </li>
                  );
                })}
                {subsAway.length === 0 && (
                  <li style={{ opacity: 0.65 }}>Aucun changement</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchDetails;
