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

export async function getAllJoueur(){

    const res = await fetch ("http://localhost:8081/api/players/allPlayers")
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
export async function getJoueurByGuessFacile(){

    const res = await fetch (`http://localhost:8081/api/players/guessFacile`)
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

    const res = await fetch(`http://localhost:8081/api/players/${id}/stat`)
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

export async function getStatByJoueurByChampionnat(leagueId,page =0 ,size =20){

    const res  = await fetch (`http://localhost:8081/api/playersStat/offensive/${leagueId}?page=${page}&size=${size}`)
    try{
    if(!res.ok){
        throw new Error("erreur lors du chargement des stats des joueurs")
    }
    return res.json()
}catch(error){
        console.log(error)
        return null;
    }
    
    
}
export async function getStatPasseur(leagueId,page,size){

    const res  = await fetch (`http://localhost:8081/api/playersStat/stat/assist/${leagueId}?page=${page}&size=${size}`)
    try{
    if(!res.ok){
        throw new Error("erreur lors du chargement des stats des joueurs")
    }
    return res.json()
}catch(error){
        console.log(error)
        return null;
    }
}
