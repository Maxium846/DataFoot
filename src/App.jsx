import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
import FicheClub from "./component/clubs/FicheClub";
import Calendrier from "./component/Calendrier";
import Championnats from "./component/Championnats";
import Joueurs from "./component/joueurs/Joueurs";

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
          path="/calendrier/:leagueId"
          element={<Calendrier></Calendrier>}
        />
        <Route
          path="/joueurs/:clubId"
          element={<Joueurs></Joueurs>}
        />
          
      </Routes>
    </div>
  );
}

export default App;
