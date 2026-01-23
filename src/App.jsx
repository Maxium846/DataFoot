import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
import Classement from "./component/Classement";
import FicheClub from "./component/clubs/FicheClub";
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Entete></Entete>
      <Routes>
        <Route
          path="/championnat/:leagueId"
          element={<Classement></Classement>}
        />
        <Route
          path="/championnat/:leagueId/clubs"
          element={<ClubList></ClubList>}
        />
         <Route
          path="/clubs/:clubId"
          element={<FicheClub></FicheClub>}
        />
      </Routes>
    </div>
  );
}

export default App;
