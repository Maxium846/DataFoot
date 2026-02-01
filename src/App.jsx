import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
import FicheClub from "./component/clubs/FicheClub";
import Calendrier from "./component/Calendrier";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Entete></Entete>
      <Routes>
        <Route
          path="/championnat/:leagueId"
          element={<Calendrier></Calendrier>}
        />
        <Route
          path="/championnat/:leagueId/clubs"
          element={<ClubList></ClubList>}
        />
           <Route
          path="/ficheClub/:clubId"
          element={<FicheClub></FicheClub>}
        />
          <Route
          path="/calendrier/:leagueId"
          element={<Calendrier></Calendrier>}
        />
          
      </Routes>
    </div>
  );
}

export default App;
