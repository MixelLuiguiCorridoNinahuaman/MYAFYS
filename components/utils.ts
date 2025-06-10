// utils.ts

// Convertir grados Celsius a Fahrenheit
export const convertirAFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32;

// Convertir grados Celsius a Kelvin
export const convertirAKelvin = (celsius: number) => celsius + 273.15;

// Función para calcular la presión de vapor de saturación (en hPa) dada una temperatura (en °C)
const presionVaporSaturacion = (temperatura: number): number => {
  // Fórmula de Tetens para calcular la presión de vapor de saturación
  // Es = 6.1078 * exp((17.08085 * T) / (234.175 + T))
  // donde T es la temperatura en grados Celsius
  return 6.1078 * Math.exp((17.08085 * temperatura) / (234.175 + temperatura));
};

// Función para convertir la humedad relativa (en %) a humedad absoluta (en g/m^3)
// Necesita la temperatura (en °C) como parámetro adicional
export const convertirAHumedadAbsoluta = (humedadRelativa: number, temperatura: number): number => {
  // Presión de vapor de saturación en hPa
  const Es = presionVaporSaturacion(temperatura);
  
  // Presión de vapor actual en hPa
  // E = (HR / 100) * Es
  // donde HR es la humedad relativa en porcentaje
  const E = (humedadRelativa / 100) * Es;
  
  // Humedad absoluta en g/m^3
  // AH = (216.7 * E) / (T + 273.15)
  // donde T es la temperatura en grados Celsius
  const humedadAbsoluta = (216.7 * E) / (temperatura + 273.15);
  
  return humedadAbsoluta;
};

// Función para convertir la humedad relativa (en %) a humedad específica (en kg/kg)
// Necesita la temperatura (en °C) y la presión atmosférica (en hPa) como parámetros adicionales
export const convertirAHumedadEspecifica = (humedadRelativa: number, temperatura: number, presion: number = 1013.25): number => {
  // Presión de vapor de saturación en hPa
  const Es = presionVaporSaturacion(temperatura);
  
  // Presión de vapor actual en hPa
  const E = (humedadRelativa / 100) * Es;
  
  // Humedad específica en kg de vapor de agua por kg de aire seco
  // SH = 0.622 * E / (P - E)
  // donde P es la presión atmosférica en hPa
  const humedadEspecifica = 0.622 * E / (presion - E);
  
  return humedadEspecifica;
};

// Definición del tipo PhColor con color y descripción
type ColorpH = {
  color: string;
  descripcion: string;
};

// Función para obtener el color y la descripción del pH
export const getColorpH = (ph: number): ColorpH => {
  if (ph < 3) return { color: 'red', descripcion: 'Muy ácido' };
  if (ph < 5) return { color: 'orange', descripcion: 'Ácido' };
  if (ph < 7) return { color: 'lightgreen', descripcion: 'Medianamente ácido' };
  if (ph === 7) return { color: 'green', descripcion: 'Neutro' };
  if (ph < 9) return { color: 'darkgreen', descripcion: 'Medianamente alcalino' };
  if (ph < 11) return { color: 'blue', descripcion: 'Alcalino' };
  return { color: '#4B0082', descripcion: 'Muy alcalino' };
};
