import usePageAccueil from "../hooks/usePageAccueil";
import "../css/pageAccueil.css";

const PageAccueil = () => {
  const { classement } = usePageAccueil();

  const top5ByLeague = classement.reduce((acc, club) => {
    const leagueIndex = acc.findIndex((l) => l.leagueName === club.leagueName);

    if (leagueIndex === -1) {
      // si cette ligue n'existe pas encore, on crée une entrée
      acc.push({
        leagueName: club.leagueName,
        clubs: [club],
      });
    } else {
      // sinon on ajoute le club existant à la ligue
      acc[leagueIndex].clubs.push(club);
    }

    return acc;
  }, []);

  const top5 = top5ByLeague.map((l) => ({
    leagueName: l.leagueName,
    clubs: l.clubs.sort((a, b) => b.points - a.points).slice(0, 5),
  }));

  console.log(top5);
  return (
    <>
      <div className="tableau">
        <h1>{top5.leagueName}</h1>
        {top5.map((l) => (
          <div>
            <table key={l.leagueName}>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>MatchJoué</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {l.clubs.map((c) => (
                  <tr key={c.clubId}>
                    <td>{c.clubName}</td>
                    <td>{c.played}</td>
                    <td>{c.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default PageAccueil;
