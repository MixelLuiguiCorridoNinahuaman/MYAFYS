// app/Inicio.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RootStackParamList } from '@/types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { logoutUser } from '@/services/authService';

const { width, height } = Dimensions.get('window');

export default function Inicio() {

   const navigate = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            const result = await logoutUser();
            if (result.success) {
              navigate.navigate('Login');
            } else {
              Alert.alert('Error', result.error || 'Error al cerrar sesión');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <Image source={require('../assets/images/fondo-Inicio.png')} style={styles.backgroundImage} />
      <Text className='text-blue-500'>Bienvenido a la App</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    width: width,
    height: 200,
    position: 'absolute',
    top:60
  },
  welcomeText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 48,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }
});