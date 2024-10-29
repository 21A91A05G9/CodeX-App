// ContestPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContestPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contest</Text>
      <Text style={styles.content}>This is where the contest information and details will be displayed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ContestPage;
