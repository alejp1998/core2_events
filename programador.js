// Importar modulo Later.js:
const later = require('later');
const EventEmitter = require('./events');
// Usar zona horaria local:
later.date.localTime();

class Programador extends EventEmitter {

  constructor(termostato,config){
    super();
    this.termostato = termostato;
    this.config = config;
    this.sched;
  }

  getTemperatura(hora){
    var index;
    var i;
    for (i=0;i<this.config.length;i++){
      if(this.config[i].hora == hora){
        index = i;
      }
    }
    return this.config[index].temperatura;
  }

  activarProgramador(){
    console.log('Activando el programador');
    this.sched = new Array(this.config.length);
    var i;
    for (i=0;i<this.config.length;i++){
      this.sched[i] = later.parse.text('at ' + this.config[i].hora);
    }
    var n;
    for (n=0;n<this.config.length;n++){
      later.setInterval( () => {
        var time = new Date();
        if ((time.getHours()<10) && (time.getMinutes()<10))
          var hora = '0' + time.getHours() + ':' + '0' + time.getMinutes();
        else if ((time.getHours()<10) && (time.getMinutes()>=10))
          var hora = '0' + time.getHours() + ':' + time.getMinutes();
        else
          var hora = time.getHours() + ':' + time.getMinutes();

        var temp = this.getTemperatura(hora);
        console.log('Cambiando temperatura ideal a '+ temp);
        this.termostato.indicarTemperaturaIdeal(temp);
      }, this.sched[n]);
    }
  }

}


exports = module.exports = Programador;
