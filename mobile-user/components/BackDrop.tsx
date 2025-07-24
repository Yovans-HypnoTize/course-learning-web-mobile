import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

const BackDrop = () => {
  return (
    <View style={styles.loadingBackdrop}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default BackDrop;

const styles = StyleSheet.create({
  loadingBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
