import { useParams } from "react-router-dom";
import Classement from "./Classement";
import useClassement from "../hooks/useClassement";

const Championnats = () => {
  const { leagueId } = useParams();


  const {classement} = useClassement(leagueId)

 
  return <Classement classement = {classement}></Classement>;
};
export default Championnats;
