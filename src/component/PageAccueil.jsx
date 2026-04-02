import usePageAccueil from "../hooks/usePageAccueil";

const PageAccueil = () => {
  const { classement } = usePageAccueil();

  const groupedByLeague = classement.reduce((acc, club) => {
    const league = club.leagueName;

    if (!acc[league]) {
      acc[league] = [];
    }

    acc[league].push(club);
    return acc;
  }, {});

  const top5ByLeague = {};
  for (const league in groupedByLeague) {
    top5ByLeague[league] = groupedByLeague[league]
      .sort((a, b) => b.points - a.points) // du plus grand au plus petit
      .slice(0, 5); // garder les 5 premiers
  }
  return (
    <>
      {Object.entries(top5ByLeague).map(([league, clubs]) => (
        <div>
          <h1>{league}</h1>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>MatchJoué</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((c) => (
                <tr key={c.id}>
                  <td>{c.clubName}</td>
                  <td>{c.played}</td>
                  <td>{c.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default PageAccueil;
