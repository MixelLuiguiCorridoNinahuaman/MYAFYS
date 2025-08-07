import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { enableScreens } from 'react-native-screens'; // Importar enableScreens
import Inicio from './Inicio';
import Secado from './Secado';
import Fermentacion from './Fermentacion';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { RootStackParamList, TabParamList } from '../types/navigation';

enableScreens(); // Habilitar pantallas nativas

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Tab Navigator como componente separado
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: 'flex',
        },
        headerShown: false, // Ocultar headers de tabs, el Stack maneja los headers
      }}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Fermentación" component={Fermentacion} />
      <Tab.Screen name="Secado" component={Secado} />
    </Tab.Navigator>
  );
};

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
      <RootStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {/* Aquí puedes agregar pantallas globales como Login, Splash, etc. */}
        {/* 
        <RootStack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Iniciar Sesión' }}
        />
        */}
        <RootStack.Screen 
          name="Login" 
          component={LoginScreen}
          
        />
        <RootStack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          
        />
        
        {/* Tab Navigator como pantalla principal */}

        <RootStack.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{ headerShown: false }} // Sin header para que los tabs se vean completos
        />
        
        {/* Pantallas globales que se pueden acceder desde cualquier tab */}
        {/* 
        <RootStack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />
        <RootStack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Configuración' }}
        />
        <RootStack.Screen 
          name="Notifications" 
          component={NotificationsScreen}
          options={{ title: 'Notificaciones' }}
        />
        */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;