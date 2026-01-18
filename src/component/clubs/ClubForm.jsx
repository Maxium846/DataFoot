import { useState } from "react";

const ClubForm = ({onSubmit}) =>{

    const [form,setForm] = useState({
        name : "",
        league : "",
        country :""
    })

const handleSubmit =(e) => {
e.preventDefault();
onSubmit(form)
setForm({name :"", league : "" , country :""})

} 
const handleChange = (e) =>{ setForm({...form , [e.target.value] : e.target.value})}
return(

<form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={(e)=>setForm({...form, name : e.target.value})} value={form.name} />
      <input name="league" onChange={(e)=>setForm({...form, league : e.target.value})} value={form.league} />
      <input name="country" onChange={(e)=>setForm({...form, country : e.target.value})} value={form.country} />
      <button>Ajouter</button>
    </form>
  );

}
export default ClubForm;