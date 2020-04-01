//variables gloabales
var listos, terminados, nProcesos, bloqueado, nombrepro,
	cQuan, hilo, Tllegada, Tfinalizacion, Turnarround, tilleg;
var gant, canvas, ctx, rafag, prioridad, temp, colaestable, thilo;

//main de la aplicación



$(document).ready(function () {
	Tllegada = 0;
	Tfinalizacion = 0;
	Turnarround = 0;
	prioridad = 0;
	cQuan = 2;
	thilo = 100;
	canvas = document.getElementById("gant");
	ctx = canvas.getContext("2d");
	bloqueado = false;
	abrirXml();

});


///secuencia de ejecucion tardia principal///////

function secuencia() {

	$("#gant").attr("height", 25 * nProcesos);
	$("#contenedor").height(100 + (nProcesos * 32));
	$("#contenedor2").height(100 + (nProcesos * 25));
	$(".columna").height(20 + (nProcesos * 25));
	listos = new cola();
	terminados = new cola();
	temp = new cola();
	colaestable = new cola();
	cuadroGant();

};


///con esta funcion gargo los d<tos del xml a la pagina las dos funciones siguientes permiten
//acceso a los datos en xml yllena la tabla para visualizar lo datos de los procesos

function abrirXml() {

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			llenarDatostabla2Principal(this);
		}
	};
	xhr.open("GET", "procesos.xml", true);
	xhr.send();

}
//)((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))

function llenarDatostabla2Principal(xml) {

	var docXML = xml.responseXML;
	var tabla2 = "<tr><th>Numero </th><th>Nombre del proceso </th><th>tiempo de llegada</th><th>Rafaga</th><th>Quantum</th></tr>";
	var pocesosg = docXML.getElementsByTagName("proceso");
	var cont = 0;
	var raf = "";
	var nom = "";
	nombrepro = new Array;
	rafag = new Array;
	tilleg = new Array;
	prioridad = new Array;
	for (var i = 0; i < pocesosg.length; i++) {
		tabla2 += "<tr><td>";
		tabla2 += i + 1;
		tabla2 += "</td><td>";
		nom = pocesosg[i].getElementsByTagName("nombre")[0].textContent;
		tabla2 += nom;
		nombrepro[i] = nom;
		tabla2 += "</td><td>";
		tabla2 += i;
		tilleg[i] = i;
		tabla2 += "</td><td>";
		raf = pocesosg[i].getElementsByTagName("nombre")[0].textContent;
		prioridad[i] = pocesosg[i].getElementsByTagName("prioridad")[0].textContent;

		tabla2 += raf.length;
		tabla2 += "</td><td>";
		tabla2 += cQuan;
		cont = i + 1;

		rafag[i] = raf.length;
		//window.alert (rafag[i]);

	}
	document.getElementById("listap").innerHTML = tabla2;
	nProcesos = cont;//se captura el NUMERO DE PROCESOS y se envia a n procesos .. es util para crear los campos dinanicos
	secuencia();
}


///// crea el cuadrado donde se reprodicira el diagrama con los campos requeridos

function cuadroGant() {
	gant = new Array(nProcesos);
	for (i = 0; i < nProcesos; i++) {
		gant[i] = [];
		for (j = 0; j < nProcesos; j++) {
			gant[i].push(i);
		}
	}
	console.log(gant);
}


//crea la cola colaestable  con datos del xml 
function crearCola(procesos) {
	for (i = 0; i < procesos; i++) {

		var id = [i + 1];//se llama proceso en el nodo
		var nombre = nombrepro[i];//recoge los valores del arreglo nombrepro creado antes al leer el xml
		var tiempo = rafag[i];//recoge los valores del arreglo rafag creado antes al leer el xml
		var raf = rafag[i];//obtine los valores del vector ragag
		var quantum = cQuan; // ya esta definida de manera global
		var tll = tilleg[i];//recoge los valores del arreglo tilleg creado antes al leer el xml
		var tf = Tfinalizacion;//se envia en 0
		var tr = Turnarround;//se envia en 0
		var pr = prioridad[i];//recoge los valores del arreglo tilleg creado antes al leer el xml
		//window.alert(Turnarround);
		colaestable.insertarUltimo(id, nombre, tiempo, quantum, tll, tf, tr, pr, raf);
	}

}

