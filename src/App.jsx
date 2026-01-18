import React from "react";
import ListClubs from "./component/clubs/ListClubs"
import Entete from "./component/common/Entete";
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Liste des Clubs</h1>
      <Entete></Entete>
     <ListClubs></ListClubs>
    </div>
  );
}

export default App;
