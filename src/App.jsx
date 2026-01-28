import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
import Classement from "./component/Classement";
import FicheClub from "./component/clubs/FicheClub";
import Calendrier from "./component/Calendrier";
import Calendrier2026PL from "./component/Calendrier2026PL";
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
          path="/clubs/:clubId"
          element={<FicheClub></FicheClub>}
        />
          <Route
          path="/calendrier/:leagueId"
          element={<Calendrier></Calendrier>}
        />
            <Route
          path="/calendrier/"
          element={<Calendrier2026PL></Calendrier2026PL>}
        />
      </Routes>
    </div>
  );
}

export default App;
