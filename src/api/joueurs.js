export async function getJoueurs(id){

    const res = await fetch ("http://localhost:8081/api/players/clubs/" + id)
    try{
        if(!res.ok){
            throw new Error("Erreur lors du chargement des joueurs")
        }
        return await res.json()
    }catch(error){
        console.log(error)
        return null;
    }
}



export async function getJoueurById (id){

    const res = await fetch("http://localhost:8081/api/players/" + id)
    try{
        if(!res.ok){
            throw new Error("Erreur lors du chargement des joueurs")
        }
        return await res.json()
    }catch(error){
        console.log(error)
        return null;
    }
}
export async function getStatByJoueur (id){

    const res = await fetch(`http://localhost:8081/api/match-events/player/${id}/stat`)
    try{
        if(!res.ok){
            throw new Error("Erreur lors du chargement des joueurs")
        }
        return await res.json()
    }catch(error){
        console.log(error)
        return null;
    }
}
