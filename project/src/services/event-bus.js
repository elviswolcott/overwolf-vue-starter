import { getMainWindow } from "./ow-async.js";
const debug = true;

function EventBus() {
  console.log("starting event bus");
  var handlers = {};
  if (debug === true) {
    window.EVENT_BUS_HISTORY = [];
  }
  const bus = {
    on: (e, f) => {
      if (handlers[e] === undefined) {
        handlers[e] = [];
        window.FIXED_HANDLER = true;
      }
      handlers[e].push(f);
    },
    fire: (e, m) => {
      if (debug === true) {
        window.EVENT_BUS_HISTORY.push({ e, m });
      }
      if (handlers[e] === undefined) {
        return;
      }

      handlers[e].forEach(f => {
        f(m);
      });
    }
  };

  // reference is placed here for other scripts to access the bus
  window.INTERNAL_EVENT_BUS = bus;
  return bus;
}

async function connect() {
  if (window.EVENT_BUS_CONNECTED !== true) {
    window.EVENT_BUS_CONNECTED = true;
  }
  console.log("connecting to event bus.");
  const controller = getMainWindow();
  const bus = controller.INTERNAL_EVENT_BUS;
  if (bus === undefined) {
    window.EVENT_BUS_CONNECTED = false;
    throw "EventBus not started";
  }

  window.INTERNAL_EVENT_BUS = bus;
  return bus;
}

export { EventBus, connect };
