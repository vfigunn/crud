import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre,setNombre] = useState("");
  const [dni,setDni] = useState();
  const [email,setEmail] = useState("");
  const [id,setId] = useState(0);

  const [editar,setEditar] = useState(false);
  
  const [clientesList,setClientes] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:4000/create",{
      nombre:nombre,
      dni:dni,
      email:email
    }).then(()=>{
      getClientes();
      alert("Cliente registrado");
    });
  }

  const update = ()=>{
    Axios.put("http://localhost:4000/update",{
      id:id,
      nombre:nombre,
      dni:dni,
      email:email
    }).then(()=>{
      getClientes();
    });
  }

  const editarCliente = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setDni(val.dni);
    setEmail(val.email);
    setId(val.id);
  }

  const getClientes = ()=>{
    Axios.get("http://localhost:4000/clientes").then((response)=>{
      setClientes(response.data);
    });
  }

  getClientes();


  return (
  <div className="container"> 
    <div className='card text-center'>
        <div className='card-header'>
          GESTIÓN DE CLIENTES
        </div>

        <div className='card-body'>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre: </span>
          <input type="text"
          onChange={(event)=>{
            setNombre(event.target.value);
          }}
          className="form-control" value={nombre} placeholder="Ingrese el Nombre" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Dni: </span>
          <input type="text"
          onChange={(event)=>{
            setDni(event.target.value);
          }}
          className="form-control" value={dni} placeholder="Ingrese el DNI" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Email: </span>
          <input type="text"
          onChange={(event)=>{
            setEmail(event.target.value);
          }}
          className="form-control" value={email} placeholder="Ingrese el Email" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        </div>

        <div className='card-footer text-muted'>
          {
            editar?
            <div>
            <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
            <button className="btn btn-info m-2" onClick={add}>Cancelar</button>
            </div>
            :<button className="btn btn-success" onClick={add}>Registrar</button>
          }
        </div>
    </div>

    <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">DNI</th>
        <th scope="col">Email</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
        {
          clientesList.map((val,key)=>{
            return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.dni}</td>
                      <td>{val.email}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button"
                        onClick={()=>{
                          editarCliente(val);
                        }}
                        className="btn btn-info">Editar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </div>
                      </td>
                  </tr>
          })
        }
    </tbody>
    </table>
  </div>  
  );
}

export default App;
