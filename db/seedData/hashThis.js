
const logEvents = require('../../middleware/logEvents.js');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
// initialize object
const myEmitter = new MyEmitter();
// add listener for log events
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const bcrypt = require('bcrypt');
const hashThis = async (thing) => {
  const saltRounds = 10;
  try {
    const hashedThing = await bcrypt.hash(thing, saltRounds);
    return hashedThing;
  } catch (err) {
    console.error('Error while hashing:', err);
    myEmitter.emit('log', `${err.name}:${err.message}`, 'errLog.txt');
    throw new Error('Failed to hash the thing');
  }
};

module.exports = hashThis;

