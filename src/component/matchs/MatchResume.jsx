import React, { useMemo } from "react";

const styles = {
  wrapper: {
    background: "#f3f3f3",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #e4e4e4",
  },
  tabsCard: {
    background: "#fff",
    padding: "12px 14px",
    borderBottom: "1px solid #e9e9e9",
  },
  title: {
    fontSize: 16,
    fontWeight: 800,
    color: "#111827",
  },
  sectionHeader: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    background: "#e9e9e9",
    color: "#4b5563",
    fontWeight: 800,
    fontSize: 13,
    padding: "10px 14px",
    letterSpacing: 0.2,
  },
  rows: {
    background: "#fff",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 44px 1fr",
    alignItems: "center",
    minHeight: 54,
    padding: "0 10px",
    borderBottom: "1px solid #f1f1f1",
  },
  sideLeft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    minWidth: 0,
  },
  sideRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    minWidth: 0,
  },
  middle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  minuteLeft: {
    fontWeight: 800,
    fontSize: 12,
    color: "#4b5563",
    minWidth: 38,
    textAlign: "left",
    flexShrink: 0,
  },
  minuteRight: {
    fontWeight: 800,
    fontSize: 12,
    color: "#4b5563",
    minWidth: 38,
    textAlign: "right",
    flexShrink: 0,
  },
  playerText: {
    fontSize: 14,
    color: "#111827",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  assistText: {
    fontSize: 13,
    color: "#6b7280",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  eventBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    border: "1px solid #e6e6e6",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    fontSize: 17,
    flexShrink: 0,
  },
  goalPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #e6e6e6",
    borderRadius: 12,
    padding: "6px 10px",
    background: "#fff",
    fontWeight: 800,
    color: "#111827",
  },
};

function getEventIcon(eventType) {
  switch (eventType) {
    case "GOAL":
    case "PENALTY_GOAL":
      return "⚽";
    case "YELLOW_CARD":
      return "🟨";
    case "RED_CARD":
      return "🟥";
    case "SUBSTITUTION":
      return "🔄";
    default:
      return "•";
  }
}

function getPeriodLabel(minute) {
  const m = minute ?? 0;
  if (m <= 45) return "1. MI-TEMPS";
  if (m <= 90) return "2. MI-TEMPS";
  return "PROLONGATION / FIN";
}

function formatMinute(minute) {
  return `${minute ?? 0}'`;
}

function buildPlayerMap(players = []) {
  return new Map(players.map((p) => [Number(p.playerId), p]));
}

function getPlayerNameFromMap(playerId, map) {
  if (playerId == null) return null;
  const p = map.get(Number(playerId));
  if (!p) return null;
  return p.playerName || p.shortName || p.name || null;
}

function normalizeSubstitution(event, playerMap) {
  const outName =
    event.namePlayerOut ||
    getPlayerNameFromMap(event.playerOutId, playerMap) ||
    "Joueur sortant";

  const inName =
    event.namePlayerin ||
    getPlayerNameFromMap(event.playerInId, playerMap) ||
    "Joueur entrant";

  return { outName, inName };
}

function groupEventsByPeriod(events) {
  const groups = [];
  let currentLabel = null;
  let currentItems = [];

  for (const event of events) {
    const label = getPeriodLabel(event.minutes);
    if (label !== currentLabel) {
      if (currentItems.length) {
        groups.push({ label: currentLabel, items: currentItems });
      }
      currentLabel = label;
      currentItems = [event];
    } else {
      currentItems.push(event);
    }
  }

  if (currentItems.length) {
    groups.push({ label: currentLabel, items: currentItems });
  }

  return groups;
}

