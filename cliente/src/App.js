import './App.css';
import { useState } from "react"

function App() {

  const [nombre,setNombre] = useState("");
  const [dni,setDni] = useState(0);
  const [email,setEmail] = useState("");


  return (
    <div className="App">
      <div className="datos">
          <label>Nombre: <input onChange={(event)=>{
            setNombre(event.target.value);
          }} type="text"/></label>
          <label>Dni: <input onChange={(event)=>{
            setDni(event.target.value);
          }} type="number"/></label>
          <label>Email: <input onChange={(event)=>{
            setEmail(event.target.value);
          }} type="email"/></label>
          <button>Registrar</button>
      </div>
    </div>
  );
}

export default App;
