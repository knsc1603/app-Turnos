const express = require("express"); // importo el modulo de Express
const cors = require("cors");
const app = express(); // creo que una instancia de la aplicacion Express
const port = 3000; // creo el puerto
const {traerTodo, traerPorDni, crearTurno, actualizarTurno, eliminarTurno} = require("./db.js");
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());

// obtener todos los datos de los turnos
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// obtener un turno mediante el dni
app.get('/turnos/dni/:dni', async (req, res) => {
    const resultado = await traerPorDni(req.params.dni);
    res.json(resultado);
});

// crear un nuevo turno
app.post('/turnos', async (req, res) => {
  //console.log(req.body);
  await crearTurno({...req.body, id: ((await traerTodo()).at(-1)?.id || 0) + 1 });
  res.json({message: "Turno creado"});

});

// actualizar un turno
app.put('/turnos/dni/:dni', async (req, res) => {
    const {nombre, fecha, hora, especialidad} = req.body;
    await actualizarTurno({...req.params.dni, nombre, fecha, hora, especialidad});
    res.json({message: "Turno actualizado"});
})

// eliminar un turno
app.delete('/turnos/id/:id', async (req, res) => {
    await eliminarTurno(req.params.id);
    res.json({message: "Turno eliminado"});
});

// iniciar el puerto
app.listen(port, () => {
    console.log(`Puerto ${port} iniciado`);
});