function colaLlegada() {
	var clock = 0;
	var nodo;
	if (listos.vacia()) {
		nodo = colaestable.extraerPrimero();
		listos.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo,
			nodo.quantum, nodo.Tllegada, nodo.Tfinalizacion, nodo.Turnarround, nodo.prioridad, nodo.rafagareal);

	}


	hilo2 = setInterval(function () {//El método setInterval () llama a una función o evalúa una expresión a intervalos específicos (en milisegundos).
		$("#reloj").html("Tiempo total de simulacion: " + clock + " segundos");
		clock = Math.round((clock + 0.1) * 10) / 10;
		if (!colaestable.vacia()) {
			nodo = colaestable.extraerPrimero();
			listos.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo,
				nodo.quantum, nodo.Tllegada, nodo.Tfinalizacion, nodo.Turnarround, nodo.prioridad, nodo.rafagareal);
			//window.alert("se inserto un noodo");	
		} else {

			clearInterval(hilo2);
		}


	}, thilo * 10);

	dibujarCola(0);
}

///algoritmo 

function roundRobin() {

	crearCola(nProcesos);//llena la cola y la dibuja en listos
	colaLlegada();

	var etapa1 = true;
	var etapa2 = true;
	var nodo;
	var nAtendidos = 0;
	var clock = 0;


	hilo = setInterval(function () {//El método setInterval () llama a una función o evalúa una expresión a intervalos específicos (en milisegundos).
		$("#reloj").html("Tiempo total de simulacion: " + clock + " segundos");
		clock = Math.round((clock + 0.1) * 10) / 10;





		if (etapa1) {
			if (!listos.vacia()) {
				nodo = listos.extraerPrimero();
				dibujarCola(0);
				dibujarProceso(nodo);
				etapa1 = false;
				etapa2 = true;

			}
		}


		if (etapa2) {
			if (nodo.tiempo > 0) {
				if (nodo.quantum > 0) {
					//esto se hace en ejecucion
					nodo.quantum = Math.round((nodo.quantum - 0.1) * 10) / 10;
					nodo.tiempo = Math.round((nodo.tiempo - 0.1) * 10) / 10;
					dibujarProceso(nodo);
					dibujarGant(nodo.proceso - 1);


				} else {
					//window.alert(nodo.Turnarround);
					nodo.quantum = cQuan;
					listos.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum, nodo.Tllegada, nodo.Tfinalizacion, nodo.Turnarround, nodo.prioridad, nodo.rafagareal);
					dibujarProceso(null);
					dibujarCola(0);
					etapa2 = false;
					etapa1 = true;
				}
			} else {
				//window.alert(nodo.Turnarround);

				nodo.Tfinalizacion = clock;
				nodo.Turnarround = Math.round((clock - nodo.Tllegada) * 10) / 10;
				terminados.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum, nodo.Tllegada, nodo.Tfinalizacion, nodo.Turnarround, nodo.prioridad, nodo.rafagareal);
				dibujarProceso(null);
				dibujarCola(1);
				etapa2 = false;
				etapa1 = true;
				nAtendidos++;
			}
		}


		if (nAtendidos == nProcesos) {
			$("#mensaje").html("Todos los procesos se han atendido exitosamente!");
			clearInterval(hilo);
			llenarDatostabla2Reporteexpulsivos();
			llenarDatostablaReportenoexpulsivos();
			grafica();
		}




	}, thilo);//<---VELOCIDAD DEL HILO EN MS


	document.getElementById('btinicio').disabled = true;
}

//funcion para el boton pausar

function pausar() {

	clearInterval(hilo);


};

/// dibuja los procesos que termina su quamtun
function dibujarCola(i) {
	var text = "";
	var textoCola = "";
	var F = function () { };
	var nodo;
	switch (i) {
		case 0: textoCola = "#listos"; F.prototype = listos; break;
		case 1: textoCola = "#terminados"; F.prototype = terminados; break;
	}
	var cola = new F();
	text += "<ul class='lista'>";
	while (!cola.vacia()) {
		nodo = cola.extraerPrimero();
		text += "<li><p> " + nodo.nombre + "</p></li>";
	}
	text += "</ul>";
	$(textoCola).html(text);
}



////esta  funcion dibuja todo las letras que se muesttran en la pantalla de la ejecucion
function dibujarProceso(nodo) {
	var text = "";
	if (nodo != null) {
		text += "<p>proceso " + nodo.nombre + "</p>";
		text += "<p>Total Rafaga Restante:" + nodo.tiempo + "</p>";
		text += "<p>  Quantum restante " + nodo.quantum + "</p>";
		$("#proceso").animate({ opacity: '1' }, 0);

	} else {
		$("#proceso").animate({ opacity: '0' }, 400);
	}
	$("#proceso").html(text);
}



