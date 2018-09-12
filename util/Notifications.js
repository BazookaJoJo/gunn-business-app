import { Permissions, Notifications, Alert, Constants } from 'expo';
import { AlertIOS } from 'react-native';

// const PUSH_ENDPOINT = 'http://192.168.1.5:5000/register';
const PUSH_ENDPOINT = 'http://178.128.75.182/register';

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    AlertIOS.alert(
      'Gunn Business uses Push Notifications to send you important reminders',
      'Tap OK when prompted about Push Notifications or Gunn Business can\'t send you notifications',
      () => {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        AlertIOS.alert(
          finalStatus)
      }
    );
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        deviceId: Constants.installationId,
      },
    }),
  });
}