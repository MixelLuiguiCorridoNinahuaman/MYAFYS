// notificaciones.ts
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export const notify = async (message: string) => {
  if (Platform.OS === 'web') {
    notifyWeb(message);
  } else {
    await notifyMobile(message);
  }
};

const notifyMobile = async (message: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alerta",
      body: message,
    },
    trigger: null,
  });
};

const notifyWeb = (message: string) => {
  alert(message);
};