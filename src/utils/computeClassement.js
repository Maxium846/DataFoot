export function computeClassement(teams, calendar, results) {
  const stats = {};

  teams.forEach(t => {
    stats[t.id] = {
      clubId: t.id,
      clubName: t.name,
      points: 0,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
    };
  });

  calendar.forEach((journee, rIdx) => {
    journee.matches.forEach((match, mIdx) => {
      const key = `${rIdx}-${mIdx}`;
      const res = results[key];
      if (!res || res.homeGoals == null || res.awayGoals == null) return;

      const home = stats[match.home.id];
      const away = stats[match.away.id];

      home.played++;
      away.played++;

      home.goalsFor += res.homeGoals;
      home.goalsAgainst += res.awayGoals;
      away.goalsFor += res.awayGoals;
      away.goalsAgainst += res.homeGoals;

      if (res.homeGoals > res.awayGoals) {
        home.wins++; home.points += 3;
        away.losses++;
      } else if (res.homeGoals < res.awayGoals) {
        away.wins++; away.points += 3;
        home.losses++;
      } else {
        home.draws++; away.draws++;
        home.points++; away.points++;
      }

      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;
    });
  });

  return Object.values(stats).sort(
    (a, b) =>
      b.points - a.points ||
      b.goalDifference - a.goalDifference ||
      b.goalsFor - a.goalsFor
  );
}
