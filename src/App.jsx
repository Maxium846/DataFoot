import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
import Classement from "./component/Classement";
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
      </Routes>
    </div>
  );
}

export default App;
