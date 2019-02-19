class EventEmitter{
  constructor(){
    this.listeners = {};
  }

  addListener(event,fn){
    this.listeners[event] = this.listeners[event]||[];//Si no existia crea array vacio
    this.listeners[event].push(fn);//Añade el listener
    return this;
  }

  emit(eventName, ...args) {
    let fns = this.listeners[eventName];//Iguala el elemento a un evento
      if (!fns) return false;
      fns.forEach((f) => {
        f(...args);//Para cada elemento ejecuta sus funciones con sus parametros
      });
    return true;
  }

  on(event, fn) {
    return this.addListener(event, fn);//Añade un listener
  }
}

exports = module.exports = EventEmitter;
