$(".container-crearTurno").hide();
$(".container-mostrarTurno").hide();

function volver(){
    $(".container-crearTurno").hide();
    $(".container-mostrarTurno").hide();
    $(".container-inicio").show();
    window.location.reload();
}

function crearTurno(){
    $(".container-crearTurno").show();
    $(".container-inicio").hide();
}

function mostrarTurno(){
    $(".container-mostrarTurno").show();
    $(".container-inicio").hide();
}

async function guardar(){
    const nomApe = document.getElementById('paciente').value;
    const dni = document.getElementById('documento').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const especialidad = document.getElementById('especialidad').value;

    fetch(`https://appturnos.onrender.com/turnos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomApe, dni, fecha, hora, especialidad})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Turno creado:', data);
        alert('Turno creado con éxito');
        })
    .catch(error => console.error('Error:', error));
    await new Promise(r => setTimeout(r, 2000));
    location.reload();
}

function buscar(){
    const dni = document.getElementById('buscarPaciente').value;
    
    fetch(`https://appturnos.onrender.com/turnos/dni/${parseInt(dni)}`, {
        method: `GET`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const tablaTurnos = document.querySelector('#turnosTable tbody');
        [data].flat().forEach(cadaTurno => { // FLAT(): DESMENUZA UN ARRAY DENTRO DE OTRO ARRAY 
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${cadaTurno.nomApe}</td>
            <td>${cadaTurno.fecha}</td>
            <td>${cadaTurno.hora}</td>
            <td>${cadaTurno.especialidad}</td>
            <button onclick="eliminar('${cadaTurno.id}')" id=${cadaTurno.id}>Borrar</button>
            `;
            tablaTurnos.appendChild(fila);
        });
    })
    .catch(error => console.error('Ocurrio un error:', error));
}

function eliminar(id){
    fetch(`https://appturnos.onrender.com/turnos/id/${id}`, {
        method: `DELETE`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(data => {
        console.log('Turno eliminado:', data);
        alert('Turno eliminado exitosamente');
        location.reload();
        })
    .catch(error => console.error('Error:', error));
    
}








/* function editar(){
    fetch(`http://localhost:3000/turnos/id/${id}`, {
        method: `PUT`,
        headers: {
            'Content-Type': 'application/json'
        },

    })
} */