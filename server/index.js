const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port=process.env.PORT;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
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
                res.send(result);
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
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM clientes WHERE id=?',id,
        (err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.listen(port,()=>{
    console.log("Corriendo en el puerto "+port)
})
