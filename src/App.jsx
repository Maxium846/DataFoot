
import { Route, Routes } from "react-router-dom";
import ClubList from "./component/clubs/ListClubs";
import Entete from "./component/common/Entete";
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Entete></Entete>
      <Routes>
        <Route path="/championnat/:leagueId" element={<ClubList></ClubList>}/>
      </Routes>
    </div>
  );
}

export default App;
