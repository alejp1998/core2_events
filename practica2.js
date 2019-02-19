const Programador = require('./programador');
const Habitacion = require('./habitacion');
const Climatizador = require('./climatizador');
const Termostato = require('./termostato');

// Creamos una habitacion:
const dormitorio = new Habitacion();
dormitorio.temperatura = 22;

// Creamos un climatizador para la habitacion:
const climatizador = new Climatizador(dormitorio);

// Creamos un Termostato que mira la temperatura de la habitacion:
const termostato = new Termostato(dormitorio);

//Creamos fichero de configuracion
configuracion = [{hora: "01:41",temperatura: 22},{hora: "01:42",temperatura: 18},
{hora: "01:43",temperatura: 20},{ hora: "01:44",temperatura: 23},
{hora: "01:45",temperatura: 21},{hora: "01:46",temperatura: 17}];

//Creamos objeto Programador
const programador = new Programador(termostato,configuracion);

// Configuramos el termostato para controlar la temperatura:
termostato.on('muchofrio', () => climatizador.calentar());
termostato.on('muchocalor', () => climatizador.enfriar());

// Mostar la temperatura periodicamente:
termostato.on('tic', (temp) => console.log(`${temp.toFixed(1)}ºC`));

// Configurar la temp ideal a 20 grados:
termostato.indicarTemperaturaIdeal(20);

// Encender el termostato:
termostato.encender();

//Activamos el Programador
programador.activarProgramador();
