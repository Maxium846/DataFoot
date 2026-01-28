import React from "react";

const MatchRow = ({ match, onScoreChange }) => {
  return (
    <tr>
      <td>{match.homeClub.name}</td>
      <td>
        <input
          type="number"
          value={match.homeGoals ?? ""}
          style={{ width: 40 }}
          onChange={(e) =>
            onScoreChange(match.id, e.target.value, match.awayGoals ?? 0)
          }
        />
        {" - "}
        <input
          type="number"
          value={match.awayGoals ?? ""}
          style={{ width: 40 }}
          onChange={(e) =>
            onScoreChange(match.id, match.homeGoals ?? 0, e.target.value)
          }
        />
      </td>
      <td>{match.awayClub.name}</td>
    </tr>
  );
};

export default MatchRow;
