function consultarCliente() {
    var client_id = $("#client_id").val();

    fetch('/existe_cliente/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ client_id: client_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.nombre_cliente) {
            $("#existe_cliente").removeClass("hidden"); // Mostrar el nombre del cliente
            $("#salida_registro2").addClass("hidden");                                        
            $("#nombre_cliente").text(data.nombre_cliente);     
            $("#nuevo_cliente").addClass("hidden");                     
            cargarPreferencias(client_id)
            
        } else {
            $("#nuevo_cliente").removeClass("hidden");
            //$("#existe_cliente").text("No existe el cliente, registrar");
            $("#existe_cliente").addClass("hidden"); // Ocultar el nombre del cliente
            $("#consultar_cliente").addClass("hidden"); // Ocultar las preferencias del cliente
            $("#nuevas_preferencias").addClass("hidden"); // Ocultar nuevs prefere                    
            $("#preferencias_cliente").text(""); // Limpiar el contenido de las preferencias
        }
    })
    .catch(error => {
        alert("Ocurrió un error al consultar al cliente.");
    });
}

function cargarPreferencias(client_id){
    fetch('/consultar_cliente/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ client_id: client_id })
    })
    .then(response => response.json())
    .then(response => {
        var resultHtml = '<div class="table-container"><table>';
        resultHtml += '<tr><th>ITEM</th><th>Cantidad</th></tr>'; // Encabezados de la tabla
        response.forEach(function(item) {
            resultHtml += '<tr>';
            resultHtml += '<td>' + item.item + '</td>';
            resultHtml += '<td>' + item.cantidad + '</td>';
            resultHtml += '</tr>';
        });
        resultHtml += '</table></div>';
        $("#preferencias_cliente").html(resultHtml);
        $("#consultar_cliente").removeClass("hidden"); // Mostrar las preferencias del cliente
        $("#nuevas_preferencias").removeClass("hidden");  
        $("#nueva_preferencia").text("");                          
        
    })

    .catch(error => {
        $("#nuevo_cliente").addClass("hidden"); // Ocultar el nombre del cliente
        $("#consultar_cliente").addClass("hidden"); // Ocultar las preferencias del cliente
        $("#nuevas_preferencias").addClass("hidden"); // Ocultar nuevs prefere                    
        $("#preferencias_cliente").text(""); // Limpiar el contenido de las preferencias
        alert("Ocurrió un error al consultar las preferencias del cliente.");
    });
}

function cargarPreferencias2(client_id) {
    fetch('/consultar_cliente/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: client_id })
    })
    .then(response => response.json())
    .then(response => {
        const labels = response.map(item => item.item);
        const data = response.map(item => item.cantidad);
        const config = {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cantidad',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        };

        const canvas = document.createElement('canvas');
        canvas.id = 'grafico-preferencias';

        const preferenciasCliente = document.getElementById('preferencias_cliente');
        preferenciasCliente.innerHTML = '';
        preferenciasCliente.appendChild(canvas);

        new Chart(canvas.getContext('2d'), config);

        // Otras operaciones después de mostrar el gráfico (si es necesario)
        $("#consultar_cliente").removeClass("hidden");
        $("#nuevas_preferencias").removeClass("hidden");
        $("#nueva_preferencia").text("");
    })
    .catch(error => {
        alert("Ocurrió un error al consultar las preferencias del cliente.");
    });
}

function registraPreferencia() {
    var client_id = $("#client_id").val();
    var nueva_preferencia = $("#nueva_preferencia").val();
    document.getElementById("nueva_preferencia").textContent = "";

    fetch('/registra_preferencia/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ client_id: client_id, preferencia: nueva_preferencia })
    })
    .then(response => response.json())
    .then(data => {
        if (data.salida) {
            $("#salida_registro2").removeClass("hidden");                    
            $("#existe_cliente").addClass("hidden"); // Ocultar el nombre del cliente
            $("#consultar_cliente").addClass("hidden"); // Ocultar las preferencias del cliente
            $("#nuevas_preferencias").addClass("hidden"); // Ocultar nuevs prefere                    
            $("#preferencias_cliente").text(""); // Limpiar el contenido de las preferencias
            $("#nueva_preferencia").text("");   
            $("#salida_registro2").text(data.salida);     
            $("#nuevo_cliente").addClass("hidden");               
        } else {
            $("#salida_registro2").addClass("hidden");
            $("#nuevo_cliente").addClass("hidden");
        }
    })
    .catch(error => {
        alert("Ocurrió un error al registrar la preferencia.");
    });
}


function RegistraCliente() {
    var client_id = $("#client_id").val();
    var nombre_cliente = $("#nuevo_nombre_cliente").val();            
    var preferencias_cliente = $("#registro_preferencia").val();

    fetch('/registra_cliente/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ client_id: client_id,nombre_cliente: nombre_cliente, preferencias_cliente: preferencias_cliente })
    })
    .then(response => response.json())
    .then(data => {
        if (data.salida) {
            $("#salida_registro2").removeClass("hidden");                    
            $("#existe_cliente").addClass("hidden"); // Ocultar el nombre del cliente
            $("#consultar_cliente").addClass("hidden"); // Ocultar las preferencias del cliente
            $("#nuevas_preferencias").addClass("hidden"); // Ocultar nuevs prefere                    
            $("#preferencias_cliente").text(""); // Limpiar el contenido de las preferencias
            $("#nueva_preferencia").text("");   
            $("#salida_registro2").text(data.salida);     
            $("#nuevo_cliente").addClass("hidden");               
        } else {
            $("#salida_registro2").addClass("hidden");
            $("#nuevo_cliente").addClass("hidden");
        }
    })
    .catch(error => {
        alert("Ocurrió un error al registrar la preferencia.");
    });
}

function pedirClaveYActualizarModelo() {
    const claveIngresada = prompt("Por favor, ingresa la clave:");
    if (claveIngresada === "12345") {
        alert("Modelo actualizado con éxito");
    } else {
        alert("Clave incorrecta. No tienes permiso para actualizar el modelo.");
    }
}

