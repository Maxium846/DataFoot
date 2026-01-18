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
const handleChange = (e) =>{ setForm({...form , [e.target.name] : e.target.value})}
return(

<form onSubmit={handleSubmit}>
      <input type="text" name="name"placeholder="Name" onChange={handleChange} value={form.name} />
      <input name="league" placeholder="League" onChange={handleChange} value={form.league} />
      <input name="country" placeholder="Country" onChange={handleChange} value={form.country} />
      <button>Ajouter</button>
    </form>
  );

}
export default ClubForm;