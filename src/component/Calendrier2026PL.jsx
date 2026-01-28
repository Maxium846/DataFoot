import React from "react";

const Calendrier2026PL = () => {
  // Liste des 20 équipes de Premier League 2026
  const teams = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Luton",
    "Man City",
    "Man United",
    "Newcastle",
    "Nottingham",
    "Sheffield United",
    "Tottenham",
    "West Ham",
    "Wolves",
    "Southampton"
  ];

  // Fonction pour générer toutes les journées
  function generatePLCalendar(teams) {
    const calendar = [];
    const numRounds = (teams.length - 1) * 2; // 38 journées pour 20 équipes
    const half = teams.length / 2;

    let rotation = [...teams];

    for (let round = 1; round <= numRounds; round++) {
      const matches = [];

      for (let i = 0; i < half; i++) {
        const home = rotation[i];
        const away = rotation[rotation.length - 1 - i];
        matches.push({
          home,
          away,
          homeGoals: null,
          awayGoals: null,
          date: null
        });
      }

      calendar.push({ round, matches });

      // Rotation pour la prochaine journée
      rotation = [rotation[0], rotation[rotation.length - 1], ...rotation.slice(1, rotation.length - 1)];
    }

    return calendar;
  }

  const calendrierPL2026 = generatePLCalendar(teams);

  return (
    <div>
      <h1>Calendrier Premier League 2026</h1>
      {calendrierPL2026.map((journee) => (
        <div key={journee.round}>
          <h2>Journée {journee.round}</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Domicile</th>
                <th>Extérieur</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {journee.matches.map((match, index) => (
                <tr key={index}>
                  <td>{match.home}</td>
                  <td>{match.away}</td>
                  <td>{match.homeGoals ?? "-"} : {match.awayGoals ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Calendrier2026PL;
