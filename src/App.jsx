import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
import FicheClub from "./component/clubs/FicheClub";
import Championnats from "./component/Championnats";
import Joueurs from "./component/joueurs/Joueurs";
import MatchLineupForm from "./component/matchs/MatchLineUpForm";
import DetailsMatch from "./component/matchs/DetailsMatch";
import StatJoueurs from "./component/joueurs/StatsJoueur";
import CalendarPL from "./component/CalendrierPl";


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
          path="/joueurs/:clubId"
          element={<Joueurs></Joueurs>}
        />
         <Route
          path="/match/:matchId/composition/:leagueId"
          element={<MatchLineupForm></MatchLineupForm>}
        />
         <Route
          path="/match/:matchId"
          element={<DetailsMatch></DetailsMatch>}
        />
         <Route
          path="/joueurs/:clubId/:joueurId"
          element={<StatJoueurs></StatJoueurs>}
        />
      </Routes>
    </div>
  );
}

export default App;
