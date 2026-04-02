import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
import FicheClub from "./component/clubs/FicheClub";
import Championnats from "./component/Championnats";
import Joueurs from "./component/joueurs/Joueurs";
import StatJoueurs from "./component/joueurs/StatsJoueur";
import MatchStats from "./component/matchs/MatchStats";
import Match from "./component/matchs/Match";
import StatChampionnatJoueurs from "./component/joueurs/stats/StatChampionnatJoueurs";
import GuessThePlayer from "./component/guess/GuessThePlayer";


function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Entete></Entete>
      <Routes>
        <Route
          path="/championnat/:leagueId/classement"
          element={<Championnats></Championnats>}
        />
        <Route
          path="/championnat/:leagueId/clubs"
          element={<ClubList></ClubList>}
        />
           <Route
          path="/ficheClub/:leagueId/:clubId"
          element={<FicheClub></FicheClub>}
        />
          <Route
          path="/match/:matchId/stats"
          element={<MatchStats></MatchStats>}
        />
        <Route
          path="/joueurs/:clubId"
          element={<Joueurs></Joueurs>}
        />
       
         <Route
          path="/match/:matchId"
          element={<Match></Match>}
        />
         <Route
          path="/joueurs/:clubId/:joueurId"
          element={<StatJoueurs></StatJoueurs>}
        />
           <Route
          path="/championnat/:leagueId/stats"
          element={<StatChampionnatJoueurs></StatChampionnatJoueurs>}
        />
           <Route
          path="/guessThePlayer"
          element={<GuessThePlayer></GuessThePlayer>}
        />
      </Routes>
    </div>
  );
}

export default App;
