import { useEffect, useState } from "react";
import { getClassementAccueil } from "../api/useAccueil";

const usePageAccueil = () => {
  const [classement, setClassement] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClassementAccueil();

      setClassement(data);
    };

    fetchData();
  }, []);

  return {
    classement,
  };
};
export default usePageAccueil;
