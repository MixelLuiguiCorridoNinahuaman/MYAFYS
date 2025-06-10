// BoxList.tsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BoxData from './BoxData';
import useFirebaseData from '../hooks/useFirebaseData';

const BoxList: React.FC<{ filterId: string }> = ({ filterId }) => {
  const boxes = useFirebaseData();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {boxes.map((box) => (
        <BoxData key={box.id} data={box} filterId={filterId} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default BoxList;