/// funcion para dibujar el digrama 
function dibujarGant(n) {
	ctx.fillStyle = "rgb(17, 17, 17)";
	ctx.font = "20px Arial";
	for (i = 0; i < nProcesos; i++) {
		if (i == n) {
			gant[i].push(1); //agrega  1 al arreglo 			
		} else {
			gant[i].push(0);
		}
		ctx.fillText("proceso " + (i + 1), 10, 22 * (i + 1)); //escribe el nombre del proceso
	}

	for (i = 0; i < nProcesos; i++) {
		var ultimo = gant[i].length - 1;
		if (gant[i][ultimo] == 1) {
			ctx.fillRect(100 + Math.round(gant[i].length / (nProcesos * 0.8)), 5 + (22 * i), 1, 20); //dibuja rectangulo
		}
	}

}


////metodo de reportes
function llenarDatostabla2Reporteexpulsivos() {
	if (!terminados.vacia()) {
		var nodo;
		//var temp=new cola;
		var i = 0;
		var tabla2 = "<tr><th>Nombre</th><th>Tiempo de llegada</th><th>Rafaga</th><th>Prioridad Asignada</th><th>Turnarround</th><th>Tiempo Finalizacion</th></tr>";

		while (!terminados.vacia()) {
			nodo = terminados.extraerPrimero();
			temp.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum,
				nodo.Tllegada, nodo.Tfinalizacion,
				nodo.Turnarround, nodo.prioridad, nodo.rafagareal);
			if (nodo.prioridad == 0) {
				tabla2 += "<tr><td>";
				tabla2 += nodo.nombre;
				tabla2 += "</td><td>";

				tabla2 += nodo.Tllegada;

				tabla2 += "</td><td>";
				tabla2 += nodo.rafagareal;
				tabla2 += "</td><td>";

				tabla2 += nodo.prioridad;
				tabla2 += "</td><td>";
				tabla2 += nodo.Turnarround;
				tabla2 += "</td><td>";
				tabla2 += nodo.Tfinalizacion;
			}

			//i++;

			//window.alert (rafag[i]);


		}


		document.getElementById("reportexp").innerHTML = tabla2;

	}

}

function llenarDatostablaReportenoexpulsivos() {
	if (!temp.vacia()) {
		var nodo;

		var i = 0;
		var tabla3 = "<tr><th>Nombre</th><th>Tiempo de llegada</th><th>Rafaga</th><th>Prioridad Asignada</th><th>Turnarround</th><th>Tiempo Finalizacion</th></tr>";

		while (!temp.vacia()) {
			nodo = temp.extraerPrimero();
			terminados.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum,
				nodo.Tllegada, nodo.Tfinalizacion, nodo.Turnarround, nodo.prioridad, nodo.rafagareal);
			if (nodo.prioridad == 1) {
				tabla3 += "<tr><td>";
				tabla3 += nodo.nombre;
				tabla3 += "</td><td>";

				tabla3 += nodo.Tllegada;

				tabla3 += "</td><td>";
				tabla3 += nodo.rafagareal;
				tabla3 += "</td><td>";

				tabla3 += nodo.prioridad;
				tabla3 += "</td><td>";
				tabla3 += nodo.Turnarround;
				tabla3 += "</td><td>";
				tabla3 += nodo.Tfinalizacion;
			}

			//i++;

			//window.alert (rafag[i]);


		}


		document.getElementById("reportnoexp").innerHTML = tabla3;

	}

}

////////////////////////
/////////////////
//////////////////////7
function grafica() {

	var nodo;
	var i = 0;
	var nombre = [];
	var turn = [];

	if (!terminados.vacia()) {

		while (!terminados.vacia()) {
			nodo = terminados.extraerPrimero();
			temp.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum,
				nodo.Tllegada, nodo.Tfinalizacion,
				nodo.Turnarround, nodo.prioridad, nodo.rafagareal);
			nombre.push(nodo.nombre);
			turn.push(nodo.Turnarround);

			i++;


		}

	}
	var datos = {
		type: "line",

		data: {
			datasets: [{
				label: "Procesos",
				data: turn,
				borderColor: "#3e95cd",
				fill: false

			}],
			labels: nombre
		},
		options: {
			responsive: true,
		}
	};

	var canvas = document.getElementById('chart').getContext('2d');

	window.pie = new Chart(canvas, datos);
	window.pie.update();


}

