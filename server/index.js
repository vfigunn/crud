const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gimnasio"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const dni = req.body.dni;
    const email = req.body.email;

    db.query('INSERT INTO clientes(nombre,dni,email) VALUES(?,?,?)',[nombre,dni,email],
        (err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.send("Cliente registrado con éxito!");
            }
        }
    );
});

app.get("/clientes",(req,res)=>{
    db.query('SELECT * FROM clientes',
        (err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const dni = req.body.dni;
    const email = req.body.email;

    db.query('UPDATE clientes SET nombre=?,dni=?,email=? WHERE id=?',[nombre,dni,email,id],
        (err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.send("Cliente actualizado con éxito!");
            }
        }
    );
});

app.listen(4000,()=>{
    console.log("Corriendo en el puerto 4000")
})
