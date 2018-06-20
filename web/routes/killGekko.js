const _ = require('lodash');

const cache = require('../state/cache');
const broadcast = cache.get('broadcast');
const gekkoManager = cache.get('gekkos');
const childManager = cache.get('child_runners');


// Kills a gekko by id.
// Requires a post body with the id of a running gekko.
module.exports = function *() {

  let id = this.request.body.id;

  if(!id) {
    this.body = {
      status: 'not ok'
    }
    return;
  }

  let gekko = gekkoManager.get(id);  
  let todelete = childManager[gekko.child_pid];
  
//  const util = require('util')
//  console.log(util.inspect(todelete, false, null))
  
  if (todelete) {
      console.log("Killing child process: " + todelete.pid);
      // First send the child process an exit message
      todelete.send('exit');
      todelete.kill();
      delete childManager[gekko.child_pid];
      console.log("Killed child process: " + todelete.killed);
  }
  let deleted = gekkoManager.delete(gekko.id);

  if(!deleted){
    this.body = {
      status: 'not ok'
    }
    return; 
  }

  broadcast({
    type: 'gekko_killed',
    gekko_id: id
  });

  this.body = {
    status: 'ok'
  };
}