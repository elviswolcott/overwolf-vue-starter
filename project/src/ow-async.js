/* global overwolf */

async function getCurrentWindow() {
  return new Promise(resolve => {
    overwolf.windows.getCurrentWindow(result => {
      resolve(result.window);
    });
  });
}

async function getWindowState() {
  return new Promise(resolve => {
    overwolf.windows.getWindowState(result => {
      resolve(result);
    });
  });
}

async function getWindow(id) {
  if (!id) {
    return getCurrentWindow();
  }
  return new Promise(resolve => {
    overwolf.windows.obtainDeclaredWindow(id, result => {
      resolve(result.window);
    });
  });
}

async function getOpenWindows() {
  return new Promise(resolve => {
    overwolf.windows.getOpenWindows(result => {
      resolve(result);
    });
  });
}

async function minimize(id) {
  const window = await getWindow(id);
  return new Promise(resolve => {
    overwolf.windows.minimize(window.id, result => {
      resolve(result);
    });
  });
}

async function maximize(id) {
  const window = await getWindow(id);
  return new Promise(resolve => {
    overwolf.windows.maximize(window.id, result => {
      resolve(result);
    });
  });
}

async function hide(id) {
  const window = await getWindow(id);
  return new Promise(resolve => {
    overwolf.windows.hide(window.id, result => {
      resolve(result);
    });
  });
}

async function restore(id) {
  const window = await getWindow(id);
  return new Promise(resolve => {
    overwolf.windows.restore(window.id, result => {
      resolve(result);
    });
  });
}

async function newWindow(id) {
  return new Promise(resolve => {
    overwolf.windows.obtainDeclaredWindow(id, result => {
      resolve(result);
    });
  });
}

async function close(id) {
  if (!id) {
    const currentWindow = await getCurrentWindow();
    id = currentWindow.id;
  }
  overwolf.windows.close(id);
}

async function dragMove() {
  // moves a window with the user's mouse

  overwolf.windows.getCurrentWindow(function(result) {
    if (result.status == "success") {
      overwolf.windows.dragMove(result.window.id);
    }
  });
}

async function isEGSEnabled() {
  return new Promise(resolve => {
    overwolf.egs.isEnabled(result => {
      resolve(result);
    });
  });
}

async function requestEGS() {
  return new Promise(resolve => {
    overwolf.egs.requestToDisplay(result => {
      resolve(result);
    });
  });
}

async function setEGSStatus(status) {
  return new Promise(resolve => {
    overwolf.egs.requestToDisplay(status, result => {
      resolve(result);
    });
  });
}

async function getManifest() {
  return new Promise(resolve => {
    overwolf.extensions.current.getManifest(result => {
      resolve(result);
    });
  });
}

async function getHotkey() {
  return new Promise(resolve => {
    overwolf.settings.getHotKey(result => {
      resolve(result.hotkey);
    });
  });
}

async function registerHotkey(name, f) {
  return new Promise(() => {
    overwolf.settings.registerHotKey(name, result => {
      if (result.status == "success") {
        f();
      }
    });
  });
}

async function getRunningGameInfo() {
  return new Promise(resolve => {
    overwolf.games.getRunningGameInfo(result => {
      resolve(result);
    });
  });
}

async function isOverlayEnabled(id) {
  return new Promise(resolve => {
    overwolf.settings.games.getOverlayEnabled(id, result => {
      resolve(result.enabled);
    });
  });
}

async function isAutoLaunchEnabled(id) {
  return new Promise(resolve => {
    overwolf.settings.games.getAutoLaunchEnabled(id, result => {
      resolve(result.autoLaunchEnabled);
    });
  });
}

export {
  getCurrentWindow,
  getOpenWindows,
  getWindow,
  minimize,
  maximize,
  hide,
  close,
  restore,
  newWindow,
  dragMove,
  isEGSEnabled,
  requestEGS,
  setEGSStatus,
  getManifest,
  registerHotkey,
  getWindowState,
  getHotkey,
  getRunningGameInfo,
  isOverlayEnabled,
  isAutoLaunchEnabled
};
