// BoxData.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { convertirAFahrenheit, convertirAKelvin, convertirAHumedadAbsoluta, convertirAHumedadEspecifica, getColorpH } from './utils';
import { notify } from './notificaciones';

interface BoxDataProps {
  id: string;
  humedad1: number;
  humedad2: number;
  temperatura1: number;
  temperatura2: number;
  ph: number;
}

const BoxData: React.FC<{ data: BoxDataProps; filterId: string }> = ({ data, filterId }) => {
  if (data.id !== filterId) {
    return null;
  }

  const { color, descripcion } = getColorpH(data.ph);

  useEffect(() => {
    const avgTemp = (data.temperatura1 + data.temperatura2) / 2;
    const avgHumedad = (data.humedad1 + data.humedad2) / 2;
/*
    if (avgTemp < 40) {
      notify('Alerta de Temperatura: La temperatura ha disminuido los 40 °C mínimo permitido.');
    }
    if (avgTemp > 60) {
      notify('Alerta de Temperatura: La temperatura ha superado los 60 °C máximo permitido.');
    }
    if (avgHumedad > 45 && avgHumedad < 50) {
      notify('Alerta de Humedad: Las almendras de cacao están óptimas para pasar al proceso de Secado.');
    }
    if (avgHumedad < 30) {
      notify('Alerta de Humedad: Las almendras de cacao están óptimas para su empaquetado.');
    }
    if (data.ph > 4 && data.ph < 6) {
      notify('Alerta de pH: El pH de las almendras está dentro del rango seguro para consumo.');
    }
*/
  }, [data]);

  return (
    <View style={styles.box}>
      {/* Temperaturas */}
      <View style={styles.column}>
        <Text style={styles.title}>🌡️ TEMPERATURA EN GRADOS CELSIUS 🌡️</Text>
        <Text style={styles.description}>Rango: -40 °C a 80 °C</Text>
        <Text style={styles.text}>Temperatura Mínima: {Math.min(data.temperatura1, data.temperatura2)} °C</Text>
        <Text style={styles.text}>Temperatura Máxima: {Math.max(data.temperatura1, data.temperatura2)} °C</Text>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={((data.temperatura1 + data.temperatura2) / 2 + 40) / 1.2}
          tintColor="#3399FF"
          backgroundColor="#999"
        >
          {() => (
            <Text style={styles.progressText}>{((data.temperatura1 + data.temperatura2) / 2).toFixed(1)} °C</Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.title}>🌡️ TEMPERATURA EN GRADOS FAHRENHEIT 🌡️</Text>
        <Text style={styles.description}>Rango: -40 °F a 176 °F</Text>
        <Text style={styles.text}>Temperatura Mínima: {Math.min(convertirAFahrenheit(data.temperatura1), convertirAFahrenheit(data.temperatura2)).toFixed(2)} °F</Text>
        <Text style={styles.text}>Temperatura Máxima: {Math.max(convertirAFahrenheit(data.temperatura1), convertirAFahrenheit(data.temperatura2)).toFixed(2)} °F</Text>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={((convertirAFahrenheit(data.temperatura1) + convertirAFahrenheit(data.temperatura2)) / 2 - (-40)) / (176 - (-40)) * 100}
          tintColor="#3399FF"
          backgroundColor="#999"
        >
          {() => (
            <Text style={styles.progressText}>{((convertirAFahrenheit(data.temperatura1) + convertirAFahrenheit(data.temperatura2)) / 2).toFixed(1)} °F</Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.title}>🌡️ TEMPERATURA EN GRADOS KELVIN 🌡️</Text>
        <Text style={styles.description}>Rango: 233.15 K a 353.15 K</Text>
        <Text style={styles.text}>Temperatura Mínima: {Math.min(convertirAKelvin(data.temperatura1), convertirAKelvin(data.temperatura2)).toFixed(2)} K</Text>
        <Text style={styles.text}>Temperatura Máxima: {Math.max(convertirAKelvin(data.temperatura1), convertirAKelvin(data.temperatura2)).toFixed(2)} K</Text>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={((convertirAKelvin(data.temperatura1) + convertirAKelvin(data.temperatura2)) / 2 - 233.15) / (353.15 - 233.15) * 100}
          tintColor="#3399FF"
          backgroundColor="#999"
        >
          {() => (
            <Text style={styles.progressText}>{((convertirAKelvin(data.temperatura1) + convertirAKelvin(data.temperatura2)) / 2).toFixed(2)} K</Text>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Humedades */}
      <View style={styles.column}>
        <Text style={styles.title}>💧HUMEDAD RELATIVA💧</Text>
        <Text style={styles.description}>Rango: 0% RH a 100% RH</Text>
        <Text style={styles.text}>Humedad Mínima: {Math.min(data.humedad1, data.humedad2)}% RH</Text>
        <Text style={styles.text}>Humedad Máxima: {Math.max(data.humedad1, data.humedad2)}% RH</Text>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={(data.humedad1 + data.humedad2) / 2}
          tintColor="#FF9933"
          backgroundColor="#999"
        >
          {() => (
            <Text style={styles.progressText}>{((data.humedad1 + data.humedad2) / 2).toFixed(1)}% RH</Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.title}>💧HUMEDAD ABSOLUTA💧</Text>
        <Text style={styles.description}>Rango: 0 g/m³ a 290.20 g/m³</Text>
        <Text style={styles.text}>Humedad Absoluta Mínima: {Math.min(convertirAHumedadAbsoluta(data.humedad1, (data.temperatura1 + data.temperatura2) / 2), convertirAHumedadAbsoluta(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)).toFixed(2)} g/m³</Text>
        <Text style={styles.text}>Humedad Absoluta Máxima: {Math.max(convertirAHumedadAbsoluta(data.humedad1, (data.temperatura1 + data.temperatura2) / 2), convertirAHumedadAbsoluta(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)).toFixed(2)} g/m³</Text>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={((convertirAHumedadAbsoluta(data.humedad1, (data.temperatura1 + data.temperatura2) / 2) + convertirAHumedadAbsoluta(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)) / 2) / 290.20 * 100}
          tintColor="#FF9933"
          backgroundColor="#999"
        >
          {() => (
            <Text style={styles.progressText}>{((convertirAHumedadAbsoluta(data.humedad1, (data.temperatura1 + data.temperatura2) / 2) + convertirAHumedadAbsoluta(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)) / 2).toFixed(1)} g/m³</Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.title}>💧HUMEDAD ESPECÍFICA💧</Text>
        <Text style={styles.description}>Rango: 0 kg💧/kg💨 a 0.55 kg💧/kg💨</Text>
        <Text style={styles.text}>Humedad Específica Mínima: {Math.min(convertirAHumedadEspecifica(data.humedad1, (data.temperatura1 + data.temperatura2) / 2), convertirAHumedadEspecifica(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)).toFixed(3)} kg💧/kg💨</Text>
        <Text style={styles.text}>Humedad Específica Máxima: {Math.max(convertirAHumedadEspecifica(data.humedad1, (data.temperatura1 + data.temperatura2) / 2), convertirAHumedadEspecifica(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)).toFixed(3)} kg💧/kg💨</Text>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={((convertirAHumedadEspecifica(data.humedad1, (data.temperatura1 + data.temperatura2) / 2) + convertirAHumedadEspecifica(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)) / 2) / 0.55 * 100}
          tintColor="#FF9933"
          backgroundColor="#999"
        >
          {() => (
            <Text style={styles.progressText}>{((convertirAHumedadEspecifica(data.humedad1, (data.temperatura1 + data.temperatura2) / 2) + convertirAHumedadEspecifica(data.humedad2, (data.temperatura1 + data.temperatura2) / 2)) / 2).toFixed(3)} kg/kg</Text>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* pH */}
      <View style={styles.phContainer}>
        <Text style={styles.title}>📊NIVEL DE pH📊</Text>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={(data.ph / 14) * 100}
          tintColor={color}
          backgroundColor="#999"
        >
          {() => (
            <Text style={styles.progressText}>{data.ph}</Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.description}>{descripcion}</Text>
        <Image
          source={require('../assets/images/EscalapH.jpg')} // Reemplaza con la ruta correcta a tu imagen
          style={styles.phImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15, // ajusta el tamaño de la fuente según sea necesario
    fontWeight: 'bold', // ajusta el peso de la fuente según sea necesario
    marginBottom: 10, // espacio inferior entre el título y el texto siguiente
    marginTop: 15,
    color: 'gold',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginBottom: 5,
    fontSize: 13,
  },
  progressText: {
    fontSize: 15,
  },
  phContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  phBar: {
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold', // ajusta el peso de la fuente según sea necesario
    color: 'black',
  },
  phImage: {
    width: 300, // ajusta el ancho según sea necesario
    height: 470, // ajusta la altura según sea necesario
    marginTop: 15, // espacio superior entre la barra y la imagen
  },
});

export default BoxData;
