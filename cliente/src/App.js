import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'



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
      limpiarCampos();
      Swal.fire({
        title: "Registro existoso!",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con exito!</i>",
        icon: "success",
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });;;
  }

  const update = ()=>{
    Axios.put("http://localhost:4000/update",{
      id:id,
      nombre:nombre,
      dni:dni,
      email:email
    }).then(()=>{
      getClientes();
      limpiarCampos();
      Swal.fire({
        title: "Actualización existosa!",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer:3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });;;
  }

  const deleteCliente = (val)=>{
    Swal.fire({
      title: "Confirmar eliminación",
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong> ?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete("http://localhost:4000/delete/"+val.id).then(()=>{
          getClientes();
          limpiarCampos();
          Swal.fire({
            title: "Eliminado!",
            html: "<i><strong>"+val.nombre+"</strong> fue eliminado.</i>",
            icon: "success",
            timer: 3000
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró eliminar el cliente!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
      }
    });

  }

  const limpiarCampos = () => {
    setNombre("");
    setDni("");
    setEmail("");
    setEditar(false);
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
  <div className="container mt-3"> 
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
          <input type="number"
          onChange={(event)=>{
            setDni(event.target.value);
          }}
          className="form-control" value={dni} placeholder="Ingrese el DNI" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Email: </span>
          <input type="email"
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
            <button className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
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
                        <button type="button" onClick={()=>{
                          deleteCliente(val);
                        }} className="btn btn-danger">Eliminar</button>
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
