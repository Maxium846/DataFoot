import { useEffect, useState } from "react";
import { getJoueurBydifficulty } from "../api/joueurs";

const useAllJoueurs = (view) => {
  const [listeJoueur, setListeJoueur] = useState([]);
  const [playersCache, setPlayersCache] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // ✅ si déjà en cache
      if (playersCache[view]) {
        setListeJoueur(playersCache[view]);
        return;
      }

      // ✅ sinon API
      const data = await getJoueurBydifficulty(view);
      setListeJoueur(data);

      // ✅ on stocke
      setPlayersCache((prev) => ({
        ...prev,
        [view]: data,
      }));
    };

    fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return {
    listeJoueur,
  };
};

export default useAllJoueurs;