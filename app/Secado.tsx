// Secado.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BoxList from '../components/BoxList';

const Secado = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <BoxList filterId="CAJA_2" />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Secado;