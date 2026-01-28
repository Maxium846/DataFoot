import React from "react";

const Classement = ({ classement, loading }) => {
  if (loading) return <p>Chargement classement...</p>;
  if (!classement || classement.length === 0) return <p>Aucun classement disponible.</p>;

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Classement</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Club</th>
            <th>Points</th>
            <th>Diff. Buts</th>
            <th>Joués</th>
            <th>V</th>
            <th>N</th>
            <th>D</th>
          </tr>
        </thead>
        <tbody>
          {classement.map((c, index) => (
            <tr key={c.clubId}>
              <td>{index + 1}</td>
              <td>{c.clubName}</td>
              <td>{c.points}</td>
              <td>{c.goalDifference}</td>
              <td>{c.played}</td>
              <td>{c.wins}</td>
              <td>{c.draws}</td>
              <td>{c.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classement;
