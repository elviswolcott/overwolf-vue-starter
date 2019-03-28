/* handles displaying notifications the same way across all windows */
import { getOpenWindows, restore } from "./ow-async";

// sends a notification
async function sendNotification(
  title,
  message,
  action = false,
  type = "normal"
) {
  await restore("notifications");
  const windows = await getOpenWindows();
  const notificationWindow = windows.notifications.window;
  const mainWindow = windows.main && windows.main.window;
  // if the action is a boolean it determines wether to show the hotkey
  var hotkey, onClick;
  if (typeof action === "boolean") {
    hotkey = action;
  } else {
    hotkey = false;
    onClick = action;
  }
  const notification = {
    type,
    title,
    message,
    showHotkey: hotkey,
    custom: onClick
  };
  // send a notification on both windows
  notificationWindow.newNotification(notification);
  mainWindow.newNotification(notification);
}

export { sendNotification };