function EventContent({ event, side, playerMap, homeGoals, awayGoals }) {
  const playerName =
    getPlayerNameFromMap(event.playerId, playerMap) || "Joueur inconnu";

  const assistName =
    getPlayerNameFromMap(event.assistPlayerId, playerMap) || event.assistName;

  if (event.eventType === "SUBSTITUTION") {
    const { outName, inName } = normalizeSubstitution(event, playerMap);

    return side === "home" ? (
      <>
        <span style={styles.minuteLeft}>{formatMinute(event.minutes)}</span>
        <span style={styles.eventBox}>🔄</span>
        <div style={{ minWidth: 0 }}>
          <div style={styles.playerText}>{inName}</div>
          <div style={styles.assistText}>({outName})</div>
        </div>
      </>
    ) : (
      <>
        <div style={{ minWidth: 0, textAlign: "right" }}>
          <div style={styles.assistText}>({outName})</div>
          <div style={styles.playerText}>{inName}</div>
        </div>
        <span style={styles.eventBox}>🔄</span>
        <span style={styles.minuteRight}>{formatMinute(event.minutes)}</span>
      </>
    );
  }

  if (event.eventType === "YELLOW_CARD") {
    return side === "home" ? (
      <>
        <span style={styles.minuteLeft}>{formatMinute(event.minutes)}</span>
        <span style={styles.eventBox}>🟨</span>
        <div style={styles.playerText}>{playerName}</div>
      </>
    ) : (
      <>
        <div style={{ ...styles.playerText, textAlign: "right" }}>
          {playerName}
        </div>
        <span style={styles.eventBox}>🟨</span>
        <span style={styles.minuteRight}>{formatMinute(event.minutes)}</span>
      </>
    );
  }

  if (event.eventType === "RED_CARD") {
    return side === "home" ? (
      <>
        <span style={styles.minuteLeft}>{formatMinute(event.minutes)}</span>
        <span style={styles.eventBox}>🟥</span>
        <div style={styles.playerText}>{playerName}</div>
      </>
    ) : (
      <>
        <div style={{ ...styles.playerText, textAlign: "right" }}>
          {playerName}
        </div>
        <span style={styles.eventBox}>🟥</span>
        <span style={styles.minuteRight}>{formatMinute(event.minutes)}</span>
      </>
    );
  }

  if (event.eventType === "GOAL" || event.eventType === "PENALTY_GOAL") {
    const scoreText = `${homeGoals} - ${awayGoals}`;

    return side === "home" ? (
      <>
        <span style={styles.minuteLeft}>{formatMinute(event.minutes)}</span>
        <span style={styles.goalPill}>
          <span>⚽</span>
          <span>{scoreText}</span>
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={styles.playerText}>{playerName}</div>
          {assistName ? (
            <div style={styles.assistText}>({assistName})</div>
          ) : null}
        </div>
      </>
    ) : (
      <>
        <div style={{ minWidth: 0, textAlign: "right" }}>
          {assistName ? (
            <div style={styles.assistText}>({assistName})</div>
          ) : null}
          <div style={styles.playerText}>{playerName}</div>
        </div>
        <span style={styles.goalPill}>
          <span>{scoreText}</span>
          <span>⚽</span>
        </span>
        <span style={styles.minuteRight}>{formatMinute(event.minutes)}</span>
      </>
    );
  }

  return side === "home" ? (
    <>
      <span style={styles.minuteLeft}>{formatMinute(event.minutes)}</span>
      <span style={styles.eventBox}>{getEventIcon(event.eventType)}</span>
      <div style={styles.playerText}>{playerName}</div>
    </>
  ) : (
    <>
      <div style={{ ...styles.playerText, textAlign: "right" }}>{playerName}</div>
      <span style={styles.eventBox}>{getEventIcon(event.eventType)}</span>
      <span style={styles.minuteRight}>{formatMinute(event.minutes)}</span>
    </>
  );
}

export default function MatchResume({
  events = [],
  players = [],
  homeClubId,
  awayClubId,
  homeClubName = "Domicile",
  awayClubName = "Extérieur",
}) {
  const playerMap = useMemo(() => buildPlayerMap(players), [players]);

  const enrichedEvents = useMemo(() => {
  const sorted = [...events].sort((a, b) => {
    return (a.minutes ?? 0) - (b.minutes ?? 0) || (a.id ?? 0) - (b.id ?? 0);
  });

  const result = sorted.reduce(
    (acc, event) => {
      let side = "neutral";

      if (Number(event.clubId) === Number(homeClubId)) side = "home";
      else if (Number(event.clubId) === Number(awayClubId)) side = "away";

      const isGoal =
        event.eventType === "GOAL" || event.eventType === "PENALTY_GOAL";

      let nextHomeGoals = acc.homeGoals;
      let nextAwayGoals = acc.awayGoals;

      if (isGoal) {
        if (side === "home") nextHomeGoals += 1;
        if (side === "away") nextAwayGoals += 1;
      }

      acc.items.push({
        ...event,
        side,
        liveHomeGoals: nextHomeGoals,
        liveAwayGoals: nextAwayGoals,
      });

      acc.homeGoals = nextHomeGoals;
      acc.awayGoals = nextAwayGoals;

      return acc;
    },
    {
      items: [],
      homeGoals: 0,
      awayGoals: 0,
    },
  );

  return result.items;
}, [events, homeClubId, awayClubId]);

  const groupedEvents = useMemo(() => groupEventsByPeriod(enrichedEvents), [enrichedEvents]);

  console.log("MatchResume debug", {
    homeClubId,
    awayClubId,
    events,
    players,
    enrichedEvents,
  });

  return (
    <div style={styles.wrapper}>
      <div style={styles.tabsCard}>
        <div style={styles.title}>Résumé</div>
      </div>

      {groupedEvents.length === 0 ? (
        <div style={{ background: "#fff", padding: 16, color: "#6b7280" }}>
          Aucun événement disponible.
        </div>
      ) : (
        groupedEvents.map((group, index) => (
          <div key={`${group.label}-${index}`}>
            <div style={styles.sectionHeader}>
              <span>{group.label}</span>
              <span>
                {group.items[group.items.length - 1]?.liveHomeGoals ?? 0} -{" "}
                {group.items[group.items.length - 1]?.liveAwayGoals ?? 0}
              </span>
            </div>

            <div style={styles.rows}>
              {group.items.map((event) => (
                <div key={event.id} style={styles.row}>
                  <div style={styles.sideLeft}>
                    {event.side === "home" ? (
                      <EventContent
                        event={event}
                        side="home"
                        playerMap={playerMap}
                        homeGoals={event.liveHomeGoals}
                        awayGoals={event.liveAwayGoals}
                      />
                    ) : null}
                  </div>

                  <div style={styles.middle} />

                  <div style={styles.sideRight}>
                    {event.side === "away" ? (
                      <EventContent
                        event={event}
                        side="away"
                        playerMap={playerMap}
                        homeGoals={event.liveHomeGoals}
                        awayGoals={event.liveAwayGoals}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          background: "#fff",
          borderTop: "1px solid #ededed",
          padding: "10px 14px",
          fontSize: 12,
          color: "#6b7280",
          fontWeight: 700,
        }}
      >
        <div>{homeClubName}</div>
        <div style={{ textAlign: "right" }}>{awayClubName}</div>
      </div>
    </div>
  );
}