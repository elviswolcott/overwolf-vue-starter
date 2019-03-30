import {
  restore,
  isEGSEnabled,
  requestEGS,
  setEGSStatus,
  getManifest,
  registerHotkey,
  getWindowState,
  minimize,
  maximize,
  getHotkey,
  getRunningGameInfo,
  isOverlayEnabled,
  isAutoLaunchEnabled
} from "@/services/ow-async.js";

import { sendNotification } from "@/services/notification-service.js";
import { EventBus } from "@/services/event-bus.js";

// returns a function that toggles a window
const createToggle = window_name => {
  return async () => {
    const state = (await getWindowState()).window_state_ex;
    if (state === "normal" || state === "maximized") {
      // hide if it is visible
      await minimize(window_name);
    } else if (state === "closed") {
      // open if it is closed
      await restore(window_name);
    } else {
      // show if it is minimized
      await maximize(window_name);
    }
  };
};

// global object for manifest
var manifest;
// global object for hotkeys
var hotkeys = {};

var bus = new EventBus();
console.log(bus);

// runs to startup the app
async function init() {
  // get the manifest for the extension
  manifest = await getManifest();
  // make the main window visible;
  await restore("main");
  // register main toggle hotkey
  const mainHotkey = "toggle_visibility_main";
  await registerHotkey(mainHotkey, createToggle("main"));
  // go through all the hotkeys and get the bindings
  for (const hotkey_name in manifest.data.hotkeys) {
    hotkeys[hotkey_name] = await getHotkey(hotkey_name);
  }
  // listen to binding updates
  overwolf.settings.onHotKeyChanged(change => {
    hotkeys[change.source] = change.hotkey;
  });
  // for all the supported games make sure the overlay is enabled
  for (const id of manifest.data.gameTargeting.game_ids) {
    if (!(await isOverlayEnabled(id))) {
      promptOverlayEnable(id);
    }
  }
  // for all the supported games make sure the auto launch is enabled
  for (const id of manifest.data.launchEvents.eventData.game_ids) {
    if (!(await isAutoLaunchEnabled(id))) {
      promptAutoLaunchEnable(id, manifest.UID);
    }
  }
}

async function promptEGSEnable() {
  const gameId = (await getRunningGameInfo()).id / 10;
  await sendNotification(
    "Game Summary is disabled",
    "Click to open settings",
    () => {
      window.location.href = `overwolf://store/game-settings/game-id/${gameId}`;
    }
  );
}

async function promptOverlayEnable(id) {
  await sendNotification(
    "Overlay is disabled",
    "Click to open settings",
    () => {
      window.location.href = `overwolf://store/game-settings/game-id/${id}`;
    }
  );
}

async function promptAutoLaunchEnable(game) {
  await sendNotification(
    "Auto Launch is disabled",
    "Click to open settings",
    () => {
      window.location.href = `overwolf://store/game-settings/game-id/${game}`;
    }
  );
}

/* you need to decide when to call this */

// loads the EGS if possible
async function presentEGS() {
  const enabled = await isEGSEnabled();
  if (enabled.status === "success") {
    if (enabled.isEnabled) {
      const res = await requestEGS();
      if (res.status != "success") {
        // do something with res.reason
        console.log(res.reason);
        // try again
        setTimeout(presentEGS, 1e4);
      } else {
        // display the shelf component
        await setEGSStatus("Ready");
      }
    } else {
      await promptEGSEnable();
    }
  } else {
    // something went wrong
  }
}

// ask the user to enable the EGS if they disable it
overwolf.egs.onEgsEnablementChanged.addListener(change => {
  if (change.isEnabled === false) {
    promptEGSEnable();
  }
});

// ask the user to enable the overlay if they disable it
overwolf.settings.games.onOverlayEnablementChanged.addListener(change => {
  if (change.enabled === false) {
    promptOverlayEnable(change.gameId);
  }
});

// ask the user to enable the overlay if they disable it
overwolf.settings.games.onOverlayEnablementChanged.addListener(change => {
  if (change.enabled === false) {
    promptAutoLaunchEnable(change.gameId);
  }
});

// when the game being played changes it attempts to load the EGS again
overwolf.games.onGameInfoUpdated.addListener(info => {
  if (info.gameChanged === true && info.gameInfo.isRunning === true) {
    presentEGS();
  }
});

var windowStates = {};

// if all windows are closed except the controller close the app
overwolf.windows.onStateChanged.addListener(change => {
  windowStates[change.window_name] = change.window_state;
  // only check when a window gets closed
  if (change.window_state === "closed") {
    const open = Object.entries(windowStates).filter(([name, state]) => {
      return name !== "notifications" && state !== "closed";
    });
    if (open.length == 0) {
      close();
    }
  }
});

// give it a second for the window to be created by Overwolf
setTimeout(init, 100);

overwolf.egs.onSessionInfoChanged.addListener(change => {
  // could so something with the change
  console.log(change);
});

overwolf.egs.onMatchSelectionChanged.addListener(change => {
  // could so something with the change
  console.log(change);
});
