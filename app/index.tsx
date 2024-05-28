import { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { onValue, ref } from "firebase/database";
import { database } from "@/firebaseConfig";

export default function HomeScreen() {
  StatusBar.setHidden(true);
  const [temperature, setTemperature] = useState("");
  const [wet, setWet] = useState(0);
  // in m^3
  const roomSize = 50;

  useEffect(() => {
    const temperatureRef = ref(database, "temperatura");
    const wetRef = ref(database, "humedad");
    const unsuscribeTemperature = onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data);
    });
    const unsuscribeWet = onValue(wetRef, (snapshot) => {
      const data = snapshot.val();
      setWet(data);
    });

    return () => {
      unsuscribeTemperature(), unsuscribeWet();
    };
  }, []); // Solo se ejecuta una vez

  const calculateHabs = (sensorValue: number): number => {
    // Convertir el valor del sensor a humedad absoluta (habs)
    // Esto depende de la calibración del sensor
    // Ejemplo: suponer que 1023 es 100 habs y 0 es 0 habs
    return (sensorValue / 1023) * 100;
  };

  const calculateRelativeHumidity = (sensorValue: number): number => {
    // Valor máximo del sensor
    const maxSensorValue = 1023;

    // Porcentaje máximo de humedad relativa
    const maxRelativeHumidity = 100;

    // Calcular el porcentaje de humedad relativa basado en el valor del sensor
    const relativeHumidity =
      (sensorValue / maxSensorValue) * maxRelativeHumidity;

    // Limitar la humedad relativa al rango de 0 a 100
    return Math.max(0, Math.min(relativeHumidity, 100));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>CONDICIÓN DEL CACAO</Text>
      <View>
        <Text style={styles.subitleText}>🌡 Temparatura</Text>
        <Text style={styles.text}>{temperature} ºC</Text>
        <Text style={styles.text}>
          {(parseInt(temperature) * 9) / 5 + 32} ºF
        </Text>
      </View>
      <View>
        <Text style={styles.subitleText}>🌨 Humedad</Text>
        <Text style={styles.text}>
          {calculateHabs(wet).toFixed(3)} habs (g/m³)
        </Text>
        <Text style={styles.text}>
          {calculateRelativeHumidity(wet).toFixed(3)} %
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  titleText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  subitleText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "semibold",
  },
  text: {
    fontWeight: "normal",
    fontSize: 18,
    textAlign: "center",
  },
});
