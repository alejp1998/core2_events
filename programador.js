// Importar modulo Later.js:
const later = require('later');
const EventEmitter = require('./events');
// Usar zona horaria local:
later.date.localTime();

class Programador extends EventEmitter {

  constructor(config){
    super();
    this.config = config;
    this.sched;
  }

  activarProgramador(){
    console.log('Activando el programador');
    this.sched = new Array(this.config.length);
    var i;
    for (i=0;i<this.config.length;i++){
      this.sched[i] = later.parse.text('at ' + this.config[i].hora);
      var temp = this.config[i].temperatura;
      later.setInterval( () => {
        this.emit('ideal',temp);
      }, this.sched[i]);
    }
  }

}


exports = module.exports = Programador;
