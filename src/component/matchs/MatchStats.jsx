import { useEffect, useState } from "react";
import { getStatByMatchId } from "../../api/matchApi";

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "80px 1fr 80px",
  alignItems: "center",
  gap: 10,
  padding: "8px 0",
};

const labelStyle = {
  textAlign: "center",
  fontWeight: 700,
};

const MatchStats = ({matchId}) => {
  const [statsMatch, setStatsMatch] = useState([]);

  useEffect(() => {
    const fetchStat = async () => {
      const data = await getStatByMatchId(matchId);
      setStatsMatch(Array.isArray(data) ? data : []);
    };

    fetchStat();
  }, [matchId]);

  if (statsMatch.length !== 2) {
    return <p>Chargement des statistiques...</p>;
  }

  const home = statsMatch[0];
  const away = statsMatch[1];

  const stats = [
    { label: "Tirs cadrés", key: "shootsOnGoals" },
    { label: "Tirs non cadrés", key: "shootOffGoals" },
    { label: "Total tirs", key: "totalShots" },
    { label: "Tirs contrés", key: "blockedShots" },
    { label: "Tirs dans la surface", key: "shotInsideBox" },
    { label: "Tirs hors surface", key: "shotsOutsideBox" },
    { label: "Fautes", key: "fouls" },
    { label: "Corners", key: "cornerKick" },
    { label: "Hors-jeu", key: "offsides" },
    { label: "Possession %", key: "ballPossession" },
    { label: "Cartons jaunes", key: "yellowCards" },
    { label: "Cartons rouges", key: "redCards" },
    { label: "Arrêts gardien", key: "goalkeeperSave" },
    { label: "Total passes", key: "totalPasses" },
    { label: "Passes réussies", key: "passesAccurate" },
    { label: "Précision passes %", key: "passesPercentage" },
    { label: "Expected Goals (xG)", key: "expectedGoals" },
  ];

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 20,
        background: "white",
        borderRadius: 12,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        fontFamily: "system-ui",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Statistiques du match
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 80px",
          fontWeight: 800,
          marginBottom: 10,
        }}
      >
        <div style={{ textAlign: "left" }}>{home.nameClub}</div>
        <div></div>
        <div style={{ textAlign: "right" }}>{away.nameClub}</div>
      </div>

      {stats.map((stat) => {
        const homeVal = home[stat.key] ?? 0;
        const awayVal = away[stat.key] ?? 0;

        const total = homeVal + awayVal || 1;

        const homePercent = (homeVal / total) * 100;
        const awayPercent = (awayVal / total) * 100;

        return (
          <div key={stat.key}>
            <div style={rowStyle}>
              <div>{homeVal}</div>

              <div style={labelStyle}>{stat.label}</div>

              <div style={{ textAlign: "right" }}>{awayVal}</div>
            </div>

            <div
              style={{
                display: "flex",
                height: 6,
                borderRadius: 4,
                overflow: "hidden",
                marginBottom: 8,
                background: "#eee",
              }}
            >
              <div
                style={{
                  width: `${homePercent}%`,
                  background: "#2563eb",
                }}
              ></div>

              <div
                style={{
                  width: `${awayPercent}%`,
                  background: "#ef4444",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchStats;