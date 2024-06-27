const {MongoClient} = require("mongodb");
const {MONGODB_USR, MONGODB_PWD} = require("./config.js");

const uri = "mongodb+srv://" + "knsc16" + ":" + "mongo2003" + "@cluster0.fsiz1qr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
const database = client.db("pweb2");
const turnos = database.collection("turnos");

async function traerTodo(){
    return await turnos.find({}).toArray(); // ME TRAE TODOS LOS DATOS EN UN ARREGLO
}

async function traerPorDni(dni){
    return (await turnos.find({}).toArray()).filter(turno => turno.dni == dni);
}

async function crearTurno(turno){
    await turnos.insertOne(turno);
}

async function actualizarTurno(dni, especialidad, hora, fecha){
    await turnos.updateOne({dni: dni}, {$set: {especialidad: especialidad}} || {$set: {hora: hora}} && {$set: {fecha: fecha}}); 
}

async function eliminarTurno(id){
    await turnos.deleteOne({id: parseInt(id)});
}

module.exports = {traerTodo, traerPorDni, crearTurno, actualizarTurno, eliminarTurno}