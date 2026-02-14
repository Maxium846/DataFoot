import React, { useEffect, useState } from "react";
import { getFixtures, getTeams } from "../api/apiPl";

function CalendarPL() {
  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsData = await getTeams();
        const fixturesData = await getFixtures();

        const teamMap = {};
        teamsData.teams.forEach(team => {
          teamMap[team.id] = team.name;
        });

        setTeams(teamMap);
        setFixtures(fixturesData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Calendrier Premier League</h2>
      {fixtures.map(match => (
        <div key={match.id}>
          {new Date(match.kickoff_time).toLocaleString()} - 
          {teams[match.team_h]} vs {teams[match.team_a]}
        </div>
      ))}
    </div>
  );
}

export default CalendarPL;
