// app/Inicio.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get('window');

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Header />
      <Image source={require('../assets/images/fondo-Inicio.png')} style={styles.backgroundImage} />
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
    height: height,
    position: 'absolute',
  }
});