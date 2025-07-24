import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

const ReuCard = ({
  children,
  containerClass,
}: {
  children: React.ReactNode;
  containerClass?: ViewStyle;
}) => {
  return <View style={[styles.container, containerClass]}>{children}</View>;
};

export default ReuCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(229, 230, 237, 0.7)',
    boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
});
