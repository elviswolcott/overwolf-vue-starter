/* handles displaying notifications the same way across all windows */
import { restore } from "@/services/ow-async.js";

// sends a notification
async function sendNotification(
  title,
  message,
  action = false,
  type = "normal"
) {
  await restore("notifications");
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
  window.INTERNAL_EVENT_BUS.fire("notification", notification);
}

export { sendNotification };
