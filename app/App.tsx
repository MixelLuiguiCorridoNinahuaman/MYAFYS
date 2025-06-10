import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { enableScreens } from 'react-native-screens'; // Importar enableScreens
import Inicio from './Inicio';
import Secado from './Secado';
import Fermentacion from './Fermentacion';

enableScreens(); // Habilitar pantallas nativas

const Tab = createBottomTabNavigator();

const App = () => {
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
      if (status !== 'granted') {
        Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
    });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            display: 'flex',
          },
        }}
      >
        <Tab.Screen name="Inicio" component={Inicio} />
        <Tab.Screen name="Fermentación" component={Fermentacion} />
        <Tab.Screen name="Secado" component={Secado} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;