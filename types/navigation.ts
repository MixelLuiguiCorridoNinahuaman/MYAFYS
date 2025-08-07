// types/navigation.ts
export type RootStackParamList = {
  Login: undefined;                    // No necesita parámetros
  SignUp: undefined;                   // No necesita parámetros
  MainTabs: undefined;                 // No necesita parámetros
  
  // Ejemplos si agregaras más pantallas:
  // Profile: { userId: string };              // Requiere userId
  // ProductDetail: { productId: number };     // Requiere productId  
  // Settings: { initialTab?: string };        // Parámetro opcional
};

export type TabParamList = {
  Inicio: undefined;                   // No necesita parámetros
  Fermentación: undefined;             // No necesita parámetros
  Secado: undefined;                   // No necesita parámetros
};
