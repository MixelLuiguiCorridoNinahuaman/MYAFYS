// hooks/useFirebaseData.ts
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

interface BoxData {
  id: string;
  humedad1: number;
  humedad2: number;
  temperatura1: number;
  temperatura2: number;
  ph: number;
}

const useFirebaseData = () => {
  const [boxes, setBoxes] = useState<BoxData[]>([]);

  useEffect(() => {
    const boxesRef = ref(database, '/');
    const unsubscribe = onValue(boxesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = Object.keys(data).map((key) => ({
        id: key,
        humedad1: data[key].Humedad1,
        humedad2: data[key].Humedad2,
        temperatura1: data[key].Temperatura1,
        temperatura2: data[key].Temperatura2,
        ph: data[key].pH
      }));
      setBoxes(formattedData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return boxes;
};

export default useFirebaseData;

