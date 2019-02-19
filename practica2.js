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
configuracion = [{hora: "11:50",temperatura: 22},{hora: "11:51",temperatura: 18},
{hora: "11:52",temperatura: 20},{ hora: "11:53",temperatura: 23},
{hora: "11:54",temperatura: 21},{hora: "11:55",temperatura: 17}];

//Creamos objeto Programador
const programador = new Programador(configuracion);

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
programador.on('ideal', (temp) => {
  console.log('Cambiando temperatura ideal a '+ temp);
  termostato.indicarTemperaturaIdeal(temp);
});
