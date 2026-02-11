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

export async function createJoueur(joueurs){

const res = await fetch ("http://localhost:8081/api/players" , {

    method: "POST",
    headers: { "Content-Type" : "application/json"},
    body : JSON.stringify(joueurs)
});
return res.json();
}

export async function deleteJoueur(id) {

    return await fetch("http://localhost:8081/api/players/" + id,{

        method: "DELETE"
    })
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

    const res = await fetch("http://localhost:8081/api/playersStat/" + id)
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