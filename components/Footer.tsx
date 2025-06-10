// components/Footer.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2024 Cacao Pulgarcito - Derechos Reservados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#4A148C',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7,
    color: '#fff',
  },
});

export default Footer;
