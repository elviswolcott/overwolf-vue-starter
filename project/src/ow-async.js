/* global overwolf */

async function getCurrentWindow() {
  return new Promise((resolve, reject) => {
    overwolf.windows.getCurrentWindow(result => {
      if (result.status === "success") {
        resolve(result.window);
      } else {
        reject(result.status);
      }
    });
  });
}

async function getWindow(id) {
  if (!id) {
    return getCurrentWindow();
  }
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(id, result => {
      if (result.status === "success") {
        resolve(result.window);
      } else {
        reject(result.status);
      }
    });
  });
}

async function minimize(id) {
  const window = await getWindow(id);
  return new Promise((resolve, reject) => {
    overwolf.windows.minimize(window.id, result => {
      if (result.status === "success") {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
}

async function hide(id) {
  const window = await getWindow(id);
  return new Promise((resolve, reject) => {
    overwolf.windows.hide(window.id, result => {
      if (result.status === "success") {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
}

async function restore(id) {
  const window = await getWindow(id);
  return new Promise((resolve, reject) => {
    overwolf.windows.restore(window.id, result => {
      if (result.status === "success") {
        resolve(result);
      } else {
        reject(result);
      }
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

export { getCurrentWindow, getWindow, minimize, hide, close, restore }