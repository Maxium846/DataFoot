import React from "react";

const MatchTables = ({ journee, matches, onScoreChange }) => {
  if (!matches || matches.length === 0) return <p>Aucun match pour cette journée.</p>;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Journée {journee}</h2>
      <table
        border="1"
        cellPadding="5"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Domicile</th>
            <th>Score</th>
            <th>Extérieur</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.id}>
              <td>{m.homeClubName}</td>
              <td>
                <input
                  type="number"
                  style={{ width: "40px" }}
                  value={m.homeGoals ?? ""}
                  onChange={(e) =>
                    onScoreChange(m.id, parseInt(e.target.value || 0), m.awayGoals)
                  }
                />{" "}
                -{" "}
                <input
                  type="number"
                  style={{ width: "40px" }}
                  value={m.awayGoals ?? ""}
                  onChange={(e) =>
                    onScoreChange(m.id, m.homeGoals, parseInt(e.target.value || 0))
                  }
                />
              </td>
              <td>{m.awayClubName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTables;
